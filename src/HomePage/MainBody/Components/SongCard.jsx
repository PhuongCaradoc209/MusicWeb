import React from "react";

const SongCard = ({ image, title, artist, duration }) => {
    return (
        <div className="relative w-24 h-[105px] rounded-lg overflow-hidden cursor-pointer group">
            <img className="w-full h-full object-cover" src={image} alt={title} />

            <div className="absolute bottom-0 left-0 w-full h-[28%] bg-black/30 
                            backdrop-blur-[2px] 
                            flex items-center justify-center flex-col py-1 px-2
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 ease-linear">
                <span className="w-full flex justify-start text-white text-[8px]">
                    {title}
                </span>
                <div className="flex justify-between w-full text-white/70 text-[7px] font-light">
                    <span>{artist}</span>
                    <span>{duration}</span>
                </div>
            </div>
        </div>
    );
};

export default SongCard;