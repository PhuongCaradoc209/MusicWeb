import React from 'react'
import MainBody from './MainBody/MainBody'
import Sidebar from './Sidebar/Sidebar'

function HomePage() {
    return (
    <div className='flex min-h-screen bg-gray-400 md:overflow-hidden'>
        <Sidebar/>
        <MainBody/> 
    </div>  
    )
}

export default HomePage
