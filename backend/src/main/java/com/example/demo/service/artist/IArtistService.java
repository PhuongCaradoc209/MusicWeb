package com.example.demo.service.artist;

import com.example.demo.model.Artist;

public interface IArtistService {
    public Artist findOrCreate(String spotifyArtistId, String name);
}
