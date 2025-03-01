import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollableList from "./ScrollableList";
import SongCard from "./SongCard";

const NewReleaseSongs = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

  // Hàm định dạng thời lượng từ ms sang định dạng "m:ss"
    const formatDuration = (ms) => {
        ms = Number(ms);
        if (!ms || isNaN(ms)) return "0:00";
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        fetch("http://localhost:8080/api/songs/new-release-tracks")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Nếu API trả về List<SongDTO> thì data đã là mảng các song
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
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching new release songs:", error);
            setError(error.message);
            setLoading(false);
        });
    }, []);

    const handleSongClick = (songId) => {
        console.log("Clicked song id:", songId);
        navigate(`/player/${songId}`)
    };

    return (
    <div className="h-fit rounded-2xl px-4 py-6 space-y-4 text-lg">
        <div className="flex justify-between items-center">
            <p className="font-medium text-white">New Release Songs</p>
            <p className="text-gray-100 hover:underline cursor-pointer text-sm transition duration-200">
                See all
            </p>
        </div>
        {loading ? (
        <p className="text-gray-400 text-sm">Loading new release songs...</p>
        ) : error ? (
        <p className="text-red-400 text-sm">Error: {error}</p>
        ) : (
        <ScrollableList 
            items={songs} 
            CardComponent={(props) => (
                <SongCard {...props} onClick={handleSongClick} />
            )} />
        )}
    </div>
    );
};

export default NewReleaseSongs;
