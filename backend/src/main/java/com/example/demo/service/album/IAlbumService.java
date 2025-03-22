package com.example.demo.service.album;

import com.example.demo.model.Album;

public interface IAlbumService {
    public Album findOrCreate(String spotifyAlbumId, String name, String imageUrl, String artist);
}
