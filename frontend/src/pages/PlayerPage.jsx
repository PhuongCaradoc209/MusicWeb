import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";

const PlayerPage = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
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

            setPlayer(newPlayer);

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

            newPlayer.connect().then((success) => {
                if (success) {
                    console.log("🎵 Spotify Player đã kết nối thành công!");
                } else {
                    console.error("❌ Không thể kết nối với Spotify.");
                }
            });
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

    useEffect(() => {
        if (!deviceId) return;
        console.log("🎯 Device ID cập nhật:", deviceId);

        const setActiveDevice = async () => {
            try {
                await axios.put(
                    "https://api.spotify.com/v1/me/player",
                    { device_ids: [deviceId], play: false },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                console.log("✅ Đã đặt My Spotify Player làm thiết bị chính!");

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

    return (
        <div className="player-container">
            <h1>Now Playing: {id}</h1>
            <p>Spotify Web Player is initialized.</p>

            <FaPlay/>
            <IoIosPause />

        </div>
    );
};

export default PlayerPage;
