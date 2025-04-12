import { createContext, useState, useEffect } from "react";
import axios from "axios";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [track, setTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [accessToken, setAccessToken] = useState(null);
    const [deviceId, setDeviceId] = useState(null);

    //GET ACCESS TOKEN
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

    //INITIALIZE SPOTIFY PLAYER WHEN ACCESS TOKEN IS AVAILABLE
    useEffect(() => {
        if (!accessToken || player) return;

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

        loadSpotifySDK();
    }, [accessToken]);

    return (
        <MusicContext.Provider value={{
            track, setTrack,
            isPlaying, setIsPlaying,
            player, setPlayer,
            currentTime, setCurrentTime,
            deviceId, accessToken
        }}>
            {children}
        </MusicContext.Provider>
    );
};

export default MusicContext;
