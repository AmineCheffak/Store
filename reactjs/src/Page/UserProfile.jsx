import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Box,
  Edit2,
  KeyRound,
  LogOut,
  Moon,
  Settings,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Header from "../Component/Header";
import Footer from "../section/Footer";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";


const UserProfile = () => {

  function deconnect() {
    Cookies.remove("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("datelogin");
    window.location.href = "/Login";
  }


  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [client, setClient] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [count, setCount] = useState(0);
  const mockUserData = {
    fullName: "John Anderson",
    email: "john.anderson@example.com",
    phone: "+1 (555) 123-4567",
    username: "john.inventory",
    role: "Inventory Manager",
    createdAt: "2023-01-15",
    lastLogin: "2024-01-20",
    totalItems: 1234,
    recentInteractions: [
      { id: 1, action: "Updated Stock", item: "Laptop Dell XPS", date: "2024-01-19" },
      { id: 2, action: "Approved Shipment", item: "Office Supplies", date: "2024-01-18" },
    ],
    assignedEquipment: [
      { id: 1, name: "Company Laptop", status: "Active" },
      { id: 2, name: "Access Card", status: "Active" },
    ]
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

      const getCount = async () => {
        try {
          const response = await fetch(`http://localhost:8080/carts/v1/${userId}/count`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch cart count");
          }

          const count = await response.json();
          setCount(count);
          // Do something with the cart count, e.g., update state
        } catch (error) {
          console.error(error);
        }
      };
      getCount()
      getUser();
    } catch (error) {
      console.error("Invalid token:", error);
      Cookies.remove("token");
      navigate("/");
    }
  }, [navigate, token]);

  const orders = useMemo(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("shoppingOrders") || "[]");
      return Array.isArray(savedOrders) ? savedOrders : [];
    } catch (error) {
      return [];
    }
  }, []);

  const currentUser = client || mockUserData;

  const ProfileSection = ({ title, children }) => (
    <section className="mb-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-[#131921]">{title}</h2>
      {children}
    </section>
  );

  const NavigationTabs = () => (
    <div className="mb-6 flex gap-2 border-b border-gray-200">
      <button
        onClick={() => setActiveTab("profile")}
        className={`px-5 py-3 -mb-px text-sm font-bold transition ${activeTab === "profile" ? "border-b-2 border-[#fcd200] text-[#131921]" : "text-gray-600 hover:text-[#131921]"}`}
      >
        <div className="flex items-center gap-2">
          <UserRound size={16} />
          <span>Profile</span>
        </div>
      </button>
    </div>
  );

  return (
    <>
      <Header token={token} client={client} orderCount={orders.length} />
      <main className={`min-h-screen pt-24 ${isDarkMode ? "dark" : ""}`}>
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">

          <NavigationTabs />

          {activeTab === "profile" ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <aside className="lg:col-span-1">
                <ProfileSection title="Personal Information">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar
                        sx={{
                        width:150,
                        height: 150,
                        bgcolor: deepOrange[500],
                          }}
                      >
                        {currentUser?.avatar ? (
                          <img
                            src={currentUser?.avatar}
                            alt={currentUser?.username || "Avatar"}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-7xl font-bold text-white">
                            {currentUser?.username?.charAt(0)?.toUpperCase() || currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        )}
                      </Avatar>
                    </div>
                    <h3 className="mt-4 text-lg lowercase font-base text-[#131921]">
                      {"@"+currentUser?.username || currentUser?.name || currentUser?.username || "User"}
                    </h3>
                    <p className="text-sm font-semibold text-gray-500">{currentUser?.role || "Customer"}</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Email</label>
                      <p className="mt-1 text-sm font-base lowercase text-gray-800">{currentUser?.email || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Phone</label>
                      <p className="mt-1 text-sm font-base lowercase text-gray-800">{currentUser?.phone || currentUser?.phone || "-"}</p>
                    </div>
                  </div>
                </ProfileSection>

                <div className="space-y-4">
                  <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] px-4 py-3 text-sm font-black text-[#131921] transition hover:bg-[#f7ca00]">
                    <Edit2 size={15} /> Edit Profile
                  </button>
                  <button 
                    onClick={deconnect}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </aside>

              <div className="lg:col-span-2">
                <ProfileSection title="Account Details">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Username</label>
                      <p className="mt-1 font-base text-gray-900 lowercase text-base">
                        {"@"+currentUser?.username || "-" || currentUser?.username || "-"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Account Created</label>
                      <p className="mt-1 text-sm font-base text-gray-900">
                        {currentUser?.dateCreate
                          ? new Date(currentUser.dateCreate).toLocaleDateString("en-GB").replaceAll("/", "-")
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Last Login</label>
                      <p className="mt-1 text-sm font-base text-gray-900">{localStorage.getItem("datelogin") || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Total Items Managed</label>
                      <p className="mt-1 text-sm font-base text-gray-900">{count.data}</p>
                    </div>
                  </div>
                </ProfileSection>

                <ProfileSection title="Recent Inventory Interactions">
                  <div className="space-y-4">
                    {(currentUser?.recentInteractions || mockUserData.recentInteractions).map((interaction) => (
                      <div
                        key={interaction.id}
                        className="flex items-center justify-between rounded-2xl border border-gray-100 bg-[#f8fafc] p-4"
                      >
                        <div>
                          <h4 className="font-black text-[#131921]">{interaction.action}</h4>
                          <p className="text-sm text-gray-500">{interaction.item}</p>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{interaction.date}</span>
                      </div>
                    ))}
                  </div>
                </ProfileSection>

              
              </div>
            </div>
          ) : (
            <section className="rounded-[30px] border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck className="h-7 w-7 text-[#fcd200]" />
                <h2 className="text-2xl font-black text-[#131921]">Account Settings</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-[#f8fafc] p-4">
                  <div>
                    <h3 className="font-black text-[#131921]">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-[#ffd814] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-[#f8fafc] p-4">
                  <div>
                    <h3 className="font-black text-[#131921]">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive email updates about your inventory</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" checked />
                    <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-[#ffd814] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserProfile;