import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SongList from '../components/SongList';
import { formatDuration } from '../utils/formatDuration';

function SearchPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!query) return;

        setLoading(true);

        fetch(`http://localhost:8080/api/spotify/search?query=${encodeURIComponent(query)}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.tracks && data.tracks.items) {
                    setResults(data.tracks.items);
                } else {
                    setResults([]);
                }
            })
            .catch((error) => console.error("Error fetching search results:", error))
            .finally(() => setLoading(false));

    }, [query]);

    const handleSongClick = (songId) => {
        navigate(`/player/${songId}`)
    }

    return (
        <div className="p-6 mt-20 text-white overflow-auto custom-scrollbar">
            <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>

            {loading && <p>Loading...</p>}

            <ul className="list-disc pl-6">
                {results.length > 0 ? (
                    results.map((track) => (
                        <SongList 
                            key={track.id} 
                            id={track.id}
                            onClick={handleSongClick}
                            srcImage={track.album.images[0]?.url}
                            titleSong={track.name}
                            artist={track.artists.map(artist => artist.name).join(', ')}
                            duration={formatDuration(track.duration_ms)}
                        />
                    ))
                ) : (
                    !loading && <p>No results found.</p>
                )}
            </ul>
        </div>
    );
}

export default SearchPage;