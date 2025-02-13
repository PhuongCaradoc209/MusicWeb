import React, { useState, useRef, useEffect } from "react";
import ToolTip from "./ToolTip";
import { GoPerson } from "react-icons/go";
import { SlSettings } from "react-icons/sl";
import { LuLogOut } from "react-icons/lu";

const AvatarMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // Đóng menu khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar */}
            <div className='w-7 h-7 rounded-full flex justify-center items-center 
                        bg-transparent hover:scale-110 hover:bg-gray-300/30
                        transition-transform ease-linear
                        relative group'
                onClick={()=>setOpen(!open)}>
                <div className="w-5 h-5 rounded-full bg-gray-300 
                            flex items-center justify-center cursor-pointer text-[11px]">
                    🧑
                </div>
                <ToolTip text={"Profile"} top='100%' left='0' />
            </div>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg border z-50 text-[8px]">
                    <ul className="py-2 text-gray-700">
                        <li className="px-2 py-0.5 gap-x-2 mx-1 rounded-sm flex items-center hover:bg-gray-100 cursor-pointer">
                            <GoPerson size={10}/>
                            Profile
                        </li>
                        <li className="px-2 py-0.5 gap-x-2 mx-1 rounded-sm flex items-center hover:bg-gray-100 cursor-pointer">
                            <SlSettings size={10}/>
                            Setting
                        </li>
                        <li className="px-2 py-0.5 gap-x-2 mx-1 rounded-sm flex items-center hover:bg-red-200 hover:text-red-500 cursor-pointer">
                            <LuLogOut size={10}/>
                            Log out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AvatarMenu;
