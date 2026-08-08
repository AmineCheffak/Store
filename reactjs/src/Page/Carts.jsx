import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Header from "../Component/Header";
import Footer from "../section/Footer";

export default function Carts() {
    
    const navigate = useNavigate();
    const token = Cookies.get("token");
    const [client, setClient] = useState(null);
    const [orders, setOrders] = useState([]);
    const [cartOwnerId, setCartOwnerId] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [placingOrder, setPlacingOrder] = useState(false);

    const normalizeCartPayload = (payload) => {
        const source = payload?.data || payload?.cart || payload?.items || payload?.products || payload;

        if (Array.isArray(source)) {
            return source;
        }

        if (Array.isArray(source?.items)) {
            return source.items;
        }

        if (Array.isArray(source?.products)) {
            return source.products;
        }

        return [];
    };

    const fetchProductCatalog = async () => {
        try {
            const response = await fetch("http://localhost:8080/products/v1", {
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch product catalog");
            }

            const productPayload = await response.json();
            const products = productPayload?.data || productPayload?.product || productPayload?.products || productPayload;
            return Array.isArray(products) ? products : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const loadCart = async (ownerId) => {
        try {
            const cartResponse = await fetch(`http://localhost:8080/carts/v1/${ownerId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!cartResponse.ok) {
                throw new Error("Failed to fetch cart");
            }

            const cartData = await cartResponse.json();
            const cartRows = normalizeCartPayload(cartData);

            const catalog = await fetchProductCatalog();
            const productMap = new Map(
                catalog.map((product) => [product.id, product])
            );

            const enrichedOrders = cartRows.map((row) => {
                const productFromRow = productMap.get(row.productId) || productMap.get(row.product);

                return {
                    ...row,
                    product: productFromRow || row.product || null,
                };
            });

            setOrders(enrichedOrders);
        } catch (error) {
            console.error(error);
            setOrders([]);
        }
    };

    const handleDeleteOrder = async (cartRowId) => {
        const ownerId = cartOwnerId || localStorage.getItem("userId");

        if (!cartRowId || !ownerId || !token) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/carts/v1/${cartRowId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete cart item");
            }

            setSelectedProducts((prev) => prev.filter((id) => id !== cartRowId));
            await loadCart(ownerId);
        } catch (error) {
            console.error(error);
        }
    };

    // Get the actual product id for a cart row (handles different payload shapes)
    const getProductId = (row) => {
        return row?.product?.id || row?.productId || row?.product || row?.id;
    };

    const isSelected = (row) => selectedProducts.includes(getProductId(row));

    const toggleSelectProduct = (row) => {
        const productId = getProductId(row);
        if (!productId) {
            return;
        }
        setSelectedProducts((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedProducts.length === orders.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(orders.map((row) => getProductId(row)).filter(Boolean));
        }
    };

    const handleGetOrder = async () => {
        const ownerId = cartOwnerId || localStorage.getItem("userId");

        if (!token || !ownerId || selectedProducts.length === 0) {
            return;
        }

        setPlacingOrder(true);
        try {
            const response = await fetch("http://localhost:8080/orders/v1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user: ownerId,
                    products: selectedProducts.map((id) => ({ id })),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to place order");
            }

            setSelectedProducts([]);
            await loadCart(ownerId);
        } catch (error) {
            console.error(error);
        } finally {
            setPlacingOrder(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/Login");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId || decodedToken.id || decodedToken.sub;
            setCartOwnerId(userId);
            localStorage.setItem("userId", String(userId));

            const getUser = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/auth/v1/${userId}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch user");
                    }

                    const data = await response.json();
                    const fetchedClient = data?.data || data?.user || data;
                    setClient(fetchedClient);

                    await loadCart(userId);
                } catch (error) {
                    console.error(error);
                    setOrders([]);
                }
            };

            getUser();
        } catch (error) {
            console.error("Invalid token:", error);
            Cookies.remove("token");
            navigate("/");
        }
    }, [navigate, token]);

    const totalPrice = orders.reduce((sum, product) => {
        const cartProduct = product?.product || product;
        return sum + Number(cartProduct?.price || product?.price || 0);
    }, 0);

    const selectedTotalPrice = orders
        .filter((row) => isSelected(row))
        .reduce((sum, product) => {
            const cartProduct = product?.product || product;
            return sum + Number(cartProduct?.price || product?.price || 0);
        }, 0);

    return (
        <>
            <Header token={token} client={client} orderCount={orders.length} />
            <section className="min-h-screen px-4 py-28 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                {orders.length} product(s) selected
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Total Price
                            </p>
                            <p className="mt-1 text-2xl font-bold text-[#131921]">
                                ${Number(totalPrice).toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                            <p className="text-lg font-medium text-gray-700">No products in the shopping cart</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={orders.length > 0 && selectedProducts.length === orders.length}
                                        onChange={toggleSelectAll}
                                        className="h-4 w-4 rounded border-gray-300 accent-[#febd69]"
                                    />
                                    Select all
                                </label>
                                <p className="text-sm text-gray-500">
                                    {selectedProducts.length} selected
                                </p>
                            </div>

                            <div className="grid gap-4">
                                {orders.map((product, index) => {
                                    const cartProduct = product?.product || product;
                                    const selected = isSelected(product);

                                    return (
                                        <article
                                            key={`${cartProduct?.id || product?.id || index}-${index}`}
                                            className={`flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm transition ${
                                                selected ? "border-[#febd69] ring-1 ring-[#febd69]" : "border-gray-200"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selected}
                                                    onChange={() => toggleSelectProduct(product)}
                                                    className="h-5 w-5 shrink-0 rounded border-gray-300 accent-[#febd69]"
                                                />
                                                <img
                                                    src={cartProduct?.images?.[0] || cartProduct?.image}
                                                    alt={cartProduct?.title || "Cart item"}
                                                    className="h-20 w-20 rounded-lg border border-gray-200 object-contain bg-white p-2"
                                                />
                                                <div>
                                                    <h3 className="text-base font-semibold text-gray-900">
                                                        {cartProduct?.title || cartProduct?.name || "Product"}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {cartProduct?.description || ""}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Price</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    ${Number(cartProduct?.price || product?.price || 0).toFixed(2)}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteOrder(product?.id)}
                                                    className="mt-3 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>

                            {/* Sticky bottom bar to place the order */}
                            <div className="sticky bottom-4 mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Selected total
                                    </p>
                                    <p className="text-xl font-bold text-[#131921]">
                                        ${Number(selectedTotalPrice).toFixed(2)}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleGetOrder}
                                    disabled={selectedProducts.length === 0 || placingOrder}
                                    className="rounded-full bg-[#febd69] px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-[#f3a847] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {placingOrder ? "Placing order..." : `Get Order (${selectedProducts.length})`}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}