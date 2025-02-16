package com.example.demo.dto;

import com.example.demo.enums.UserRole;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    private Long userId;
    private String userName;
    private LocalDateTime userBirthday;
    private String avatarUrl;
    private String country;
}