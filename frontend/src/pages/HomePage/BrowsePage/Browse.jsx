import React from 'react';
import TopArtists from '../../../components/ArtistCard';
import billieEilish from '../../../assets/artists/billieEilish.png';
import items from '../../../assets/items/items.png'
import { FaPlay } from 'react-icons/fa';
import NewReleaseAlbums from '../../../components/NewReleaseAlbums';
import ListeningHistory from '../../../components/ListeningHistory';

function Browse() {
    return (
    <div className='bg-color_body mt-4 p-4 col-span-5
                overflow-y-auto scrollbar-hidden text-white
                space-y-2'>
        <div className='relative h-64 bg-[#fce7c8] rounded-3xl mx-4 mt-16 p-8
                        flex flex-col'
            style={{ clipPath: 'inset(-100px 0 0 0)' }}>
            <span className='text-3xl text-color_0 space-y-2'>
                <p>Billie Eilish</p>
                <p className='text-4xl font-medium'>What Was I Make For?</p>
            </span>
            <button className='bg-black text-white font-medium px-12 py-4 rounded-full
                            hover:bg-opacity-80 transition duration-200
                            mt-auto w-fit flex justify-between items-center gap-x-4'>
                <FaPlay size={18}/>
                Listen now
            </button>
            <img src={items}
                    className='w-7/12 aspect-square object-cover rounded-3xl 
                                absolute -right-[12%] -top-20 animate-spin-slow'/>
            <div>
                <img src={billieEilish} alt="Billie Eilish" 
                    className='w-80 aspect-square object-cover rounded-3xl 
                                absolute right-0 bottom-0'/>
            </div>
        </div>
        <TopArtists/>
        <ListeningHistory/>
        <NewReleaseAlbums/>
    </div>
    )
}

export default Browse