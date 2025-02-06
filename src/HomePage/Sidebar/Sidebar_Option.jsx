// SidebarOption.js
import React from "react";

function SidebarOption({ title, children }) {
    return (
    <div className="flex flex-col gap-y-4">
        <p className="pl-2.5 text-[11px]">{title}</p>
        {children}
    </div>
    );
}

export function SidebarOptionItem({ children }) {
    return (
    <div
        className="flex items-center justify-center 
                w-fit
                py-1.5 px-3 text-[8px] text-gray-300 
                hover:bg-color_0_bold hover:text-color_2 
                rounded-full cursor-pointer"
    >
        {children}
    </div>
    );
}

export default SidebarOption;
