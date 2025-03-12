import { useState, useEffect } from "react";
import { formatDuration } from "../utils/formatDuration";

const useFetchNewReleases = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/songs/new-release-tracks");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format from API");
                }

                setSongs(
                    data.map((song) => ({
                        id: song.spotifyId,
                        srcImage: song.albumImageUrl || "default.jpg",
                        title: song.title || "Unknown Title",
                        artist: song.artistName || "Unknown Artist",
                        duration: formatDuration(song.duration),
                        audioPreview: song.previewUrl || null,
                    }))
                );
            } catch (error) {
                console.error("Error fetching new release songs:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    return { songs, loading, error };
};

export default useFetchNewReleases;