import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollableList from "./ScrollableList";
import SongCard from "./SongCard";
import useFetchNewReleases from "../hooks/useFetchNewReleases";

const NewReleaseSongs = () => {
    const { songs, loading, error } = useFetchNewReleases();
    const navigate = useNavigate(); 

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
