import React from 'react'
import Card from './Card'
import Browse_played from './Browse_played'
import Browse_artist from './Browse_artist'

function Browse() {
    return (
    <div className='bg-color_4 p-4 flex-[3] overflow-y-auto scrollbar-hidden'>
        <div className='h-36 bg-color_1 rounded-2xl p-4 shadow-box'>
        </div>
        <div className='h-28 rounded-2xl mt-4 text-[10px]'>
            <div className='flex justify-between'>
                <p className='font-medium'>Popular artist</p>
                <p className='text-[8px] text-gray-500 hover:text-black cursor-pointer'>See all</p>
            </div>
            <div className='flex gap-x-7'>
                <Browse_artist image="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg" name="Artist 1" />
                <Browse_artist image="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg" name="Artist 1" />
                <Browse_artist image="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg" name="Artist 1" />
                <Browse_artist image="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg" name="Artist 1" />
                <Browse_artist image="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg" name="Artist 1" />
            </div>
        </div>
        <div className='h-28 rounded-2xl mt-4 text-[10px]'>
            <div className='flex justify-between'>
                <p className='font-medium'>Recently played</p>
                <p className='text-[8px] text-gray-500 hover:text-black cursor-pointer'>See all</p>
            </div>
            <div className='flex flex-col gap-y-2 overflow-y-auto scrollbar-hidden max-h-24'>
                <Browse_played srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} titleSong="Song 1" artist="Artist 1" duration="3:45" />
                <Browse_played srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} titleSong="Song 2" artist="Artist 2" duration="3:45" />
                <Browse_played srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} titleSong="Song 3" artist="Artist 3" duration="3:45" />
                <Browse_played srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} titleSong="Song 4" artist="Artist 4" duration="3:45" /> 
            </div>
        </div>
        <div className='h-fit rounded-2xl mt-4 text-[10px]'>
            <div className='flex justify-between mb-2'>
                <p className='font-medium'>Albums Hot</p>
                <p className='text-[8px] text-gray-500 hover:text-black cursor-pointer'>See all</p>
            </div>
            <div className='flex h-fit gap-x-4'>
                <Card srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} title="Album 1" artist="Artist 1" />
                <Card srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} title="Album 1" artist="Artist 1" />
                <Card srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} title="Album 1" artist="Artist 1" />
                <Card srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} title="Album 1" artist="Artist 1" />
            </div>
        </div>
    </div>
    )
}

export default Browse