import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Header from "../Component/Header";
import Footer from "../section/Footer";

export default function HistoryOrder() {
    const navigate = useNavigate();
    const token = Cookies.get("token");
    const [client, setClient] = useState(null);
    const [orders, setOrders] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [productMap, setProductMap] = useState({});

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
            const result = await response.json();
            const products = result?.data || result?.product || result?.products || result;
            const list = Array.isArray(products) ? products : [];
            const map = {};
            list.forEach((product) => {
                map[product.id] = product;
            });
            setProductMap(map);
        } catch (error) {
            console.error(error);
            setProductMap({});
        }
    };

    const fetchOrderHistory = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/orders/v1/${userId}/All`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch order history");
            }
            const result = await response.json();
            const fetchedOrders = result?.data || result?.orders || result;
            setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
        } catch (error) {
            console.error(error);
            setOrders([]);
        }
    };

    const fetchCartCount = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/carts/v1/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch cart");
            }
            const result = await response.json();
            setCartCount(normalizeCartPayload(result).length);
        } catch (error) {
            console.error(error);
            setCartCount(0);
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
                } catch (error) {
                    console.error(error);
                }
            };

            getUser();
            fetchCartCount(userId);
            fetchProductCatalog();
            fetchOrderHistory(userId);
        } catch (error) {
            console.error("Invalid token:", error);
            Cookies.remove("token");
            navigate("/");
        }
    }, [navigate, token]);

    const statusStyles = {
        "Under processing": "bg-amber-50 text-amber-700 border-amber-200",
        "Shipped": "bg-blue-50 text-blue-700 border-blue-200",
        "Delivered": "bg-green-50 text-green-700 border-green-200",
        "Cancelled": "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <>
            <Header token={token} client={client} orderCount={cartCount} />
            <section className="min-h-screen px-4 py-28 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold text-black">Order History</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        {orders.length} order(s)
                    </p>

                    {orders.length === 0 ? (
                        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                            <p className="text-lg font-medium text-gray-700">No orders yet</p>
                        </div>
                    ) : (
                        <div className="mt-8 grid gap-6">
                            {orders.map((order, index) => {
                                const products = Array.isArray(order?.products) ? order.products : [];
                                const orderDate = order?.createdAt ? new Date(order.createdAt) : null;

                                return (
                                    <article
                                        key={order?.id || index}
                                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                    >
                                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Order #{order?.id?.slice(0, 8) || index + 1}
                                                </p>
                                                {orderDate && (
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {orderDate.toLocaleDateString()} {orderDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Total
                                                </p>
                                                <p className="text-xl font-bold text-[#131921]">
                                                    ${Number(order?.totalPrice || 0).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid gap-3">
                                            {products.map((item, productIndex) => {
                                                const productInfo = productMap[item?.id];
                                                const badgeStyle =
                                                    statusStyles[item?.status] ||
                                                    "bg-gray-50 text-gray-700 border-gray-200";

                                                return (
                                                    <div
                                                        key={item?.id || productIndex}
                                                        className="flex items-center gap-4"
                                                    >
                                                        <img
                                                            src={productInfo?.images?.[0] || productInfo?.image}
                                                            alt={productInfo?.title || productInfo?.name || "Product"}
                                                            className="h-16 w-16 shrink-0 rounded-lg border border-gray-200 bg-white object-contain p-2"
                                                        />
                                                        <div className="flex-1">
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {productInfo?.title || productInfo?.name || `Product ${item?.id?.slice(0, 8)}`}
                                                            </p>
                                                            {productInfo?.price != null && (
                                                                <p className="text-xs text-gray-500">
                                                                    ${Number(productInfo.price).toFixed(2)}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <span
                                                            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyle}`}
                                                        >
                                                            {item?.status || "Unknown"}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}