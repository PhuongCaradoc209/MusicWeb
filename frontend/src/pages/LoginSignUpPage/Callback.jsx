import { useSpotifyCallback } from "../../hooks/useSpotifyCallback";

function Callback() {
    useSpotifyCallback();
    return <p>Processing Spotify login...</p>;
}

export default Callback;
