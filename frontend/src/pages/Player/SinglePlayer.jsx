import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";
import { formatDuration } from "../../utils/formatDuration";
import MusicContext from "../../helpers/MusicProvider";

const SingleSongPlayer = () => {
    const { songId } = useParams();
    const {
        track, setTrack,
        isPlaying, setIsPlaying,
        player,
        currentTime, setCurrentTime,
        accessToken, deviceId
    } = useContext(MusicContext);

    //GET SONG DETAILS
    useEffect(() => {
        if (!accessToken || !songId) return;

        const fetchTrack = async () => {
            try {
                const res = await axios.get(`https://api.spotify.com/v1/tracks/${songId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setTrack(res.data);
            } catch (error) {
                console.error("❌ Lỗi khi lấy thông tin bài hát:", error);
            }
        };
        fetchTrack();
    }, [accessToken, songId]);

    //PLAY SONG
    useEffect(() => {
        if (!player || !accessToken || !deviceId || !track) return;

        const playTrackIfNew = async () => {
            try {
                const state = await player.getCurrentState();
                const currentTrackUri = state?.track_window?.current_track?.uri;
                const targetUri = `spotify:track:${track.id}`;

                if (currentTrackUri !== targetUri) {
                    await axios.put(
                        "https://api.spotify.com/v1/me/player",
                        { device_ids: [deviceId], play: true },
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                    );

                    await axios.put(
                        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                        { uris: [targetUri] },
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                    );

                    console.log("▶️ Đã phát bài hát mới trên player hiện tại");
                }
            } catch (err) {
                console.error("❌ Lỗi khi phát bài hát:", err);
            }
        };

        playTrackIfNew();
    }, [track, player, accessToken, deviceId]);   
    
    useEffect(() => {
        // if (prevTrackId === songId) return;

        if (!player) return;
    
        const interval = setInterval(async () => {
            const state = await player.getCurrentState();
            if (state) {
                // setCurrentTime(prevTime => {
                //     if (prevTime !== state.position) { // ✅ Chỉ cập nhật nếu giá trị mới khác
                //         return state.position;
                //     }
                //     return prevTime;
                // });
                setCurrentTime(state.position);
                setDuration(state.duration);
            }
        }, 1000);
    
        return () => clearInterval(interval);
    }, [player, isPlaying]);        

    const togglePlayPause = async () => {
        if (!player) return;
    
        try {
            const state = await player.getCurrentState();
            if (!state) return;
    
            if (state.paused) {
                await player.resume();
            } else {
                await player.pause();
            }
            setIsPlaying(!state.paused);
        } catch (error) {
            console.error("❌ Lỗi khi chuyển đổi trạng thái phát nhạc:", error);
        }
    };    

    return (
        // <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        //     {track && (
        //         <>
        //             <img src={track.album.images[0]?.url} alt={track.name} className="w-64 h-64 rounded-lg" />
        //             <h2 className="text-xl mt-4">{track.name}</h2>
        //             <p className="text-sm opacity-75">{track.artists.map((artist) => artist.name).join(", ")}</p>
        //         </>
        //     )}
        //     <button onClick={togglePlayPause} className="mt-4 p-4 bg-gray-800 rounded-full">
        //         {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        //     </button>
        // </div>
        <div
            className="flex flex-col justify-center items-center relative min-h-screen overflow-hidden
                    bg-black font-title"
        >
            <div
                className="absolute inset-0 bg-black blur-xl
                        after:absolute after:inset-0 after:bg-black after:opacity-30"
                style={{
                    backgroundImage: track?.album?.images[0]?.url
                                    ? `url(${track.album.images[0].url})`
                                    : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    animation: "rotateBackground 30s linear infinite",
                    transformOrigin: "center"
                }}
            ></div>

            <div className="relative h-full w-[33%]
                        p-4
                        z-10 text-white
                        flex flex-col justify-center items-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-8 group
                                shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                    <img
                        src={track?.album?.images[0]?.url || null}
                        className="album-cover"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full
                                    flex justify-center px-14
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* <button onClick={() => {
                                playPreviousSong();
                                updateDominantColor();
                            }}disabled={currentTrackIndex === 0}
                                className="cursor-pointer">
                            <FaStepBackward size={38} />
                        </button> */}
                        <button onClick={togglePlayPause}>
                            {isPlaying ? <FaPause size={38}/> : <FaPlay size={38}/>}
                        </button>
                        {/* <button  onClick={() => {
                                playNextSong();
                                updateDominantColor();
                            }} disabled={currentTrackIndex >= trackList.length - 1}>
                            <FaStepForward size={38}/>
                        </button> */}
                    </div>
                </div>

                <div className="w-full flex justify-between text-sm mb-2">
                    <span>{formatDuration(currentTime)}</span> 
                    <span>- {track?.duration_ms ? formatDuration(track.duration_ms - currentTime) : "00:00"}</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={track?.duration_ms || 0}
                    value={currentTime}
                    onChange={(e) => player.seek(e.target.value)}
                    className="w-full custom-range cursor-pointer mb-2"
                />
                <span className="text-center leading-6">
                    <p className="text-base font-[505] uppercase">{track?.name}</p>
                    <p className="opacity-50">{track?.artists?.map(artist => artist.name).join(", ")}</p>
                </span>
            </div>

            {/* CSS Animation */}
            <style>
                {`
                @keyframes rotateBackground {
                    from {
                        transform: scale(2.0) rotate(0deg); 
                    }
                    to {
                        transform: scale(2.0) rotate(360deg);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default SingleSongPlayer;
