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
@Table(name = "artist")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ID của nghệ sĩ trên Spotify, đảm bảo tính duy nhất
    @Column(nullable = false, unique = true)
    private String spotifyArtistId;

    @Column(nullable = false)
    private String name;

    public Artist(String spotifyArtistId, String name) {
        this.spotifyArtistId = spotifyArtistId;
        this.name = name;
    }
}
