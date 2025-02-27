package com.example.demo.controller;

import com.example.demo.dto.SongDTO;
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

    @GetMapping("/login")
    public ResponseEntity<String> login() {
        String url = spotifyService.getSpotifyAuthUrl();
        return ResponseEntity.ok(url);
    }

    @GetMapping("/callback")
    public ResponseEntity<?> callback(@RequestParam String code) {
        String accessToken = spotifyService.getAccessToken(code);
        return ResponseEntity.ok(Map.of("accessToken", accessToken));
    }

//    @GetMapping("/new-release-tracks")
//    public ResponseEntity<?> getNewReleaseTracks() {
//        try {
//            List<Map<String, String>> newReleaseTracks = ;
//            return ResponseEntity.ok(Map.of("tracks", newReleaseTracks));
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
//        }
//    }

//    @GetMapping("/top50-vn")
//    public ResponseEntity<?> getTop50_VN() {
//        try {
//            List<Map<String, String>> tracks = spotifyService.getTop50_VN();
//            return ResponseEntity.ok(Map.of("tracks", tracks));
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
//        }
//    }
}