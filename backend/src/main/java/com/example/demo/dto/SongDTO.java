package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SongDTO {
    private Long id;
    private String title;
    private Long artistId;
    private long albumId;
    private long duration;
    private LocalDateTime releaseDate;
    private String genre;
}