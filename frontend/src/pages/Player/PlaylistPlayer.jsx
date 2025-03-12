import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import ColorThief from 'color-thief-browser';
import { formatDuration } from "../../utils/formatDuration";

const PlaylistPlayer = () => {
    const {country, playlistId, songId } = useParams();  // Nhận cả playlistId và songId
    const [player, setPlayer] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [trackList, setTrackList] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [accessToken, setAccessToken] = useState(null); 

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const res = await axios.get("/api/spotify/token"); // Gọi API backend
                setAccessToken(res.data.accessToken); // Lấy access token từ phản hồi JSON
            } catch (error) {
                console.error("❌ Lỗi khi lấy access token:", error);
            }
        };

        fetchAccessToken();
    }, []);

    useEffect(() => {
        if (!accessToken) {
            console.error("❌ No access token found");
            return;
        }

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
            if (!window.Spotify) {
                console.error("❌ window.Spotify không tồn tại!");
                return;
            }

            const newPlayer = new window.Spotify.Player({
                name: "My Spotify Player",
                getOAuthToken: (cb) => cb(accessToken),
                volume: 0.5,
            });

            newPlayer.addListener("ready", ({ device_id }) => {
                setDeviceId(device_id);
            });

            newPlayer.addListener("player_state_changed", (state) => {
                if (state) {
                    setIsPlaying(!state.paused);
                    setCurrentTime(state.position);
                    setDuration(state.duration);
                }
            });            

            newPlayer.connect();
            setPlayer(newPlayer);
        };

        loadSpotifySDK();
    }, [accessToken]);

    useEffect(() => {
        if (!playlistId || !accessToken) return;

        const fetchPlaylistTracks = async () => {
            try {
                const res = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const tracks = res.data.items.map((item) => item.track);
                setTrackList(tracks);

                // Xác định vị trí bài hát `songId` trong danh sách
                const trackIndex = tracks.findIndex((track) => track.id === songId);
                setCurrentTrackIndex(trackIndex !== -1 ? trackIndex : 0);
            } catch (error) {
                console.error("❌ Lỗi khi lấy danh sách bài hát:", error.response?.data || error);
            }
        };

        fetchPlaylistTracks();
    }, [playlistId, songId, accessToken]);

    useEffect(() => {
        if (!deviceId || trackList.length === 0) return;

        const playPlaylist = async () => {
            try {
                await axios.put(
                    "https://api.spotify.com/v1/me/player",
                    { device_ids: [deviceId], play: false },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );

                await axios.put(
                    "https://api.spotify.com/v1/me/player/play",
                    {
                        uris: [`spotify:track:${trackList[currentTrackIndex]?.id}`]
                    },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );                
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
                console.log("Songid: " + songId);
            
                console.log("▶️ Đã phát playlist từ bài hát:", trackList[currentTrackIndex]?.name);
            } catch (err) {
                console.error("❌ Lỗi khi phát playlist:", err.response?.data || err);
            }
        };

        playPlaylist();
    }, [deviceId, currentTrackIndex, trackList]);

    const togglePlayPause = async () => {
        if (!player) return;
        if (isPlaying) {
            await player.pause();
        } else {
            await player.resume();
        }
        setIsPlaying(!isPlaying);
    };

    const playNextSong = () => {
        if (currentTrackIndex < trackList.length - 1) {
            setCurrentTrackIndex((prev) => prev + 1);
        } else {
            console.log("📌 Playlist đã phát hết.");
        }
    };    

    const playPreviousSong = () => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
        }
    };

    useEffect(() => {
        if (!isPlaying) return;
    
        const interval = setInterval(async () => {
            const state = await player.getCurrentState();
            if (state) {
                setCurrentTime(state.position);
                setDuration(state.duration);
                // Nếu bài hát kết thúc (đã phát hết)
                if (!state.paused && state.position + 1000 >= state.duration) {
                    playNextSong();
                }  
            }
        }, 1000);
    
        return () => clearInterval(interval);
    }, [isPlaying]);   

    return (
        <div
            className="flex flex-col justify-center items-center relative min-h-screen overflow-hidden
                    bg-black font-title"
        >
            <div
                className="absolute inset-0 bg-black blur-xl
                        after:absolute after:inset-0 after:bg-black after:opacity-30"
                style={{
                    backgroundImage: `url(${trackList[currentTrackIndex]?.album.images[0]?.url || ""})`,
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
                        src={trackList[currentTrackIndex]?.album.images[0]?.url || ""}
                        alt={trackList[currentTrackIndex]?.name}
                        className="album-cover"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full
                                    flex justify-between px-14
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={() => {
                                playPreviousSong();
                            }}disabled={currentTrackIndex === 0}
                                className="cursor-pointer">
                            <FaStepBackward size={38} />
                        </button>
                        <button onClick={togglePlayPause}>
                            {isPlaying ? <FaPause size={38}/> : <FaPlay size={38}/>}
                        </button>
                        <button  onClick={() => {
                                playNextSong();
                            }} disabled={currentTrackIndex >= trackList.length - 1}>
                            <FaStepForward size={38}/>
                        </button>
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
                    <p className="text-base font-[505] uppercase">{trackList[currentTrackIndex]?.name}</p>
                    <p className="opacity-50">{trackList[currentTrackIndex]?.artists.map(artist => artist.name).join(", ")}</p>
                </span>
            </div>

            {/* CSS Animation */}
            <style>
                {`
                @keyframes rotateBackground {
                    from {
                        transform: scale(2.5) rotate(0deg); 
                    }
                    to {
                        transform: scale(2.5) rotate(360deg);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default PlaylistPlayer;