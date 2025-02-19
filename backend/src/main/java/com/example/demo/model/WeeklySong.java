package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "weeklysongs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeeklySong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rank;

    private String uri;
    private String artist_names;
    private String track_name;
    private String source;
    private String peak_rank;
    private String previous_rank;
    private String weeks_on_chart;
    private String streams;
}
