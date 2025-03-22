import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";
import { formatDuration } from "../../utils/formatDuration";
import MusicContext from "../../helpers/MusicProvider";

const SingleSongPlayer = () => {
    const { songId } = useParams();
    const [deviceId, setDeviceId] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [duration, setDuration] = useState(0);
    const [prevTrackId, setPrevTrackId] = useState(null);

    const { track, setTrack, isPlaying, setIsPlaying, player, setPlayer, currentTime, setCurrentTime} = useContext(MusicContext);

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const res = await axios.get("/api/spotify/token");
                setAccessToken(res.data.accessToken);
            } catch (error) {
                console.error("❌ Lỗi khi lấy access token:", error);
            }
        };
        fetchAccessToken();
    }, []);

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

    useEffect(() => {
        if (!accessToken) return;
        if (player) return; 

        const loadSpotifySDK = () => {
            if (!window.Spotify) {
                const script = document.createElement("script");
                script.src = "https://sdk.scdn.co/spotify-player.js";
                script.async = true;
                document.body.appendChild(script);
                script.onload = () => initPlayer();
            } else {
                initPlayer();
            }
        };

        const initPlayer = () => {
            if (!window.Spotify) return;
        
            const newPlayer = new window.Spotify.Player({
                name: "Spotify Player",
                getOAuthToken: (cb) => cb(accessToken),
                volume: 0.5,
            });
        
            newPlayer.addListener("ready", ({ device_id }) => {
                setDeviceId(device_id);
            });
        
            newPlayer.addListener("player_state_changed", (state) => {
                if (!state) return;
                setIsPlaying(!state.paused);
                setCurrentTime(state.position);
                setDuration(state.duration);
            });
        
            newPlayer.connect();
            setPlayer(newPlayer);
        };        

        loadSpotifySDK();
    }, [accessToken]);

    useEffect(() => {
        if (!deviceId || !accessToken || !songId) return;
        console.log("🎯 Device ID cập nhật:", deviceId);
    
        if (prevTrackId === songId) {
            console.log("🎵 Bài hát đã phát, không phát lại!");
            return;
        }

        const setActiveDevice = async () => {
            try {
                await axios.put(
                    "https://api.spotify.com/v1/me/player",
                    { device_ids: [deviceId] },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                console.log("✅ Đã đặt My Spotify Player làm thiết bị chính!");

                if(isPlaying) {return;}
    
                await axios.put(
                    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                    { uris: [`spotify:track:${songId}`] },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                console.log("▶️ Đã phát bài hát!");

                // Kiểm tra liên tục đến khi phát nhạc rồi tua về 0s
                const waitForPlayback = setInterval(async () => {
                    try {
                        const state = await player.getCurrentState();
                        if (state && !state.paused) {
                            clearInterval(waitForPlayback);
                            await axios.put(
                                "https://api.spotify.com/v1/me/player/seek?position_ms=0",
                                {},
                                { headers: { Authorization: `Bearer ${accessToken}` } }
                            );
                            console.log("⏮ Đã tua về 0 giây!");
                        }
                    } catch (err) {
                        console.error("❌ Lỗi khi kiểm tra trạng thái phát nhạc:", err);
                    }
                }, 100); 
            } catch (err) {
                console.error("❌ Lỗi khi phát bài hát:", err.response?.data || err);
            }
        };
    
        setActiveDevice();
        setPrevTrackId(songId);
    }, [deviceId, accessToken, songId]);
    
    useEffect(() => {
        if (prevTrackId === songId) return;

        if (!player) return;
    
        const interval = setInterval(async () => {
            const state = await player.getCurrentState();
            if (state) {
                setCurrentTime(prevTime => {
                    if (prevTime !== state.position) { // ✅ Chỉ cập nhật nếu giá trị mới khác
                        return state.position;
                    }
                    return prevTime;
                });
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
                    backgroundImage: track ? `url(${track.album?.images[0]?.url || ""})` : "",
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
                        src={track ? track.album?.images[0]?.url || "" : ""}
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
                    <span>- {formatDuration(track.duration_ms - currentTime)}</span>
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
