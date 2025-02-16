package com.example.demo.mapper;

import com.example.demo.dto.UserProfileDTO;
import com.example.demo.model.UserProfile;

public class UserProfileMapper {
    public static UserProfileDTO toUserProfileDTO(UserProfile userProfile) {
        if (userProfile == null) {
            return null;
        }
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setUserId(userProfile.getUserId());
        userProfileDTO.setUserName(userProfile.getUserName());
        userProfileDTO.setUserBirthday(userProfile.getBirthDate());
        userProfileDTO.setAvatarUrl(userProfile.getAvatarUrl());
        userProfileDTO.setCountry(userProfile.getCountry());
        return userProfileDTO;
    }
    public static UserProfile toEntity(UserProfileDTO userProfileDTO) {
        if (userProfileDTO == null) {
            return null;
        }
        UserProfile userProfile = new UserProfile();
        userProfile.setUserId(userProfileDTO.getUserId());
        userProfile.setUserName(userProfileDTO.getUserName());
        userProfile.setBirthDate(userProfileDTO.getUserBirthday());
        userProfile.setAvatarUrl(userProfileDTO.getAvatarUrl());
        userProfile.setCountry(userProfileDTO.getCountry());
        return userProfile;
    }
}