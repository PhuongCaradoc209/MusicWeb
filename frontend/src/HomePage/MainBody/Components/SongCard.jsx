import React from "react";

const SongCard = ({ image, title, artist, duration }) => {
    return (
        <div className="relative w-36 md:w-40 lg:w-44 
                    h-40 md:h-44 lg:h-48
                    rounded-lg overflow-hidden cursor-pointer group">
            <img className="w-full h-full object-cover" src={image} alt={title} />

            <div className="absolute bottom-0 left-0 w-full h-[28%] bg-black/30 
                            backdrop-blur-[2px] 
                            flex items-center justify-center flex-col py-1 px-2
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 ease-linear">
                <span className="w-full flex justify-start text-white text-sm">
                    {title}
                </span>
                <div className="flex justify-between w-full text-white/70 text-sm font-light">
                    <span>{artist}</span>
                    <span>{duration}</span>
                </div>
            </div>
        </div>
    );
};

export default SongCard;