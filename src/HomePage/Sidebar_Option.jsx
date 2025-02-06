// SidebarOption.js
import React from "react";

function SidebarOption({ title, children }) {
    return (
    <div className="flex flex-col gap-y-4">
        <p className="pl-4 font-bold text-xs">{title}</p>
        {children}
    </div>
    );
}

export function SidebarOptionItem({ children }) {
    return (
    <div
        className="flex items-center justify-center 
                w-fit
                py-1 px-4 text-[9px] text-gray-300 
                hover:bg-color_0_bold hover:text-color_2 
                rounded-full cursor-pointer"
    >
        {children}
    </div>
    );
}

export default SidebarOption;
