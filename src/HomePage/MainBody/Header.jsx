import React from 'react'
import { CiSearch } from 'react-icons/ci'
import {IoNotificationsOutline } from 'react-icons/io5'
import { SlSettings } from 'react-icons/sl'

function Header() {
    return (
        <div className="relative flex items-center justify-between h-8 px-4 pt-8 pb-4">
        {/* Ô tìm kiếm */}
        <div className="flex items-center border rounded-2xl px-3 py-1 w-1/3 sm:w-1/2">
            <CiSearch size={15} className="text-gray-500 mr-2 cursor-pointer" />
            <input 
                type="text" 
                placeholder="Search..." 
                className="w-full text-[10px] outline-none bg-transparent"
            />
        </div>
    
        {/* Các icon điều khiển */}
        <div className="flex items-center gap-x-4 text-xl text-gray-600">
            <SlSettings size={12} className="cursor-pointer font-bold hover:text-gray-900 transition duration-200" />
            <IoNotificationsOutline size={12} className="cursor-pointer hover:text-gray-900 transition duration-200" />
            
            {/* Avatar */}
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer text-[11px]">
                🧑
            </div>
        </div>
    </div>    
    )
}

export default Header
