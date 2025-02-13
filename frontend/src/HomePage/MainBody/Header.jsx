import React from 'react'
import { CiSearch } from 'react-icons/ci'
import {IoNotificationsOutline } from 'react-icons/io5'
import ToolTip from './Components/ToolTip'
import AvatarMenu from './Components/AvatarMenu'

function Header() {
    return (
    <div className="relative flex items-center justify-between h-8 px-4 py-6">
        <div className='text-[8px] w-fit'>
            <span>Welcome back, Kenshii!</span>
        </div>
        {/* Ô tìm kiếm */}
        <div className="flex items-center border rounded-2xl px-3 py-1 w-1/3 sm:w-1/2">
            <CiSearch size={15} className="text-gray-500 mr-2 cursor-pointer" />
            <input 
                type="text" 
                placeholder="Search by title, artist, or albums..." 
                className="w-full text-[8px] outline-none bg-transparent"
            />
        </div>
    
        {/* Các icon điều khiển */}
        <div className="flex items-center gap-x-4 text-xl text-gray-600">
            <div className="relative group">
                <IoNotificationsOutline 
                    size={12} 
                    className="cursor-pointer hover:text-gray-900 transition duration-200" 
                />
                <ToolTip text={"Notification"} left='50%'/>
            </div>
            
            {/* Avatar */}
            {
            //     <div className='w-7 h-7 rounded-full flex justify-center items-center 
            //             bg-transparent hover:scale-110 hover:bg-gray-300/30
            //             transition-transform ease-linear
            //             relative group'>
            //     <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer text-[11px]">
            //         🧑
            //     </div>
            //     <ToolTip text={"Profile"} top='100%' left='0' />
            // </div>
            }
            <AvatarMenu/>
        </div>
    </div>    
    )
}

export default Header
