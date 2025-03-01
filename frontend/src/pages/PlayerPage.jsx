import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";

const PlayerPage = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const accessToken = localStorage.getItem("spotifyAccessToken");

    useEffect(() => {
        if (!accessToken) {
            console.error("❌ No access token found");
            return;
        }

        console.log("✅ Access Token:", accessToken);

        const loadSpotifySDK = () => {
            if (!window.Spotify) {
                console.log("📥 Đang tải Spotify SDK...");
                const script = document.createElement("script");
                script.src = "https://sdk.scdn.co/spotify-player.js";
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => {
                    console.log("📜 Spotify SDK đã tải xong.");
                    initPlayer();
                };
            } else {
                console.log("🎵 Spotify SDK đã có sẵn.");
                initPlayer();
            }
        };

        const initPlayer = () => {
            console.log("🚀 Khởi tạo Spotify Player...");

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
                console.log("✅ Player đã sẵn sàng với Device ID:", device_id);
                setDeviceId(device_id);
            });

            newPlayer.addListener("not_ready", ({ device_id }) => {
                console.warn("⚠️ Player bị ngắt kết nối:", device_id);
            });

            newPlayer.addListener("authentication_error", ({ message }) => {
                console.error("❌ Lỗi xác thực:", message);
            });

            newPlayer.addListener("player_state_changed", (state) => {
                if (state) {
                    setIsPlaying(!state.paused);
                    setCurrentTime(state.position);
                    setDuration(state.duration);
                }
            });

            newPlayer.connect().then((success) => {
                if (success) {
                    console.log("🎵 Spotify Player đã kết nối thành công!");
                } else {
                    console.error("❌ Không thể kết nối với Spotify.");
                }
            });

            setPlayer(newPlayer);
        };

        loadSpotifySDK();
    }, [accessToken]);

    useEffect(() => {
        if (!deviceId || !id) return;
        console.log("🎶 Chuẩn bị phát bài hát...");

        const checkActiveDevices = async () => {
            try {
                const res = await axios.get("https://api.spotify.com/v1/me/player/devices", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                console.log("🎧 Danh sách thiết bị khả dụng:", res.data);
            } catch (error) {
                console.error("❌ Không thể lấy danh sách thiết bị:", error.response?.data || error);
            }
        };
        checkActiveDevices();
    }, [deviceId, id, accessToken]);

    //START PLAY SONG
    useEffect(() => {
        if (!deviceId) return;
        console.log("🎯 Device ID cập nhật:", deviceId);

        const setActiveDevice = async () => {
            try {
                //STOP PLAY PREVIOUS SONG
                await axios.put(
                    "https://api.spotify.com/v1/me/player/pause",
                    {},
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                ); 

                await axios.put(
                    "https://api.spotify.com/v1/me/player",
                    { device_ids: [deviceId], play: false },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                console.log("✅ Đã đặt My Spotify Player làm thiết bị chính!");
                
                //PLAY SELECTED SONG
                await axios.put(
                    "https://api.spotify.com/v1/me/player/play",
                    { uris: [`spotify:track:${id}`] },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                console.log("▶️ Đã phát bài hát!");
            } catch (err) {
                console.error("❌ Lỗi khi phát bài hát:", err.response?.data || err);
            }
        };

        setActiveDevice();
    }, [deviceId]); // Chỉ chạy khi deviceId thay đổi

    const togglePlayPause = async () => {
        if (isPlaying) {
            await player.pause();
        } else {
            await player.resume();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = async (event) => {
        const seekPosition = event.target.value;
        await player.seek(seekPosition);
    };

    useEffect(() => {
        if (!player) return;
    
        let interval;
        if (isPlaying) {
            interval = setInterval(async () => {
                const state = await player.getCurrentState();
                if (state) {
                    setCurrentTime(state.position);
                    setDuration(state.duration);
                }
            }, 1000); // Cập nhật mỗi giây
        } else {
            clearInterval(interval);
        }
    
        return () => clearInterval(interval);
    }, [isPlaying, player]);    

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const [songInfo, setSongInfo] = useState({
        title: "",
        artistName: "",
        albumImageUrl: "",
    });
    
    useEffect(() => {
        if (!id || !accessToken) return;
    
        const fetchSongInfo = async () => {
            try {
                const res = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
    
                const track = res.data;
                setSongInfo({
                    title: track.name,
                    artistName: track.artists.map((artist) => artist.name).join(", "),
                    albumImageUrl: track.album.images[0]?.url || "",
                });
    
                console.log("🎶 Lấy thông tin bài hát thành công:", track);
            } catch (err) {
                console.error("❌ Lỗi khi lấy thông tin bài hát:", err.response?.data || err);
            }
        };
    
        fetchSongInfo();
    }, [id, accessToken]);
    
    return (
        <div className="player-container">
            <h1>Now Playing: {id}</h1>
            <p>Spotify Web Player is initialized.</p>
            <div className="song-info">
                <img src={songInfo.albumImageUrl} alt={songInfo.title} className="album-cover" />
                <h2>{songInfo.title}</h2>
                <p>{songInfo.artistName}</p>
            </div>

            <button onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
            />
            <div>
                <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
};

export default PlayerPage;
