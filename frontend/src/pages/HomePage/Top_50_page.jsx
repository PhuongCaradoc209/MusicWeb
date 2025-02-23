import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { LuClock3 } from "react-icons/lu";

function Top_50_page() {
  const [songs, setSongs] = useState([]);

  // Hàm chuyển đổi milliseconds sang mm:ss
  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/songs/global-top50", {
      method: "POST"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched new release songs:", data);
        setSongs(data);
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu từ backend:", err));
  }, []);
  
  return (
    <div className='rounded-2xl overflow-y-auto custom-scrollbar text-white space-y-2 h-full'>
      <div className="relative w-full h-80 grid grid-cols-3 bg-gradient-to-b from-[#15B392] to-color_body">
        <div className='col-span-1 flex justify-center items-center'>
          <div 
            className="relative h-60 md:h-64 lg:h-72 aspect-square bg-black flex justify-center items-center bg-gradient-to-b from-[#73EC8B] to-[#15B392]">
            <span className="flex flex-col items-center text-2xl md:text-3xl lg:text-5xl font-bold w-[70%]">
              <p>Top 50</p>
              <hr className="my-8 w-full"/>
              <p className="text-base md:text-lg lg:text-xl uppercase font-medium">Viet Nam</p>
            </span>
          </div>
        </div>
        <span className="col-span-2 flex flex-col justify-center">
          <p className='font-medium mb-4'>Playlist</p>
          <p className='font-bold text-7xl'>
            Top 50 - Viet Nam
          </p>
          <span className='w-[70%] font-medium mt-8'>
            <p>
              Discover the hottest tracks in Vietnam right now! 
            </p>
            <p>
              This chart features the most popular songs, updated regularly based on streaming trends and listener favorites.
            </p>
          </span>
        </span>
      </div>

      <div className='w-full px-14'>
        <div className='flex justify-between items-center p-6 w-fit aspect-square rounded-full bg-[#15B392] text-black cursor-pointer'>
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
                <tr key={song.spotifyID} className="hover:bg-color_0_bold cursor-pointer">
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