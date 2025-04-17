import React from 'react'
import { useEffect, useState } from "react";
import ListeningHistoryService from '../service/listeningHistoryService';

function useFetchListeningHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
        try {
            const data = await ListeningHistoryService.getUserHistory();
            const mapped = data.map((item) => ({
                id: item.spotifyId,
                titleSong: item.title,
                artist: item.artist,
                srcImage: item.imageUrl,
                duration: item.duration,
                playedAt: item.playedAt,
            }));
            setHistory(mapped);
        } catch (err) {
            setError(err);
            console.error("❌ Error fetching listening history:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchHistory();
    }, []);

    return { history, loading, error };
}

export default useFetchListeningHistory;
