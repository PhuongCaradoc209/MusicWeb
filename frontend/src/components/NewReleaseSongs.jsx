import React, { useState, useEffect } from "react";
import ScrollableList from "./ScrollableList";
import SongCard from "./SongCard";

const NewReleaseSongs = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  // Hàm định dạng thời lượng từ ms sang định dạng "m:ss"
    const formatDuration = (ms) => {
        ms = Number(ms);
        if (!ms || isNaN(ms)) return "0:00";
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
    fetch("http://localhost:8080/api/spotify/new-release-tracks")
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
        console.log("Fetched new release songs:", data);
        // Giả sử API trả về dạng { tracks: [ {name, id, artist, duration, image, ...}, ... ] }
        const tracks = data.tracks;
        if (!Array.isArray(tracks)) {
            throw new Error("Invalid data format from API");
        }
        setSongs(
            tracks.map((song) => ({
            srcImage: song.image || "default.jpg",
            title: song.name || "Unknown Title",
            artist: song.artist || "Unknown Artist",
            duration: formatDuration(song.duration),
            audioPreview: song.audioPreview || null,
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
        <ScrollableList items={songs} CardComponent={SongCard} />
        )}
    </div>
    );
};

export default NewReleaseSongs;
