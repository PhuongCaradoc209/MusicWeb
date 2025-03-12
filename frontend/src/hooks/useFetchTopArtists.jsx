import { useEffect, useState } from "react";

export default useFetchTopArtist = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/spotify/top-artists")
            .then((response) => {
                setArtists(response.data.artists || []);
            })
            .catch((error) => {
                console.error("Error fetching artists:", error);
                setError("Failed to load artists. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
}