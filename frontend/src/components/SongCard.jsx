import React from "react";

const SongCard = ({ srcImage, title, artist, duration }) => {
    return (
        <div className="relative w-36 md:w-40 lg:w-44 
                    h-40 md:h-44 lg:h-48
                    rounded-lg overflow-hidden cursor-pointer group">
            <img className="w-full h-full object-cover" src={srcImage} alt={title} />

            <div className="absolute bottom-0 left-0 w-full h-fit bg-black/20 
                            backdrop-blur-[8px] 
                            flex justify-center flex-col py-4 px-4
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 ease-linear">
                
                {/* Title với Tooltip */}
                <div className="relative">
                    <span className="max-w-[70%] overflow-hidden text-ellipsis whitespace-nowrap 
                                    text-white text-sm inline-block 
                                    relative hover:underline peer">
                        {title}
                    </span>

                    {/* Tooltip */}
                    <div 
                        className="absolute hidden peer-hover:flex
                                    bg-gray-600 text-white border border-white font-light
                                    shadow-lg z-50 px-2 py-1 text-sm w-max
                                    transition-opacity duration-200
                                    left-1/2 -translate-x-1/2 top-full"
                    >
                        {title}
                    </div>
                </div>

                {/* Artist & Duration */}
                <div className="flex justify-between w-full text-white/70 text-xs font-light">
                    <span className="overflow-hidden text-ellipsis line-clamp-1 flex-1">
                        {artist}
                    </span>
                    <span className="ml-2">{duration}</span>
                </div>
            </div>
        </div>
    );
};

export default SongCard;
