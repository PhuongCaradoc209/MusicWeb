import React from 'react'
import Body_right from './Body_right'
import { Outlet } from 'react-router-dom'

function BodyWrapper() {
    return (
        <div className='flex flex-1 h-full overflow-hidden'>
            <Outlet/> 
            <Body_right/>
        </div>
    )
}

export default BodyWrapper