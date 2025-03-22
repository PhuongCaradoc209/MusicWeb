import React, { useState, useRef, useEffect, useContext } from "react";
import ToolTip from "./ToolTip";
import { GoPerson } from "react-icons/go";
import { SlSettings } from "react-icons/sl";
import { LuLogOut } from "react-icons/lu";
import { AuthContext } from "../helpers/AuthorProvider"; 
import { useNavigate } from "react-router-dom";

const AvatarMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout(); 
    
            localStorage.removeItem("spotifyAccessToken");
            localStorage.removeItem("spotifyRefreshToken");
            localStorage.removeItem("spotifyTokenExpiry");
    
            navigate("/login");
        } catch (error) {
            console.error("Lỗi khi logout:", error);
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full flex justify-center items-center 
                            bg-transparent hover:scale-105 hover:bg-gray-300/30
                            transition-transform ease-linear
                            relative group"
                onClick={() => setOpen(!open)}>
                <div className="w-12 h-12 rounded-full bg-gray-600 
                                flex items-center justify-center cursor-pointer text-[1.5rem]">
                    🧑
                </div>
                <ToolTip text={"Profile"} top="100%" left="0" />
            </div>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-[#2f2f2f] shadow-lg border border-gray-600 z-50 text-base">
                    <ul className="py-2 text-white">
                        <li className="px-3 py-4 gap-x-3 mx-1 rounded-md flex items-center hover:bg-[#424242] cursor-pointer">
                            <GoPerson size={24} />
                            Profile
                        </li>
                        <li className="px-3 py-4 gap-x-3 mx-1 rounded-md flex items-center hover:bg-[#424242] cursor-pointer">
                            <SlSettings size={24} />
                            Setting
                        </li>
                        <li 
                            className="px-3 py-4 gap-x-3 mx-1 rounded-md flex items-center hover:bg-[#424242] hover:text-red-500 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LuLogOut size={24} />
                            Log out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AvatarMenu;
