import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useSpotifyCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        console.log(code);

        if (code) {
            axios.get(`http://localhost:8080/api/spotify/callback?code=${code}`)
                .then((res) => {
                    localStorage.setItem("spotifyAccessToken", res.data.accessToken);
                    console.log("data:" + res.data);
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Spotify callback error:", error);
                });
        }
    }, [navigate]);
};