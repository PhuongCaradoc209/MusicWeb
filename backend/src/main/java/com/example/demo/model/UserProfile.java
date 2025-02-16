package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "UserProfile")
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    @Id
    @Column(name = "user_id")
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String userName;
    private LocalDateTime birthDate;
    private String avatarUrl;
    private String country;
}