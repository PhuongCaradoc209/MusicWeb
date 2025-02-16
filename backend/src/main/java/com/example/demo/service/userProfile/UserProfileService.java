package com.example.demo.service.userProfile;

import com.example.demo.dto.UserProfileDTO;
import com.example.demo.mapper.UserProfileMapper;
import com.example.demo.model.User;
import com.example.demo.model.UserProfile;
import com.example.demo.repository.UserProfileRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService implements IUserProfileService {
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserProfileDTO getUserProfile(Long userId) {
        Optional<UserProfile> userProfileOpt = userProfileRepository.findByUserId(userId);
        return userProfileOpt.map(UserProfileMapper::toUserProfileDTO).orElse(null);
    }

    @Override
    public UserProfileDTO updateUserProfile(Long userID, UserProfileDTO userProfileDTO) {
        Optional<User> userOpt = userRepository.findById(userID);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        UserProfile userProfile = userProfileRepository.findByUserId(userID)
                .orElse(new UserProfile());

        userProfile.setUser(userOpt.get());
        userProfile.setUserName(userProfileDTO.getUserName());
        userProfile.setBirthDate(userProfileDTO.getUserBirthday());
        userProfile.setAvatarUrl(userProfileDTO.getAvatarUrl());
        userProfile.setCountry(userProfileDTO.getCountry());

        UserProfile savedProfile = userProfileRepository.save(userProfile);
        return UserProfileMapper.toUserProfileDTO(savedProfile);
    }
}