import React from 'react'
import Body_left_artist from './Body_left_artist'

function Body_left() {
    return (
    <div className='bg-color_4 p-4 flex-[3] overflow-y-auto scrollbar-hidden'>
        <div className='h-36 bg-color_1 rounded-2xl p-4 shadow-box'>
        </div>
        <div className='h-28 rounded-2xl mt-4 text-[10px]'>
            <div className='flex justify-between'>
                <p className='font-medium'>Popular artist</p>
                <p className='text-[8px] text-gray-500'>See all</p>
            </div>
            <div className='flex gap-x-6'>
                <Body_left_artist image="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg" name="Artist 1" />
                <Body_left_artist image="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg" name="Artist 1" />
                <Body_left_artist image="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg" name="Artist 1" />
                <Body_left_artist image="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg" name="Artist 1" />
                <Body_left_artist image="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg" name="Artist 1" />
            </div>
        </div>
        <div className='h-28 border rounded-2xl mt-4 text-[10px]'>
            <div className='flex justify-between'>
                <p className='font-medium'>Recently played</p>
                <p className='text-[8px] text-gray-500'>See all</p>
            </div>
        </div>
    </div>
    )
}

export default Body_left