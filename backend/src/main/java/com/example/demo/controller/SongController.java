package com.example.demo.controller;

import com.example.demo.dto.SongDTO;
import com.example.demo.service.song.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/songs")
public class SongController {
    @Autowired
    private SongService songService;

//    @PostMapping
//    public ResponseEntity<SongDTO> createSong(@RequestBody SongDTO songDTO) {
//        return ResponseEntity.ok(songService.createSong(songDTO));
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<SongDTO> getSongById(@PathVariable Long id) {
//        return ResponseEntity.ok(songService.getSongById(id));
//    }
//
//    @GetMapping
//    public ResponseEntity<List<SongDTO>> getAllSongs() {
//        return ResponseEntity.ok(songService.getAllSongs());
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<SongDTO> updateSong(@PathVariable Long id, @RequestBody SongDTO songDTO) {
//        return ResponseEntity.ok(songService.updateSong(id, songDTO));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
//        songService.deleteSong(id);
//        return ResponseEntity.noContent().build();
//    }
    @PostMapping("/global-top50")
    public ResponseEntity<List<SongDTO>> saveTop50() {
        List<SongDTO> songDTOs = songService.saveTop50Tracks("global");
        return ResponseEntity.ok(songDTOs);
    }
    @PostMapping("/vietnam-top50")
    public ResponseEntity<List<SongDTO>> saveVNTop50() {
        List<SongDTO> songDTOs = songService.saveTop50Tracks("vietnam");
        return ResponseEntity.ok(songDTOs);
    }
    @PostMapping("/china-top50")
    public ResponseEntity<List<SongDTO>> saveKRTop50() {
        List<SongDTO> songDTOs = songService.saveTop50Tracks("china");
        return ResponseEntity.ok(songDTOs);
    }
    @GetMapping("/new-release-tracks")
    public ResponseEntity<List<SongDTO>> getNewReleaseTracks() {
        List<SongDTO> songDTOs = songService.saveNewReleaseTracks();
        return ResponseEntity.ok(songDTOs);
    }
    @GetMapping("/{spotifyId}")
    public ResponseEntity<Optional<SongDTO>> getSongBySpotifyId(@PathVariable String spotifyId) {
        return ResponseEntity.ok(songService.getSongBySpotifyId(spotifyId));
    }
}
