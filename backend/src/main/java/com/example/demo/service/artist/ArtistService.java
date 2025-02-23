package com.example.demo.service.artist;

import com.example.demo.model.Artist;
import com.example.demo.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtistService implements IArtistService {
    private final ArtistRepository artistRepository;

    @Autowired
    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public Artist findOrCreate(String spotifyArtistId, String name) {
        return artistRepository.findBySpotifyArtistId(spotifyArtistId)
                .orElseGet(() -> artistRepository.save(new Artist(spotifyArtistId, name)));
    }
}