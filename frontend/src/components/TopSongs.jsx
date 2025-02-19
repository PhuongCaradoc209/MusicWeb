import React, { useState, useEffect } from "react";
import ScrollableList from "./ScrollableList";
import SongCard from "./SongCard";

const TopSongs = () => {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/spotify/top-tracks")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched songs:", data);
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format from API");
                }
                setSongs(data.map(song => ({
                    srcImage: song.image || "default.jpg",  // Ảnh bài hát
                    title: song.title || "Unknown Title",
                    artist: song.artist || "Unknown Artist",
                    duration: formatDuration(song.duration), // Định dạng thời gian
                    audioPreview: song.audioPreview || null, // Đường dẫn audio
                })));
            })
            .catch(error => {
                console.error("Error fetching songs:", error);
                setError(error.message);
            });
    }, []);

    // Hàm định dạng thời gian từ mili-giây sang phút:giây
    const formatDuration = (ms) => {
        ms = Number(ms); // Chắc chắn rằng ms là số
        if (!ms || isNaN(ms)) return "0:00"; // Kiểm tra nếu không hợp lệ
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };    

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <ScrollableList items={songs} CardComponent={SongCard} />
            )}
        </div>
    );
};

export default TopSongs;