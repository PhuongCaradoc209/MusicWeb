import React from 'react'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'

function MainBody() {
    return (
    <div>
        <div className="flex flex-col h-screen bg-color_body shadow-lg shadow-gray-700/90">
            <div className='relative'>
                <Header/>
            </div>
            <Outlet/>
        </div>
    </div>
    )
}

export default MainBody
