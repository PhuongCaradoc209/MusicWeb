import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { LuClock3 } from "react-icons/lu";
import { useNavigate, useParams } from 'react-router-dom';
import { formatDuration } from '../../../utils/formatDuration';
import { useFetchTop50Songs } from '../../../hooks/useFetchTop50Songs';

function Top_50_page() {
  const navigate = useNavigate();
  const {country, playlistId} = useParams();
  const songs = useFetchTop50Songs(country);

  const color_1 = (country === 'vietnam') ? '#73EC8B' : (country === 'global') ? '#B6FFFA' : '#FFCD38';
  const color_2 = (country === 'vietnam') ? '#15B392' : (country === 'global') ? '#687EFF' : '#CF0000';
  
  const handleSongClick = (songId, country) => {
    console.log("Clicked song id:", songId);
    navigate(`/player/top/50/${country}/playlist/${playlistId}/track/${songId}`);
  };

  return (
    <div className='rounded-2xl overflow-y-auto custom-scrollbar text-white space-y-2 h-full'>
      <div className="relative w-full h-80 grid grid-cols-3"
            style={{ backgroundImage: `linear-gradient(to bottom, ${color_2}, #1f1f1f)` }}>
        <div className='col-span-1 flex justify-center items-center'>
          <div 
            className="relative h-60 md:h-64 lg:h-72 aspect-square bg-black flex justify-center items-center"
            style={{ backgroundImage: `linear-gradient(to bottom, ${color_1},  ${color_2}` }}>
            <span className="flex flex-col items-center text-2xl md:text-3xl lg:text-5xl font-bold w-[70%]">
              <p>Top 50</p>
              <hr className="my-8 w-full"/>
              <p className="text-base md:text-lg lg:text-xl uppercase font-medium">
              {
                country === 'global' ? 'Global' :
                country === 'vietnam' ? 'Viet Nam' :
                country === 'china' ? 'China' : country
              }
              </p>
            </span>
          </div>
        </div>
        <span className="col-span-2 flex flex-col justify-center">
          <p className='font-medium mb-4'>Playlist</p>
          <p className='font-bold text-7xl'>
            Top 50 - {
                country === 'global' ? 'Global' :
                country === 'vietnam' ? 'Viet Nam' :
                country === 'china' ? 'China' : country
              }
          </p>
          <span className='w-[70%] font-medium mt-8'>
            <p>
              Discover the hottest tracks in {
                country === 'global' ? 'Global' :
                country === 'vietnam' ? 'Viet Nam' :
                country === 'china' ? 'China' : country
              } right now!
            </p>
            <p>
              This chart features the most popular songs, updated regularly based on streaming trends and listener favorites.
            </p>
          </span>
        </span>
      </div>

      <div className='w-full px-14'>
        <div className='flex justify-between items-center 
                      p-6 w-fit aspect-square rounded-full 
                      text-black cursor-pointer
                      transition-all hover:brightness-125'
            style={{backgroundColor: color_2, }}>
          <FaPlay size={18}/>
        </div>
        <table className="w-full text-sm text-left mt-8" style={{ borderCollapse: "separate", borderSpacing: "0 0.5rem" }}>
          <thead className="font-normal">
            <tr>
              <th className="px-4 py-2 w-2 text-right border-b border-gray-300">#</th>
              <th className="px-4 py-2 border-b border-gray-300">Song Name</th>
              <th className="px-4 py-2 border-b border-gray-300">Artist</th>
              <th className="px-4 py-2 border-b border-gray-300">Album</th>
              <th className="px-4 py-2 w-4 border-b border-gray-300">
                <LuClock3 size={18} />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(songs) && songs.length > 0 ? (
              songs.map((song, index) => (
                <tr 
                  key={song.spotifyId} 
                  className="hover:bg-color_0_bold cursor-pointer"
                  onClick={() => handleSongClick(song.spotifyId, country)} >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 flex items-center gap-x-4">
                    <img
                      src={song.albumImageUrl}
                      alt={song.title}
                      className="w-12 aspect-square object-cover rounded-lg"
                    />
                    {song.title}
                  </td>
                  <td className="px-4 py-2">{song.artistName}</td>
                  <td className="px-4 py-2">{song.albumName}</td>
                  <td className="px-4 py-2">{formatDuration(song.duration)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No songs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Top_50_page;