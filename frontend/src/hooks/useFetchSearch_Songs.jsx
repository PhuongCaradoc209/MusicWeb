import { useState, useEffect } from 'react';
import { fetchSearch_Song } from '../service/fecthSearch_Songs';

export const useFetchSearch_Song = (query) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const songs = await fetchSearch_Song(query);
            setResults(songs);
            setLoading(false);
        };

        if (query) fetchData();
    }, [query]);

    return { results, loading };
};