import axios from "axios";
import { useState, useEffect } from "react";

export default function useFetchNewReleaseAlbums() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/albums/new-releases", {
                    withCredentials: true // 🚀 Gửi cookie đến backend nếu cần
                });

                const formattedAlbums = response.data.map(album => ({
                    image: album.imageUrl,
                    name: album.name,
                    artist: album.artist || "Unknown" 
                }));

                setAlbums(formattedAlbums);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    return [albums, loading, error];
}