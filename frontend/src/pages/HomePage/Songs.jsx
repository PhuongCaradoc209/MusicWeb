import React from 'react'
import TopSongs from '../../components/TopSongs'
import NewReleaseSongs from '../../components/NewReleaseSongs'
import musicHand from '../../assets/items/musicHand.png'

function Songs() {
    return (
    <div className='col-span-5 rounded-2xl
                bg-gradient-to-l from-[#fe5c3c] to-[#63061a]
                overflow-y-auto scrollbar-hidden text-white
                space-y-2'>
        <div className='relative w-full h-72 flex justify-center items-center'>
            <img 
                src={musicHand} 
                className='w-[50%] aspect-square object-cover relative z-20'
                alt="Music Hand"
            />
            <div className='absolute inset-0 bg-gradient-to-b from-color_body to-transparent z-10' />
        </div>


        <div className='p-4'>
            <NewReleaseSongs/>
            <NewReleaseSongs/>
            <NewReleaseSongs/>
            <NewReleaseSongs/>
        </div>
    </div>
    )
}

export default Songs
