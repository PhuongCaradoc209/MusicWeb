import React from 'react'
import { BsSoundwave } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5'
import { RiPlayListFill } from 'react-icons/ri'

function Body_right() {
    return (
    <div className='py-4 pr-4 flex-[1]'> 
        <div className='h-full w-auto p-2 gap-y-2
                        bg-gray-200 rounded-xl
                        flex flex-col justify-start items-center
                        overflow-hidden'>
            {/* HEADER */}
            <div className='flex items-center w-full h-fit gap-x-2'>
                <BsSoundwave size={16} className='text-black' />
                <span className='text-color_0_bold text-[8px] font-medium'>Now Playing</span>
            </div>
            <div className='flex flex-col w-full h-44 gap-y-1'>
                <div className='w-full aspect-square object-cover rounded-2xl bg-cover bg-center
                                flex items-center justify-center 
                                overflow-hidden group'
                    style={{ backgroundImage: "url('https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg')" }}>
                    <div className='relative flex items-center justify-center w-full h-full bg-black/30
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='flex items-center justify-between w-[80%] h-8 text-color_4'>
                            <IoPlaySkipBack size={14} className="transition-transform duration-300 hover:scale-110 cursor-pointer" />
                            <div className='w-fit h-fit border 
                                            flex justify-center items-center
                                            p-3  rounded-full
                                            transition-transform duration-100 cursor-pointer active:scale-110
                                            hover:border-gray-300 hover:text-gray-300
                                            '>
                                <FaPlay size={12} className="" />
                            </div>
                            <IoPlaySkipForward size={14} className="transition-transform duration-300 hover:scale-110 cursor-pointer" />
                        </div>
                        <span className='absolute bottom-2 text-[8px] text-white'>2:30</span>
                    </div>
                </div>
                <div className='h-fit w-full mt-2
                                flex justify-between items-center'>
                    <div className='flex flex-col w-fit border-red-800 gap-y-1'>
                        <span className='text-[10px] font-medium'>Title</span>
                        <span className='text-[8px] font-light text-gray-700'>Artist</span>
                    </div>
                    <div className="relative group">
                        <RiPlayListFill size={12} className="text-gray-500 cursor-pointer" />

                        {/* Tooltip xuất hiện khi hover vào icon */}
                        <div className="absolute top-[90%] left-[-105%] mt-1 
                                        hidden group-hover:block bg-color_4 text-black text-[6px] px-1 py-0.5 
                                        border border-black font-medium
                                        whitespace-nowrap shadow-md">
                            Playlist
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-t-1 border-gray-400/60 w-full" />


        </div>
    </div>
    )
}

export default Body_right