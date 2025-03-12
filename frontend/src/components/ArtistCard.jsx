import React, { useEffect, useState } from "react";
import axios from "axios";
import ScrollableList from "./ScrollableList";
import useFetchTopArtists from "../hooks/useFetchTopArtists";

function ArtistCard({ image, name }) {
    return (
        <div className="flex flex-col items-center w-32 md:w-36 lg:w-40 cursor-pointer group">
            <div className="w-full aspect-square rounded-full overflow-hidden border-2 border-transparent
                            transition-all duration-300">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image})` }} />
            </div>
            <p className="mt-4 text-sm text-white text-center font-medium">{name}</p>
        </div>
    );
}

export default function TopArtists() {
    const [artists, loading, error] = useFetchTopArtists();

    return (
        <div className='h-fit rounded-2xl px-4 py-6 bg-color_body space-y-4 text-lg'>
            <div className="flex justify-between items-center">
                <p className="font-medium text-white">Popular Artist</p>
                <p className="text-gray-400 hover:text-white cursor-pointer text-sm transition duration-200">
                    See all
                </p>
            </div>
            {loading ? (
                <p className="text-gray-400 text-sm">Loading artists...</p>
            ) : error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : artists.length > 0 ? (
                <ScrollableList items={artists.map(artist => ({ image: artist.image, name: artist.name }))} CardComponent={ArtistCard} />
            ) : (
                <p className="text-gray-400 text-sm">No artists found.</p>
            )}
        </div>
    );
}
