import React from 'react'
import Header from './Header'

function MainBody() {
    return (
    <div className='flex flex-col flex-1 
                bg-color_4 rounded-2xl shadow-lg shadow-gray-700/90 overflow-auto'>
        <Header/>
    </div>
    )
}

export default MainBody
