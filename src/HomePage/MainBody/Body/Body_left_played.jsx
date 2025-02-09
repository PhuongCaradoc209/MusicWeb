import React from 'react'
import { FaPlus } from 'react-icons/fa'

function Body_left_played({srcImage, titleSong, artist, duration}) {
    return (
    <div className="flex items-center justify-between
                w-full py-2 border-b h-10px-4 
                hover:bg-gray-100 transition text-[8px]
                cursor-pointer">
        <div className="flex items-center flex-[2]">
            <img className="w-6 h-6 mr-2 rounded object-cover" src={srcImage} alt="song cover" />
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

export default Body_left_played
