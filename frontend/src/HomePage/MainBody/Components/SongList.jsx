import React from 'react'
import { FaPlus } from 'react-icons/fa'

function SongList({srcImage, titleSong, artist, duration}) {
    return (
    <div className="flex items-center justify-between
                w-full py-4 px-4
                rounded-md
                hover:bg-white/10
                transition text-sm
                cursor-pointer">
        <div className="flex items-center flex-[2] gap-x-4">
            <img className="w-14 aspect-square mr-2 rounded object-cover" src={srcImage} alt="song cover" />
            <span className="truncate font-medium">{titleSong}</span>
        </div>
        <div className="flex-[1] truncate">{artist}</div>
        <div className="flex-[1] flex justify-end text-gray-500">{duration}</div>
        <div className="flex-[1] flex justify-end">
            <FaPlus className="cursor-pointer transition-transform transform hover:scale-110" />
        </div>
    </div>
    )
}

export default SongList
