import axios from "axios";
import { useEffect, useState } from "react";
import { fetchTopArtists } from "../service/fetchTopArtists";

const useFetchTopArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getArtists = async () => {
            try {
                const data = await fetchTopArtists();
                setArtists(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getArtists();
    }, []);

    return [artists, loading, error];
};

export default useFetchTopArtists;