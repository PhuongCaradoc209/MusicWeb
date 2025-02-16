package com.example.demo.service.userProfile;

import com.example.demo.dto.UserProfileDTO;

public interface IUserProfileService {
    public UserProfileDTO getUserProfile(Long userId);
    public UserProfileDTO updateUserProfile(Long userID, UserProfileDTO userProfileDTO);
}