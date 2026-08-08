import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Component/Header";
import { jwtDecode } from "jwt-decode";
import Banner from "../section/Banner";
import Cart from "../Component/Cart";
import Footer from "../section/Footer";
export default function Home() {
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([]);
    const token = Cookies.get("token");
    const getCartItems = async (cartOwnerId) => {
        if (!cartOwnerId) {
            return [];
        }
        try {
            const response = await fetch(`http://localhost:8080/carts/v1/${cartOwnerId}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch cart");
            }
            const result = await response.json();
            const payload = result?.data || result?.cart || result?.items || result?.products || result;
            const cartItems = Array.isArray(payload)
                ? payload
                : Array.isArray(payload?.items)
                    ? payload.items
                    : Array.isArray(payload?.products)
                        ? payload.products
                        : [];
            setOrders(cartItems);
            return cartItems;
        } catch (error) {
            console.error(error);
            setOrders([]);
            return [];
        }
    };
    const searchProducts = async (query) => {
        const normalizedQuery = query.trim();
        if (!normalizedQuery) {
            try {
                const response = await fetch("http://localhost:8080/products/v1");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const result = await response.json();
                const fetchedProducts = result?.data || result?.product || result;
                setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
            } catch (error) {
                console.error(error);
            }
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8080/products/v1/search/${encodeURIComponent(normalizedQuery)}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Search failed");
            }
            const result = await response.json();
            const fetchedProducts = result?.data || result?.product || result?.products || result;
            setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
        } catch (error) {
            console.error(error);
            setProducts([]);
        }
    };
    useEffect(() => {
        const normalizedQuery = searchTerm.trim();
        if (!normalizedQuery) {
            searchProducts("");
            return undefined;
        }
        if (normalizedQuery.length < 2) {
            return undefined;
        }
        const debounceTimer = setTimeout(() => {
            searchProducts(normalizedQuery);
        }, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);
    const handleAddOrder = async (product) => {
        if (!token) {
            navigate("/Login");
            return;
        }
        if (!product?.id) {
            return;
        }
        const cartOwnerId = client?.id || client?.uuid || client?.clientId || localStorage.getItem("userId");
        if (!cartOwnerId) {
            console.error("No client id available for cart request");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/carts/v1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    client: cartOwnerId,
                    product: product.id,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to add product to cart");
            }
            await getCartItems(cartOwnerId);
        } catch (error) {
            console.error(error);
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
                    const response = await fetch(
                        `http://localhost:8080/auth/v1/${userId}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch user");
                    }
                    const data = await response.json();
                    const fetchedClient = data?.data || data?.user || data;
                    setClient(fetchedClient);
                    await getCartItems(userId);
                } catch (error) {
                    console.error(error);
                }
            };
            const getProducts = async () => {
                try {
                    const response = await fetch("http://localhost:8080/products/v1");
                    if (!response.ok) {
                        throw new Error("Failed to fetch products");
                    }
                    const result = await response.json();
                    const fetchedProducts = result?.data || result?.product || result;
                    setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
                } catch (error) {
                    console.error(error);
                }
            };
            getUser();
            getProducts();
        } catch (error) {
            console.error("Invalid token:", error);
            Cookies.remove("token");
            navigate("/");
        }
    }, [navigate, token]);
    return (
        <>
            <Header
                token={token}
                client={client}
                orderCount={orders.length}
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                onSearch={searchProducts}
            />
            <div className="pt-30 sm:pt-17">
                <Banner />
            </div>
            <section className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">منتجاتنا</h1>
                    <p className="mt-2 text-sm text-gray-600">تصفح أفضل المنتجات المتوفرة اليوم</p>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.isArray(products) && products.map((product) => (
                        <Cart key={product.id} product={product} onClick={() => handleAddOrder(product)} />
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}