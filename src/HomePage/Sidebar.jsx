import React from 'react'
import Sidebar_Option, { SidebarOptionItem } from './Sidebar_Option'

function Sidebar() {
    return ( 
    <div className='flex flex-col w-1/6 h-screen pl-2 pt-6
                bg-color_0 text-white gap-y-4'>
        {/* Sidebar */}
        <Sidebar_Option title='Library'>
            <ul className="flex flex-col gap-y-2">
                <SidebarOptionItem>Browse</SidebarOptionItem>
                <SidebarOptionItem>Songs</SidebarOptionItem>
                <SidebarOptionItem>Albums</SidebarOptionItem>
                <SidebarOptionItem>Artists</SidebarOptionItem>
                <SidebarOptionItem>Genres</SidebarOptionItem>
            </ul>
        </Sidebar_Option>
        <Sidebar_Option title='My music'>
            <ul className="flex flex-col gap-y-2">
                <SidebarOptionItem>Recently Played</SidebarOptionItem>
                <SidebarOptionItem>Favorite Songs</SidebarOptionItem>
                <SidebarOptionItem>Local File</SidebarOptionItem>
            </ul>
        </Sidebar_Option>
    </div>
    )
}

export default Sidebar