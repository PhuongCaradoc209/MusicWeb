import React from 'react'
import Sidebar_Option, { SidebarOptionItem } from './Sidebar_Option'

function Sidebar() {
    return ( 
        <div className='relative flex flex-col w-60 min-w-56 h-screen px-6 md:px-4
                bg-black text-white py-6 text-lg md:text-base'>
        {/* Sidebar */}
        <div className="flex flex-col flex-grow justify-center gap-y-28">
            <Sidebar_Option title='Library'>
                <ul className="flex flex-col gap-y-2">
                    <SidebarOptionItem to={"/browse"}>Browse</SidebarOptionItem>
                    <SidebarOptionItem to={"/songs"}>Songs</SidebarOptionItem>
                    <SidebarOptionItem to={"/albums"}>Albums</SidebarOptionItem>
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
        <div className="absolute top-0 left-[100%] w-[20px] h-[20px] bg-black remain-mask-top"></div>
        <div className="absolute bottom-0 left-[100%] w-[20px] h-[20px] bg-black remain-mask-bottom"></div>
        </div>
    )
}

export default Sidebar
