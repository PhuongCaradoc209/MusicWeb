import { useState, useEffect } from "react";
import { formatDuration } from "../utils/formatDuration";
import { fetchNewReleaseSongs } from "../service/fetchNewReleaseSongs ";

const useFetchNewReleases = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSongs = async () => {
            try {
                const data = await fetchNewReleaseSongs();

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

        getSongs();
    }, []);

    return { songs, loading, error };
};

export default useFetchNewReleases;