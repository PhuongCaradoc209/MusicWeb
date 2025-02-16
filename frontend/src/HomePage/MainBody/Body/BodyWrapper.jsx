import React from 'react'
import Body_right from './Body_right'
import { Outlet } from 'react-router-dom'

function BodyWrapper() {
    return (
        <div className='grid grid-cols-7 h-full mb-8 overflow-hidden'>
            <Outlet/> 
            <Body_right/>
        </div>
    )
}

export default BodyWrapper