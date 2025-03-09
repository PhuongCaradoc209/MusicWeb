import React, { useContext } from 'react'
import { CiSearch } from 'react-icons/ci'
import SignUpLogInButton from '../components/SignUpLogInButton'
import { AuthContext } from '../helpers/AuthorProvider'
import AvatarMenu from './AvatarMenu';
import ToolTip from './ToolTip';
import { IoNotificationsOutline } from 'react-icons/io5';

function Header() {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
    <div className="absolute top-0 left-0 w-full z-50 h-20 
                    flex items-center justify-between px-6 py-6
                    bg-color_body">
        <div className="flex items-center border-b py-2 w-1/6 sm:w-1/2">
            <CiSearch size={32} className="text-white mr-3 cursor-pointer" />
            <input 
                type="text" 
                placeholder="Search by title, artist, or albums..." 
                className="w-full text-base outline-none bg-transparent text-white"
            />
        </div>
    
        <div className="flex items-center gap-x-2 text-2xl text-gray-400">
                {isAuthenticated ? (
                    <>
                        <div className="relative group">
                            <IoNotificationsOutline 
                                size={24} 
                                className="cursor-pointer hover:text-white transition duration-200 mr-6" 
                            />
                            <ToolTip text={"Notification"} left="50%" />
                        </div>
                        <AvatarMenu/>
                    </>
                ) : (
                    <SignUpLogInButton />
                )}
        </div>
    </div>    
    )
}

export default Header