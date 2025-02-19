import React from 'react'
import TopSongs from '../../components/TopSongs'

function Songs() {
    return (
    <div className='bg-color_body mt-4 p-4 col-span-5 
                overflow-y-auto scrollbar-hidden text-white
                space-y-4'>
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
        <div className='h-fit rounded-2xl px-4 py-6 bg-color_body space-y-6 text-lg'>
            <div className='flex justify-between items-center'>
                <p className='font-medium text-white'>New Release</p>
                <p className='text-gray-400 hover:text-white cursor-pointer text-sm transition duration-200'>
                    See all
                </p>
            </div>
            <TopSongs/>
        </div>
    </div>
    )
}

export default Songs
