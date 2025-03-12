import React from 'react'
import { Outlet } from 'react-router-dom'

function SongPage() {
    return (
    <div className='grid overflow-hidden mt-20'>
        <Outlet/> 
    </div>
    )
}

export default SongPage;