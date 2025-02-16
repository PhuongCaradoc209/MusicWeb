package com.example.demo.mapper;

import com.example.demo.dto.SongDTO;
import com.example.demo.model.Song;
import org.springframework.stereotype.Component;

@Component
public class SongMapper {
    public static SongDTO toSongDTO(Song song) {
        return (song == null) ? null : SongDTO.builder()
                .id(song.getId())
                .title(song.getTitle())
                .artistId(song.getArtistId())
                .albumId(song.getAlbumId())
                .duration(song.getDuration())
                .releaseDate(song.getReleaseDate())
                .genre(song.getGenre())
                .build();
    }
    public static Song toSong(SongDTO songDTO) {
        return (songDTO == null) ? null : new Song(
                songDTO.getId(),
                songDTO.getTitle(),
                songDTO.getArtistId(),
                songDTO.getAlbumId(),
                songDTO.getDuration(),
                songDTO.getReleaseDate(),
                songDTO.getGenre()
        );
    }
}