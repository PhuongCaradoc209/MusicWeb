import React from 'react'
import Body_right from './MusicPlayer'
import Browse from "./Browse";

function BrowsePage() {
    return (
        <div className='grid grid-cols-7 h-full mb-8 overflow-hidden mt-20'>
            <Browse/>
            <Body_right/>
        </div>
    )
}

export default BrowsePage