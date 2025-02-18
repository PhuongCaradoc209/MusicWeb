import React from 'react'
import Header from '../../components/Header'
import BodyWrapper from './BodyWrapper'

function MainBody() {
    return (
    <div>
        <div className="flex flex-col flex-1 h-screen bg-color_body shadow-lg shadow-gray-700/90">
            <Header/>
            <BodyWrapper/>
        </div>
    </div>
    )
}

export default MainBody
