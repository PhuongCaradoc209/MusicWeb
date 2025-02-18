import React from "react";
import { NavLink } from "react-router-dom";

function SidebarOption({ title, children }) {
    return (
    <div className="flex flex-col gap-y-3">
        <p className="pl-3 text-[1.05rem] uppercase tracking-wide text-white font-medium">
            {title}
        </p>
        {children}
    </div>
    );
}

export function SidebarOptionItem({ to, children }) {
    return (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center justify-start w-full py-2 px-4 text-[1rem]
            transition-colors
            ${isActive ? "border-l-2 border-l-color_2 text-color_2" : "text-gray-300 hover:border-l-2 hover:border-l-color_2 hover:text-color_2"}`
        }
    >
        {children}
    </NavLink>
    );
}

export default SidebarOption;