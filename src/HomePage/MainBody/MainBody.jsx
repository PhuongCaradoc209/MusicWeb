import React from 'react'
import Header from './Header'
import BodyWrapper from './Body/BodyWrapper'

function MainBody() {
    return (
    <div className='flex flex-col flex-1 h-screen
                bg-color_4 shadow-lg shadow-gray-700/90'>
        <Header/>
        <BodyWrapper/>
    </div>
    )
}

export default MainBody
