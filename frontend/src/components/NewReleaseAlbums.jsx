import React from "react";
import useFetchNewReleaseAlbums from "../hooks/useFetchNewReleaseAlbum";
import Card from "./Card";
import ScrollableList from "./ScrollableList";

export default function NewReleaseAlbums() {
    const [albums, loading, error] = useFetchNewReleaseAlbums();
    console.log("Fetched albums:", albums);

    return (
        <div className='h-fit rounded-2xl px-4 py-6 bg-color_body space-y-6 text-lg'>
            <div className='flex justify-between items-center'>
                <p className='font-medium text-white'>New Release Albums</p>
                <p className='text-gray-400 hover:text-white cursor-pointer text-sm transition duration-200'>
                    See all
                </p>
            </div>
            {loading ? (
                <p className="text-gray-400 text-sm">Loading albums...</p>
            ) : error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : albums.length > 0 ? (
                <ScrollableList items={albums} CardComponent={Card} />
            ) : (
                <p className="text-gray-400 text-sm">No albums found.</p>
            )}
        </div>
    );
}