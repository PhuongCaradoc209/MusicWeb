// SidebarOption.js
import React from "react";
import { NavLink } from "react-router-dom";

function SidebarOption({ title, children }) {
    return (
    <div className="flex flex-col gap-y-4">
        <p className="pl-2.5 text-[11px]">{title}</p>
        {children}
    </div>
    );
}

export function SidebarOptionItem({to, children }) {
    return (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center justify-center 
            w-fit py-1.5 px-3 text-[8px] 
            rounded-full cursor-pointer transition-colors
            ${isActive ? "bg-color_0_bold text-color_2" : "text-gray-300 hover:bg-color_0_bold hover:text-color_2"}`
        }
    >
        {children}
    </NavLink>
    );
}

export default SidebarOption;
