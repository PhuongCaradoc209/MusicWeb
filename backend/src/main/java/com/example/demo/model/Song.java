package com.example.demo.model;

import com.example.demo.cache.Top50SongsCacheListener;
import com.example.demo.cache.WeeklySongsCacheListener;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "song")
@EntityListeners(Top50SongsCacheListener.class)
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ID bài hát trên Spotify, đảm bảo tính duy nhất
    @Column(nullable = false, unique = true)
    private String spotifyId;

    @Column(nullable = false)
    private String title;

    // Quan hệ với Artist: giả sử mỗi bài hát có 1 nghệ sĩ chính
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id", nullable = false)
    private Artist artist;

    // Quan hệ với Album
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id", nullable = false)
    private Album album;

    // Độ dài bài hát (milliseconds)
    @Column(nullable = false)
    private long duration;

    private LocalDateTime releaseDate;

    // URL preview audio
    private String previewUrl;

    public Song(String spotifyId, String title, Artist artist, Album album,
                long duration, LocalDateTime releaseDate, String previewUrl, String genre) {
        this.spotifyId = spotifyId;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.duration = duration;
        this.releaseDate = releaseDate;
        this.previewUrl = previewUrl;
    }
}