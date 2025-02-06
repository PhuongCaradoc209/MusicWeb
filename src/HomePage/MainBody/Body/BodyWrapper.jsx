import React from 'react'
import Body_left from './Body_left'
import Body_right from './Body_right'

function BodyWrapper() {
    return (
    <div className='flex flex-1 h-full overflow-hidden'>
        <Body_left/>
        <Body_right/>
    </div>
    )
}

export default BodyWrapper