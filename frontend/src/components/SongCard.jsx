import React from "react";

const SongCard = ({ srcImage, title, artist, duration }) => {
    return (
    <div
        className="relative w-36 md:w-40 lg:w-44 
                h-40 md:h-44 lg:h-48
                cursor-pointer group flex flex-col transition-all duration-200
                z-0 group-hover:z-50"
    >
        <img
            className="w-full h-full object-cover flex-1"
            src={srcImage}
            alt={title}
        />

        <div className="absolute bottom-0 left-0 w-full h-fit bg-black/40
                        backdrop-blur-[8px] 
                        flex justify-center flex-col py-4 px-4
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 ease-linear"
        >
        {/* Title với Tooltip */}
        <div className="relative">
            <span
                className="max-w-[70%] overflow-hidden text-ellipsis whitespace-nowrap 
                        text-white text-sm inline-block relative hover:underline peer"
                >
                {title}
            </span>

            <div
                className="absolute hidden peer-hover:block
                            bg-gray-600 text-white border border-white font-light
                            shadow-lg px-2 py-1 text-sm w-fit whitespace-nowrap
                            transition-opacity duration-200
                            top-[100%] left-1/2 -translate-x-1/2
                            z-[99]"
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
