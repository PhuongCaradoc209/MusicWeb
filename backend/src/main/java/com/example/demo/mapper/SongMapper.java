package com.example.demo.mapper;

import com.example.demo.dto.SongDTO;
import com.example.demo.model.Song;
import org.springframework.stereotype.Component;

@Component
public class SongMapper {
    public static SongDTO toSongDTO(Song song) {
        return (song == null) ? null : SongDTO.builder()
                .spotifyId(song.getSpotifyId())
                .title(song.getTitle())
                .artistName(song.getArtist().getName())
                .albumName(song.getAlbum().getName())
                .albumImageUrl(song.getAlbum().getImageUrl())
                .duration(song.getDuration())
                .releaseDate(song.getReleaseDate())
                .previewUrl(song.getPreviewUrl())
                .build();
    }
}