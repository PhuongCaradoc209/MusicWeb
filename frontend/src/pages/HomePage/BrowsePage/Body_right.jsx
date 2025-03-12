import React from 'react'
import { BsSoundwave } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5'
import { RiPlayListFill } from 'react-icons/ri'
import ToolTip from '../../../components/ToolTip'

function Body_right() {
    return (
        <div className='py-4 pr-8 col-span-2'>
            <div className='h-full w-auto pt-2 px-6 gap-y-2
                        text-white
                        bg-color_0_bold rounded-xl
                        flex flex-col justify-start items-center
                        overflow-hidden'>
                {/* HEADER */}
                <div className='flex items-center w-full h-fit gap-x-6 py-4'>
                    <BsSoundwave size={38} className='text-white' />
                    <span className='text-white text-[18px] font-medium text-nowrap'>Now Playing</span>
                </div>
                <div className='flex flex-col w-full gap-y-2'>
                    <div className='w-full aspect-square object-cover rounded-2xl bg-cover bg-center
                                flex items-center justify-center 
                                overflow-hidden group'
                        style={{ backgroundImage: "url('https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg')" }}>
                        <div className='relative flex items-center justify-center w-full h-full bg-black/30
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <div className='flex items-center justify-between w-[80%] h-10 text-color_4'>
                                <IoPlaySkipBack size={38} className="transition-transform duration-300 hover:scale-110 cursor-pointer" />
                                <div className='w-fit h-fit border-2
                                            flex justify-center items-center
                                            p-6 rounded-full
                                            transition-transform duration-100 cursor-pointer active:scale-110
                                            hover:border-gray-300 hover:text-gray-300'>
                                    <FaPlay size={30} />
                                </div>
                                <IoPlaySkipForward size={38} className="transition-transform duration-300 hover:scale-110 cursor-pointer" />
                            </div>
                            <span className='absolute bottom-2 text-base text-white'>2:30</span>
                        </div>
                    </div>
                    <div className='h-fit w-full mt-4 flex justify-between items-center'>
                        <div className='flex flex-col w-fit gap-y-1'>
                            <span className='text-xl font-medium'>Title</span>
                            <span className='text-xl font-light text-gray-300'>Artist</span>
                        </div>
                        <div className="relative group">
                            <RiPlayListFill size={24} className="text-gray-100 cursor-pointer" />
                            {/* Tooltip xuất hiện khi hover vào icon */}
                            <ToolTip text={"Playlist"} top={"150%"} left={"50%"} />
                        </div>
                    </div>
                </div>
                <hr className="border-t-1 border-gray-400/60 w-full mt-4" />
            </div>
        </div>
    )
}

export default Body_right
