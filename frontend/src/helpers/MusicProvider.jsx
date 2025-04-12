// MusicProvider.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [track, setTrack] = useState(null);
    const [trackList, setTrackList] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [accessToken, setAccessToken] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [playlistId, setPlaylistId] = useState(null);
    const [songId, setSongId] = useState(null);

    const [currentRoutePath, setCurrentRoutePath] = useState(null);

    const loadTrackOrPlaylist = (country, playlistIdParam, songIdParam) => {
        setPlaylistId(playlistIdParam || null);
        setSongId(songIdParam);

        if (!playlistIdParam) {
            setTrackList([]);
        }

        const path = playlistIdParam
            ? `/player/top/50/${country}/playlist/${playlistIdParam}/track/${songIdParam}`
            : `/player/${songIdParam}`;
        setCurrentRoutePath(path);
    };

    // Get token
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

    // Initialize SDK
    useEffect(() => {
        if (!accessToken || player) return;

        const initPlayer = () => {
            const newPlayer = new window.Spotify.Player({
                name: "Spotify Player",
                getOAuthToken: cb => cb(accessToken),
                volume: 0.5,
            });

            newPlayer.addListener("ready", ({ device_id }) => {
                setDeviceId(device_id);
                console.log("✅ Player sẵn sàng với deviceId:", device_id);
            });

            newPlayer.addListener("player_state_changed", (state) => {
                if (!state) return;
                setIsPlaying(!state.paused);
                setCurrentTime(state.position);
            });

            newPlayer.connect();
            setPlayer(newPlayer);
        };

        const loadSpotifySDK = () => {
            if (!window.Spotify) {
                const script = document.createElement("script");
                script.src = "https://sdk.scdn.co/spotify-player.js";
                script.async = true;
                document.body.appendChild(script);
                script.onload = () => {
                    const waitForSpotify = setInterval(() => {
                        if (window.Spotify && window.Spotify.Player) {
                            clearInterval(waitForSpotify);
                            initPlayer();
                        }
                    }, 100);
                };
            } else {
                initPlayer();
            }
        };

        loadSpotifySDK();
    }, [accessToken]);

    // Load dữ liệu track hoặc playlist
    useEffect(() => {
        if (!accessToken || !songId) return;

        const fetchData = async () => {
            try {
                if (playlistId) {
                    const res = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    const tracks = res.data.items.map(item => item.track);
                    setTrackList(tracks);
                    const index = tracks.findIndex(track => track.id === songId);
                    setCurrentTrackIndex(index !== -1 ? index : 0);
                } else {
                    const res = await axios.get(`https://api.spotify.com/v1/tracks/${songId}`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    setTrack(res.data);
                    setTrackList([]);
                }
            } catch (err) {
                console.error("❌ Lỗi khi fetch dữ liệu:", err);
            }
        };

        fetchData();
    }, [accessToken, songId, playlistId]);

    // Phát playlist
    useEffect(() => {
        if (!deviceId || !trackList.length) return;

        const playTrack = async () => {
            const target = trackList[currentTrackIndex];
            if (!target) return;

            try {
                await axios.put("https://api.spotify.com/v1/me/player", {
                    device_ids: [deviceId], play: false
                }, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });

                await axios.put(
                    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                    { uris: [`spotify:track:${target.id}`] },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );

                setTrack(target);
            } catch (err) {
                console.error("❌ Lỗi khi phát bài hát:", err);
            }
        };

        playTrack();
    }, [deviceId, currentTrackIndex, trackList]);

    // Phát bài đơn
    useEffect(() => {
        if (!trackList.length && track && deviceId && accessToken && player) {
            const playSingle = async () => {
                try {
                    const uri = `spotify:track:${track.id}`;
                    await axios.put("https://api.spotify.com/v1/me/player", {
                        device_ids: [deviceId], play: true
                    }, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    });

                    await axios.put(
                        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                        { uris: [uri] },
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                    );
                } catch (err) {
                    console.error("❌ Lỗi khi phát bài đơn:", err);
                }
            };

            playSingle();
        }
    }, [track, trackList, deviceId, accessToken]);

    return (
        <MusicContext.Provider value={{
            track, trackList, currentTrackIndex, isPlaying,
            playlistId, songId, setTrack, setTrackList,
            player, currentTime, deviceId, accessToken,
            setCurrentTrackIndex, setIsPlaying, setCurrentTime,
            loadTrackOrPlaylist, currentRoutePath
        }}>
            {children}
        </MusicContext.Provider>
    );
};

export default MusicContext;