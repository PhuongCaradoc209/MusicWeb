import React from 'react'
import Sidebar from './Sidebar'
import MainBody from './MainBody/MainBody'

function HomePage() {
    return (
    <div className='flex bg-color_0'>
        <Sidebar/>
        <MainBody/> 
    </div>
    )
}

export default HomePage
