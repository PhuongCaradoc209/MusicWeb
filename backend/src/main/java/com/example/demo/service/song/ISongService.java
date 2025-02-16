package com.example.demo.service.song;

import com.example.demo.dto.SongDTO;

import java.util.List;

public interface ISongService {
    SongDTO createSong(SongDTO songDTO);
    SongDTO getSongById(Long id);
    List<SongDTO> getAllSongs();
    SongDTO updateSong(Long id, SongDTO songDTO);
    void deleteSong(Long id);
}