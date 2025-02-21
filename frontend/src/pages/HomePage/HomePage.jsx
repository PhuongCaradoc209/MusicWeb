import React from 'react'
import MainBody from './MainBody'
import Sidebar from '../../components/Sidebar/Sidebar'

function HomePage() {
    return (
    <div className="min-h-screen bg-color_body md:overflow-hidden grid grid-cols-[auto,1fr]">
        <Sidebar/>
        <MainBody/>
    </div>  
    )
}

export default HomePage
