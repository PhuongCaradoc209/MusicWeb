package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SongDTO {
    private String spotifyId;
    private String title;
    private String artistName;
    private String albumName;
    private String albumImageUrl;
    private long duration;
    private LocalDateTime releaseDate;
    private String previewUrl;
}