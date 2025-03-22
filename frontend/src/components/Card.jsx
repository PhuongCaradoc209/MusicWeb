import React from 'react'
import ToolTip from './ToolTip'

function Card({ image, name, artist }) {
    return (
        <div className='flex flex-col items-start w-36 md:w-40 lg:w-44 
                        p-2 rounded-lg bg-transparent
                        hover:bg-white/10 hover:shadow-lg transition-all duration-300 
                        cursor-pointer'>
            <div className='w-full aspect-square rounded-md overflow-hidden'>
                <img className='w-full h-full object-cover' src={image} alt='Album Cover' />
            </div>

            <div className="relative w-full mt-4 group">
                <p className='text-sm font-semibold truncate text-white group-hover:underline transition'>
                    {name}
                </p>
                <ToolTip text={name} left='60%'/>
            </div>

            <p className='text-sm text-gray-400 truncate w-full mb-4 mt-2'>{artist}</p>
        </div>
    )
}

export default Card
