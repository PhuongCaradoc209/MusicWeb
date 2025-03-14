import React from "react";

const ToolTip = ({ 
    text, 
    top = "150%", 
    left = "50%", 
    fontSize = "14px", 
    paddingX = "0.5rem", 
    paddingY = "0.25rem" 
}) => {
    return (
        <div 
            className="absolute hidden group-hover:block peer-hover:block
                        bg-gray-600 text-white border border-white font-light
                        shadow-lg z-50 px-2 py-1 text-sm
                        w-fit text-nowrap   
                        transition-opacity duration-200"
            style={{ 
                top, 
                left, 
                fontSize, 
                transform: "translateX(-50%)" // Căn tooltip vào giữa
            }}
        >
            {text}
        </div>
    );
};

export default ToolTip;