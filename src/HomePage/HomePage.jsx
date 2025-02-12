import React from 'react'
import MainBody from './MainBody/MainBody'
import Sidebar from './Sidebar/Sidebar'

function HomePage() {
    return (
    <div className='flex h-[100dvh] bg-color_0 overflow-hidden'>
        <Sidebar/>
        <MainBody/> 
    </div>  
    )
}

export default HomePage