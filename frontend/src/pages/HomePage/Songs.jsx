import React from 'react'
import TopSongs from '../../components/TopSongs'
import NewReleaseSongs from '../../components/NewReleaseSongs'

function Songs() {
    return (
    <div className='bg-color_body mt-4 p-4 col-span-5
                overflow-y-auto scrollbar-hidden text-white
                space-y-2'>
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
        <div className='h-64 bg-color_1 rounded-3xl mx-4'></div>
        <NewReleaseSongs/>
    </div>
    )
}

export default Songs
