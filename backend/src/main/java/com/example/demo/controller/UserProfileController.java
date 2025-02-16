package com.example.demo.controller;

import com.example.demo.dto.UserProfileDTO;
import com.example.demo.service.userProfile.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/{userId}/user-profile")
public class UserProfileController {
    @Autowired
    private UserProfileService userProfileService;

    @GetMapping
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Long userId) {
        UserProfileDTO userProfile = userProfileService.getUserProfile(userId);
        return userProfile != null ? ResponseEntity.ok(userProfile) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<UserProfileDTO> updateUserProfile(
            @PathVariable Long userId,
            @RequestBody UserProfileDTO userProfileDTO) {
        userProfileDTO.setUserId(userId);
        UserProfileDTO savedProfile = userProfileService.updateUserProfile(userId,userProfileDTO);
        return ResponseEntity.ok(savedProfile);
    }
}