package com.example.demo.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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

    public Album(String spotifyAlbumId, String name, String imageUrl) {
        this.spotifyAlbumId = spotifyAlbumId;
        this.name = name;
        this.imageUrl = imageUrl;
    }
}
