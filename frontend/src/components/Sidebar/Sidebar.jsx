import React from 'react'
import Sidebar_Option, { SidebarOptionItem } from './Sidebar_Option'
import logo from '/logoPage.png'

function Sidebar() {
    return ( 
        <div className='relative flex flex-col w-60 min-w-56 h-screen px-6 md:px-4
                bg-black text-white py-6 text-lg md:text-base'>
        {/* Sidebar */}
        <img src={logo} className=' w-20 h-20 ml-3 -mb-6'/>
        <div className=" flex flex-col flex-grow justify-center gap-y-28">
            <Sidebar_Option title='Library'>
                <ul className="flex flex-col gap-y-2">
                    <SidebarOptionItem to={"/browsePage"}>Browse</SidebarOptionItem>
                    <SidebarOptionItem to={"/songsPage"}>Songs</SidebarOptionItem>
                    <SidebarOptionItem to={"/albumsPage"}>Albums</SidebarOptionItem>
                    <SidebarOptionItem to={"/artists"}>Artists</SidebarOptionItem>
                    <SidebarOptionItem to={"/genres"}>Genres</SidebarOptionItem>
                </ul>
            </Sidebar_Option>

            <Sidebar_Option title='My music'>
                <ul className="flex flex-col gap-y-2">
                    <SidebarOptionItem to={"/recently-played"}>Recently Played</SidebarOptionItem>
                    <SidebarOptionItem to={"/favorite-songs"}>Favorite Songs</SidebarOptionItem>
                    <SidebarOptionItem to={"/local-file"}>Local File</SidebarOptionItem>
                </ul>
            </Sidebar_Option>
        </div>

        {/* Remain mask elements */}
        <div className="absolute top-0 left-[100%] w-[40px] h-[40px] bg-black remain-mask-top z-[99]"></div>
        <div className="absolute bottom-0 left-[100%] w-[40px] h-[40px] bg-black remain-mask-bottom z-[99]"></div>
        </div>
    )
}

export default Sidebar
