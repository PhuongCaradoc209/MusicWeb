import React from 'react'
import MainBody from './MainBody'
import Sidebar from '../../components/Sidebar/Sidebar'

function HomePage() {
    return (
    <div className='flex min-h-screen bg-gray-400 md:overflow-hidden'>
        <Sidebar/>
        <MainBody/>
    </div>  
    )
}

export default HomePage
