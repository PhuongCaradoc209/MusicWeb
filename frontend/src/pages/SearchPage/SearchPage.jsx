import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SongList from '../../components/SongList';
import { formatDuration } from '../../utils/formatDuration';
import { useFetchSearch_Song } from '../../hooks/useFetchSearch_Songs';

function SearchPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();
    const { results, loading } = useFetchSearch_Song(query);

    const handleSongClick = (songId) => {
        navigate(`/player/${songId}`)
    }

    return (
        <div className="p-6 mt-20 text-white overflow-auto custom-scrollbar h-full flex flex-col">
            {/* <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2> */}
            {/*CATEGORY*/}
            <div className='h-fit flex flex-row gap-4 mb-8'>
                <span className='text-base px-4 py-2 rounded-full bg-color_0
                                hover:bg-color_4 hover:text-black cursor-pointer
                                transition transform 3s ease-linear'>All</span>
                <span className='text-base px-4 py-2 rounded-full bg-color_0
                                hover:bg-color_4 hover:text-black cursor-pointer
                                transition transform 3s ease-linear'>Songs</span>
                <span className='text-base px-4 py-2 rounded-full bg-color_0
                                hover:bg-color_4 hover:text-black cursor-pointer
                                transition transform 3s ease-linear'>Artists</span>
                <span className='text-base px-4 py-2 rounded-full bg-color_0
                                hover:bg-color_4 hover:text-black cursor-pointer
                                transition transform 3s ease-linear'>Albums</span>
            </div>

            {/*CONTENTS*/}
            <div className='w-full'>
                <div className='w-full h-[350px] flex flex-row '>
                    <p className='md:flex justify-center items-center
                                md:flex-[1] 
                                hidden'>
                        <div
                            className="w-[70%] aspect-square shadow-lg bg-cover bg-center rounded-2xl"
                            style={{
                                backgroundImage: `url(${results[0]?.album?.images[0]?.url})`,
                            }}>
                            
                        </div>
                    </p>
                    <ul className="xl:flex-[2] md:flex-[3] flex-1 list-disc overflow-hidden">
                        {results.length > 0 ? (
                            results.slice(0,4).map((track) => (
                                <SongList 
                                    key={track.id} 
                                    id={track.id}
                                    onClick={handleSongClick}
                                    srcImage={track.album.images[0]?.url}
                                    titleSong={track.name}
                                    artist={track.artists.map(artist => artist.name).join(', ')}
                                    duration={formatDuration(track.duration_ms)}
                                />
                            ))
                        ) : (
                            !loading && <p>No results found.</p>
                        )}
                    </ul>
                </div>
                <div className='w-full h-[350px] border'>

                </div>
            </div>
            {/* {loading && <p>Loading...</p>}

            <ul className="list-disc pl-6">
                {results.length > 0 ? (
                    results.map((track) => (
                        <SongList 
                            key={track.id} 
                            id={track.id}
                            onClick={handleSongClick}
                            srcImage={track.album.images[0]?.url}
                            titleSong={track.name}
                            artist={track.artists.map(artist => artist.name).join(', ')}
                            duration={formatDuration(track.duration_ms)}
                        />
                    ))
                ) : (
                    !loading && <p>No results found.</p>
                )}
            </ul> */}
        </div>
    );
}

export default SearchPage;