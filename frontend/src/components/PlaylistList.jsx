import React from "react";

function PlaylistList({track, onClick}) {
    return(
        <div className="w-full h-16 p-2 flex items-center gap-x-4 cursor-pointer hover:bg-color_0 rounded-sm
                        transition-all ease-linear" onClick={onClick}>
            <img
                className="h-full aspect-square object-cover rounded-sm bg-cover bg-center"
                src={track.album?.images[0]?.url}
                alt="Album"
            />
            <div className="flex flex-col w-full h-full justify-center">
                <span
                className="text-base font-medium text-white truncate w-[90%]"
                title={track.album?.name}
                >
                {track.album?.name}
                </span>
                <span
                className="text-sm font-light text-gray-300 truncate w-[90%]"
                title={track.album?.artists.map((artist) => artist.name).join(", ")}
                >
                {track.album?.artists.map((artist) => artist.name).join(", ")}
                </span>
            </div>
        </div>
    );
}

export default PlaylistList;
