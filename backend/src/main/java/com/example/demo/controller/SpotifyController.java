package com.example.demo.controller;

import com.example.demo.model.Song;
import com.example.demo.service.song.WeeklySongsService;
import com.example.demo.service.spotify.SpotifyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/spotify")
public class SpotifyController {

    private final SpotifyService spotifyService;
    private final WeeklySongsService weeklySongsService;

    public SpotifyController(SpotifyService spotifyService, WeeklySongsService weeklySongsService) {
        this.spotifyService = spotifyService;
        this.weeklySongsService = weeklySongsService;
    }

    @GetMapping("/top-artists")
    public ResponseEntity<?> getTopArtists() {
        try {
            List<Map<String, String>> artists = spotifyService.getTopArtists();
            return ResponseEntity.ok(Map.of("artists", artists));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/top-tracks")
    public List<Map<String, String>> getTopTracks() {
        return weeklySongsService.getTop10SongsWithDetails();
    }
}