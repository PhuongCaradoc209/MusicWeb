package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListeningHistoryDTO {
    private String spotifyId;     // ✅ để dùng làm id
    private String title;         // ✅ titleSong
    private String artist;        // ✅ tên nghệ sĩ
    private String imageUrl;      // ✅ srcImage
    private long duration;        // ✅ duration (ms hoặc sec)
    private Timestamp playedAt;
}