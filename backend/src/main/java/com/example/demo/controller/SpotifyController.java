package com.example.demo.controller;

import com.example.demo.dto.SongDTO;
import com.example.demo.model.Song;
import com.example.demo.service.song.WeeklySongsService;
import com.example.demo.service.spotify.SpotifyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

    @GetMapping("/token")
    public ResponseEntity<Map<String, String>> getAccessToken() {
        try {
            String accessToken = spotifyService.getAccessToken();
            Map<String, String> response = new HashMap<>();
            response.put("accessToken", accessToken);
            return ResponseEntity.ok(response); // Trả về JSON
        } catch (Exception e) {
            e.printStackTrace();  // Log lỗi để debug
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Failed to get access token"));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<String> searchSpotify(@RequestParam String query) {
        try {
            String result = spotifyService.searchSpotify(query);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }
}