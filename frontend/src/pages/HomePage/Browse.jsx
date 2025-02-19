import React from 'react';
import SongList from '../../components/SongList'
import ArtistCard from '../../components/ArtistCard'
import ScrollableList from '../../components/ScrollableList';
import Card from '../../components/Card';
import TopArtists from '../../components/ArtistCard';

const albumItems = [
    { srcImage: "https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg", title: "Album 1", artist: "Artist 1" },
    { srcImage: "https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg", title: "Album 2", artist: "Artist 2" },
    { srcImage: "https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg", title: "Album 2", artist: "Artist 2" },
    { srcImage: "https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg", title: "Album 2", artist: "Artist 2" },
    { srcImage: "https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg", title: "Album 2", artist: "Artist 2" },
    { srcImage: "https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg", title: "Album 2", artist: "Artist 2" },
];

function Browse() {
    return (
    <div className='bg-color_body mt-4 p-4 col-span-5
                overflow-y-auto scrollbar-hidden text-white
                space-y-2'>
        <div className='h-64 bg-color_1 rounded-3xl mx-4'>
        </div>
        <TopArtists/>
        <div className='h-fit rounded-2xl px-4 py-6 bg-color_body space-y-6 text-lg'>
            <div className='flex justify-between items-center'>
                <p className='font-medium text-white'>Recently Played</p>
                <p className='text-gray-400 hover:text-white cursor-pointer text-sm transition duration-200'>
                    See all
                </p>
            </div>
            <div className='flex flex-col gap-y-2 overflow-y-auto scrollbar-hidden max-h-44'>
                <SongList srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} titleSong="Song 1" artist="Artist 1" duration="3:45" />
                <SongList srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} titleSong="Song 2" artist="Artist 2" duration="3:45" />
                <SongList srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} titleSong="Song 3" artist="Artist 3" duration="3:45" />
                <SongList srcImage={"https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-2.jpg"} titleSong="Song 4" artist="Artist 4" duration="3:45" /> 
            </div>
        </div>
        <div className='h-fit rounded-2xl px-4 py-6 bg-color_body space-y-6 text-lg'>
            <div className='flex justify-between items-center'>
                <p className='font-medium text-white'>Albums Hot</p>
                <p className='text-gray-400 hover:text-white cursor-pointer text-sm transition duration-200'>
                    See all
                </p>
            </div>
            <ScrollableList items={albumItems} CardComponent={Card} />
        </div>
    </div>
    )
}

export default Browse