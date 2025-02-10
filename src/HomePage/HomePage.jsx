import React from 'react'
import MainBody from './MainBody/MainBody'
import Sidebar from './Sidebar/Sidebar'

function HomePage() {
    return (
    <div className='flex h-screen bg-color_0'>
        <Sidebar/>
        <MainBody/> 
    </div>  
    )
}

export default HomePage