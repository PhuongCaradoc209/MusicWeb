package com.example.demo.service.song;

import com.example.demo.dto.SongDTO;
import com.example.demo.mapper.SongMapper;
import com.example.demo.model.Song;
import com.example.demo.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SongService implements ISongService {
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private SongMapper songMapper;

    @Override
    public SongDTO createSong(SongDTO songDTO) {
        Song song = SongMapper.toSong(songDTO);
        Song savedSong = songRepository.save(song);
        return SongMapper.toSongDTO(savedSong);
    }

    @Override
    public SongDTO getSongById(Long id) {
        return songRepository.findById(id)
                .map(SongMapper::toSongDTO)
                .orElseThrow(() -> new RuntimeException("Song not found with id: " + id));
    }

    @Override
    public List<SongDTO> getAllSongs() {
        return songRepository.findAll().stream()
                .map(SongMapper::toSongDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SongDTO updateSong(Long id, SongDTO songDTO) {
        Song existingSong = songRepository.findById(id).orElseThrow(()->new RuntimeException("Song not found with id: " + id));
        existingSong.setTitle(songDTO.getTitle());
        existingSong.setArtistId(songDTO.getArtistId());
        existingSong.setDuration(songDTO.getDuration());
        existingSong.setAlbumId(songDTO.getAlbumId());
        existingSong.setGenre(songDTO.getGenre());

        Song updatedSong = songRepository.save(existingSong);
        return SongMapper.toSongDTO(updatedSong);
    }

    @Override
    public void deleteSong(Long id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found with id: " + id));
        songRepository.delete(song);
    }
}
