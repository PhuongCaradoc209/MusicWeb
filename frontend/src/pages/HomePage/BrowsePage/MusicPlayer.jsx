import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { BsSoundwave } from 'react-icons/bs';
import { FaPlay, FaPause } from 'react-icons/fa';
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5';
import { RiPlayListFill } from 'react-icons/ri';
import ToolTip from '../../../components/ToolTip';
import MusicContext from '../../../helpers/MusicProvider';
import togglePlayPause from '../../../utils/togglePlayPause';
import { formatDuration } from '../../../utils/formatDuration';
import wave from '../../../assets/items/wave.gif';
import waveIcon from '../../../assets/items/waveIcon.png';

function Body_right() {
    const { track, isPlaying, setIsPlaying, player, currentTime, setCurrentTime} = useContext(MusicContext);
    const navigate = useNavigate();

    if (!track) return <p className="text-white text-center py-4 flex-4">Không có bài hát nào đang phát</p>;

    const handleTogglePlayPause = () => togglePlayPause(setIsPlaying, isPlaying, player);

    useEffect(() => {
        if (!player) return;
        
        const interval = setInterval(async () => {
            const state = await player.getCurrentState();
            if (state) {
                setCurrentTime(state.position);
                setIsPlaying(!state.paused);
            }
        }, 1000);
        
        return () => clearInterval(interval);
    }, [player]);

    return (
        <div className='py-4 pr-8 col-span-2'>
            <div className='h-full w-auto pt-2 px-6 gap-y-2 text-white bg-color_0_bold 
                        rounded-xl flex flex-col justify-start items-center overflow-hidden'>

                {/* HEADER */}
                <div className='flex items-center w-full h-fit gap-x-6 py-4'>
                    {isPlaying ? (
                        <img src={wave} alt="wave" className="w-14 aspect-square" />
                    ) : (
                        <img src={waveIcon} alt="wave" className="w-14 aspect-square" />
                    )}

                    <span className='text-white text-[18px] font-medium text-nowrap'>Now Playing</span>
                </div>

                {/* Ảnh bài hát */}
                <div className='w-full aspect-square object-cover rounded-2xl bg-cover bg-center flex 
                            items-center justify-center overflow-hidden group'
                    style={{ backgroundImage: `url(${track.album?.images[0]?.url || ''})` }}
                    onClick={() => navigate(`/player/${track.id}`)} >
                    <div className='relative flex items-center justify-center w-full h-full bg-black/30
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='flex items-center justify-between w-[80%] h-10 text-color_4'>
                            <IoPlaySkipBack size={38} className="transition-transform duration-300 hover:scale-110 cursor-pointer" />
                            {isPlaying ? (
                                <FaPause size={30} onClick={(e) => { e.stopPropagation(); handleTogglePlayPause(); }} />
                            ) : (
                                <FaPlay size={30} onClick={(e) => { e.stopPropagation(); handleTogglePlayPause(); }} />
                            )}
                            <IoPlaySkipForward size={38} className="transition-transform duration-300 hover:scale-110 cursor-pointer" />
                        </div>
                        {/* ✅ Hiển thị thời lượng bài hát */}
                        <span className='absolute bottom-2 text-base text-white'>
                        {formatDuration(currentTime)} / {formatDuration(track.duration_ms)}
                        </span>
                    </div>
                </div>

                {/* Thông tin bài hát */}
                <div className='h-fit w-full mt-4 flex justify-between items-center'>
                    <div className='flex flex-col w-[85%] gap-y-1'>
                        <span className='text-xl font-medium truncate'
                            title={track.name}>
                            {track.name}
                        </span>
                        <span className='text-lg font-light text-gray-300'
                            title={track.artists?.map(artist => artist.name).join(", ") || "No Artist"}>
                            {track.artists.map(artist => artist.name).join(", ")}
                        </span>
                    </div>
                    <div className="relative group">
                        <RiPlayListFill size={24} className="text-gray-100 cursor-pointer" />
                        <ToolTip text={"Playlist"} top={"150%"} left={"50%"} />
                    </div>
                </div>

                <hr className="border-t-1 border-gray-400/60 w-full mt-4" />
            </div>
        </div>
    );
}

export default Body_right;
