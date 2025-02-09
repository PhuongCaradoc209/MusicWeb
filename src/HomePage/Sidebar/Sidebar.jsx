import React from 'react'
import Sidebar_Option, { SidebarOptionItem } from './Sidebar_Option'

function Sidebar() {
    return ( 
    <div className='relative flex flex-col justify-center w-1/6 h-screen pl-4
                bg-color_0 text-white gap-y-4'>
        {/* Sidebar */}
        <Sidebar_Option title='Library'>
            <ul className="flex flex-col gap-y-1">
                <SidebarOptionItem to={"/browse"}>Browse</SidebarOptionItem>
                <SidebarOptionItem to={"/songs"}>Songs</SidebarOptionItem>
                <SidebarOptionItem to={"/albums"}>Albums</SidebarOptionItem>
                <SidebarOptionItem to={"/artists"}>Artists</SidebarOptionItem>
                <SidebarOptionItem to={"/genres"}>Genres</SidebarOptionItem>
            </ul>
        </Sidebar_Option>

        <Sidebar_Option title='My music'>
            <ul className="flex flex-col gap-y-1">
                <SidebarOptionItem to={"/recently-played"}>Recently Played</SidebarOptionItem>
                <SidebarOptionItem to={"/favorite-songs"}>Favorite Songs</SidebarOptionItem>
                <SidebarOptionItem to={"/local-file"}>Local File</SidebarOptionItem>
            </ul>
        </Sidebar_Option>
        <div className="absolute top-0 left-[100%] w-[20px] h-[20px] bg-color_0 remain-mask-top">
        </div>
        <div className="absolute bottom-0 left-[100%] w-[20px] h-[20px] bg-color_0 remain-mask-bottom">
        </div>
    </div>
    )
}

export default Sidebar