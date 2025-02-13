import React from "react";

const ToolTip = ({ text, top = "120%", left = "105%", fontSize = "6px", paddingX = "0.25rem", paddingY = "0.25rem" }) => {
    return (
        <div 
            className={`absolute hidden group-hover:block 
                        bg-color_4 text-black border border-black font-medium
                        shadow-md z-10`}
            style={{ 
                top, 
                left, 
                fontSize, 
                padding: `${paddingY} ${paddingX}`,
                lineHeight: "1"
            }}
        >
            {text}
        </div>
    );
};

export default ToolTip;
