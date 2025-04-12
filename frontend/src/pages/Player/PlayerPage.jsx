import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { formatDuration } from "../../utils/formatDuration";
import MusicContext from "../../helpers/MusicProvider";

const PlayerPage = () => {
    const {country, songId, playlistId } = useParams();
    const {
        track, trackList, currentTrackIndex, setCurrentTrackIndex,
        isPlaying, setIsPlaying, player, currentTime, setCurrentTime,
        loadTrackOrPlaylist
    } = useContext(MusicContext);

    const [duration, setDuration] = useState(0);
    const isPlaylist = trackList.length > 1;

    useEffect(() => {
        loadTrackOrPlaylist(country, playlistId, songId);
    }, [country, playlistId, songId]);

    const togglePlayPause = async () => {
        if (!player) return;
        const state = await player.getCurrentState();
        if (!state) return;

        if (state.paused) await player.resume();
        else await player.pause();

        setIsPlaying(!state.paused);
    };

    const playNextSong = () => {
        if (isPlaylist && currentTrackIndex < trackList.length - 1) {
            setCurrentTrackIndex(prev => prev + 1);
        }
    };

    const playPreviousSong = () => {
        if (isPlaylist && currentTrackIndex > 0) {
            setCurrentTrackIndex(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (!isPlaying || !player) return;
        const interval = setInterval(async () => {
            const state = await player.getCurrentState();
            if (state) {
                setCurrentTime(state.position);
                setDuration(state.duration);
                if (!state.paused && state.position + 1000 >= state.duration) {
                    playNextSong();
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying, player]);

    if (!track) return null;

    return (
        <div className="flex flex-col justify-center items-center relative min-h-screen overflow-hidden bg-black font-title">
            <div
                className="absolute inset-0 bg-black blur-xl after:absolute after:inset-0 after:bg-black after:opacity-30"
                style={{
                    backgroundImage: `url(${track.album?.images[0]?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    animation: "rotateBackground 30s linear infinite",
                    transformOrigin: "center"
                }}
            ></div>

            <div className="relative h-full w-[33%] p-4 z-10 text-white flex flex-col justify-center items-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-8 group shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                    <img src={track.album?.images[0]?.url} alt={track.name} className="album-cover" />
                    <div 
                        className={`absolute top-1/2 -translate-y-1/2 left-0 
                                w-full flex
                                ${isPlaylist ? 'justify-between' : 'justify-center'}
                                px-14 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300`}>
                        {isPlaylist && (
                            <button onClick={playPreviousSong} disabled={currentTrackIndex === 0}>
                                <FaStepBackward size={38} />
                            </button>
                        )}
                        <button onClick={togglePlayPause}>
                            {isPlaying ? <FaPause size={38} /> : <FaPlay size={38} />}
                        </button>
                        {isPlaylist && (
                            <button onClick={playNextSong} disabled={currentTrackIndex >= trackList.length - 1}>
                                <FaStepForward size={38} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="w-full flex justify-between text-sm mb-2">
                    <span>{formatDuration(currentTime)}</span>
                    <span>- {formatDuration(duration - currentTime)}</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={(e) => player.seek(e.target.value)}
                    className="w-full custom-range cursor-pointer mb-2"
                />
                <span className="text-center leading-6">
                    <p className="text-base font-[505] uppercase">{track.name}</p>
                    <p className="opacity-50">{track.artists.map(artist => artist.name).join(", ")}</p>
                </span>
            </div>

            <style>{`
                @keyframes rotateBackground {
                    from { transform: scale(2.5) rotate(0deg); }
                    to { transform: scale(2.5) rotate(360deg); }
                }
            `}</style>
        </div>      
    );
};

export default PlayerPage;