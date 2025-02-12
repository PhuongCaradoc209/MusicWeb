import React from 'react'

function Card({srcImage, title, artist}) {
    return (
        <div className='flex flex-col items-start
                    p-2 rounded-lg w-24 bg-transparent
                    hover:bg-white hover:shadow-md cursor-pointer'>
            {/* Album cover */}
            <img 
            className='w-20 h-20 object-cover rounded-md' 
            src={srcImage}
            alt='Album Cover' 
            />
            {/* Album name */}
            <div className="relative left-0 w-fit">
                <p className='text-[8px] font-semibold text-start truncate mt-1
                        hover:underline cursor-pointer group'>
                {title}
                    {/* Tooltip */}
                    <div className="absolute top-[90%] left-[105%] mt-1 
                                    hidden group-hover:block bg-color_4 text-black text-[6px] px-1 py-0.5 
                                    border border-black
                                    whitespace-nowrap shadow-md">
                        {title}
                    </div>
                </p>
            </div>
            {/* Artist */}
            <p className='text-[6px] text-gray-500 text-start truncate w-full mt-0.5'>{artist}</p>
        </div>
    )
}

export default Card
