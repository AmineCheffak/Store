import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "./Nav";
import Button from "./Button";
import { Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Search, ShoppingCart, Menu as MenuIcon, X, User, Settings, LogOut } from "lucide-react";

export default function Header({
    token,
    client,
    orderCount = 0,
    searchTerm = "",
    onSearchTermChange,
    onSearch,
}) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountAnchorEl, setAccountAnchorEl] = useState(null);
    const accountMenuOpen = Boolean(accountAnchorEl);

    const handleSearchSubmit = () => {
        if (typeof onSearch === "function") {
            onSearch(searchTerm);
        }
    };

    const goTo = (path) => {
        setMenuOpen(false);
        navigate(path);
    };

    const handleAccountClick = (event) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleAccountClose = () => {
        setAccountAnchorEl(null);
    };

    const handleGoToProfile = () => {
        handleAccountClose();
        navigate("/profile");
    };

    const handleLogout = () => {
        handleAccountClose();
        Cookies.remove("token");
        localStorage.removeItem("userId");
        navigate("/");
    };

    return (
        <header className="fixed left-0 top-0 z-50 w-full bg-[#131921] text-white shadow-md">
            <div className="flex w-full items-center gap-3 px-4 py-3">

                {/* Hamburger (mobile/tablet only) */}
                {!token && (
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex shrink-0 items-center justify-center rounded-sm p-2 hover:bg-white/10 lg:hidden"
                    >
                        {menuOpen ? <X size={22} /> : <MenuIcon size={22} />}
                    </button>
                )}

                {/* Logo */}
                <div
                    className="flex shrink-0 cursor-pointer items-center rounded-sm border border-transparent px-2 py-1 hover:border-white"
                    onClick={() => goTo("/")}
                >
                    <h1 className="text-2xl font-bold sm:text-3xl">Amazon</h1>
                </div>

                {/* Search - visible from md up */}
                <div className="hidden flex-1 md:flex">
                    <div className="flex h-10 w-full overflow-hidden rounded-md">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(event) => onSearchTermChange?.(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleSearchSubmit();
                                }
                            }}
                            className="w-full bg-white px-4 text-sm text-gray-800 outline-none"
                        />
                        <button
                            type="button"
                            aria-label="Search products"
                            onClick={handleSearchSubmit}
                            className="flex w-12 items-center justify-center bg-[#febd69] text-xl text-gray-900 transition hover:bg-[#f3a847]"
                        >
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                {/* Push right side items to the end when search is hidden */}
                <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
                    {/* Desktop nav */}
                    <div className="hidden lg:block">
                        {!token && <Nav />}
                    </div>

                    <button
                        type="button"
                        aria-label="Open cart"
                        className="relative flex items-center justify-center rounded-full border border-white/30 p-2 text-white transition hover:bg-white/10"
                        onClick={() => goTo("/Carts")}
                    >
                        <ShoppingCart size={20} />
                        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#febd69] px-1 text-[10px] font-bold text-black">
                            {orderCount}
                        </span>
                    </button>

                    {!token && (
                        <Button
                            text="Login"
                            onClick={() => goTo("/login")}
                        />
                    )}

                    {token && (
                        <>
                            <Tooltip title="Account settings">
                                <div
                                    className="flex cursor-pointer items-center gap-2 rounded-sm border border-transparent px-2 py-1 hover:border-white"
                                    onClick={handleAccountClick}
                                    aria-controls={accountMenuOpen ? "account-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={accountMenuOpen ? "true" : undefined}
                                >
                                    <IconButton size="small" sx={{ p: 0 }}>
                                        <Avatar
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                bgcolor: deepOrange[500],
                                            }}
                                        >
                                            {client?.avatar ? (
                                                <img
                                                    src={client?.avatar}
                                                    alt={client?.username || "Avatar"}
                                                    className="h-full w-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-xl font-bold text-white">
                                                    {client?.username?.charAt(0)?.toUpperCase() ||
                                                        client?.name?.charAt(0)?.toUpperCase() ||
                                                        "U"}
                                                </span>
                                            )}
                                        </Avatar>
                                    </IconButton>

                                    <div className="hidden md:block">
                                        <p className="text-xs text-gray-300">Hello,</p>
                                        <p className="max-w-24 truncate lowercase text-sm font-bold">
                                            @{client?.username}
                                        </p>
                                    </div>
                                </div>
                            </Tooltip>

                            <Menu
                                anchorEl={accountAnchorEl}
                                id="account-menu"
                                open={accountMenuOpen}
                                onClose={handleAccountClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: "visible",
                                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                            mt: 1.5,
                                            minWidth: 200,
                                            "&::before": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: "background.paper",
                                                transform: "translateY(-50%) rotate(45deg)",
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                            >
                                <MenuItem onClick={handleGoToProfile}>
                                    <ListItemIcon>
                                        <User size={18} />
                                    </ListItemIcon>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={() => { handleAccountClose(); navigate("/HistoryOrder"); }}>
                                    <ListItemIcon>
                                        <ShoppingCart size={18} />
                                    </ListItemIcon>
                                    History Orders
                                </MenuItem>
                                <Divider />

                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogOut size={18} />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile search - visible below md */}
            <div className="px-4 pb-3 md:hidden">
                <div className="flex h-10 overflow-hidden rounded-md">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(event) => onSearchTermChange?.(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                handleSearchSubmit();
                            }
                        }}
                        className="w-full bg-white px-4 text-sm text-gray-800 outline-none"
                    />
                    <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="flex w-12 items-center justify-center bg-[#febd69] text-gray-900"
                    >
                        <Search size={16} />
                    </button>
                </div>
            </div>

            {/* Mobile/tablet dropdown menu (Nav) */}
            {!token && menuOpen && (
                <div className="border-t border-white/10 bg-[#232f3e] px-4 py-3 lg:hidden">
                    <Nav onNavigate={() => setMenuOpen(false)} />
                </div>
            )}
        </header>
    );
}