package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListeningHistoryDTO {
    private Long id;
    private String spotifyId;
    private String songTitle;
    private Timestamp playedAt;
    private int listenDuration;
}
