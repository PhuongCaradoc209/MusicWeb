package com.example.demo.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "album")

public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ID album từ Spotify, đảm bảo tính duy nhất
    @Column(nullable = false, unique = true)
    private String spotifyAlbumId;

    @Column(nullable = false)
    private String name;

    private String imageUrl;

    private String artist;

    public Album(String spotifyAlbumId, String name, String imageUrl, String artist) {
        this.spotifyAlbumId = spotifyAlbumId;
        this.name = name;
        this.imageUrl = imageUrl;
        this.artist = artist;
    }
}
