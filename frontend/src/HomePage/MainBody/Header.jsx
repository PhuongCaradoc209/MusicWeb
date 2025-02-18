import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoNotificationsOutline } from 'react-icons/io5'
import ToolTip from './Components/ToolTip'
import AvatarMenu from './Components/AvatarMenu'

function Header() {
    return (
    <div className="relative flex items-center justify-between h-20 px-6 py-6">
        <div className="flex items-center border-b py-2 w-1/6 sm:w-1/2">
            <CiSearch size={32} className="text-white mr-3 cursor-pointer" />
            <input 
                type="text" 
                placeholder="Search by title, artist, or albums..." 
                className="w-full text-base outline-none bg-transparent text-white"
            />
        </div>
    
        <div className="flex items-center gap-x-6 text-2xl text-gray-400">
            <div className="relative group">
                <IoNotificationsOutline 
                    size={24} 
                    className="cursor-pointer hover:text-white transition duration-200" 
                />
                <ToolTip text={"Notification"} left='50%'/>
            </div>
            
            <AvatarMenu/>
        </div>
    </div>    
    )
}

export default Header
