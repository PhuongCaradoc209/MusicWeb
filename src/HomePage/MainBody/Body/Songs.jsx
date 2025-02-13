import React from 'react'
import SongCard from '../Components/SongCard'

function Songs() {
    return (
    <div className='p-4 flex-[5] overflow-y-auto scrollbar-hidden'>
        {
        // <div className="relative h-48 flex items-center justify-center overflow-hidden">
        //     <div className="-mt-48
        //                     w-96 h-96 bg-gray-200 
        //                     flex justify-center
        //                     p-4 rounded-full
        //                     animate-[spin_5s_linear_infinite]">
        //         <img 
        //             src="src/assets/record.png" 
        //             className="w-full h-full object-contain"
        //         />
        //     </div>
        // </div>
        }
        <div className='h-36 rounded-2xl text-[10px]'>
            <div className='flex justify-between'>
                <p className='font-medium'>New release</p>
                <p className='text-[8px] text-gray-500 hover:text-black cursor-pointer'>See all</p>
            </div>
            <div className='flex h-fit pt-3 gap-x-3'>
                <SongCard image={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} title={"Song 1"} artist={"Artist 1"} duration={"3:00"}/>
                <SongCard image={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} title={"Song 1"} artist={"Artist 1"} duration={"3:00"}/>
                <SongCard image={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} title={"Song 1"} artist={"Artist 1"} duration={"3:00"}/>
                <SongCard image={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} title={"Song 1"} artist={"Artist 1"} duration={"3:00"}/>
            </div>
        </div>
    </div>
    )
}

export default Songs
