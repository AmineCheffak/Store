import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Page/Login";
import SignUp from "./Page/SignUp";
import Home from "./Page/Home";
import Carts from "./Page/Carts";
import UserProfile from "./Page/UserProfile";
import HistoryOrder from "./Page/HistoryOrder";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/Carts" element={<Carts />} />
        <Route path="/HistoryOrder" element={<HistoryOrder />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}