package com.example.demo.service.user;

import com.example.demo.dto.UserDTO;
import com.example.demo.enums.UserRole;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO registerUser(User user) {
        //CHECK EMAIL
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }
        //CHECK PASSWORD
        if (!PasswordUtil.isStrongPassword(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Weak password. Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
        }
        user.setPassword(PasswordUtil.hashPassword(user.getPassword()));
        user.setRole(UserRole.USER);
        User savedUser = userRepository.save(user);
        return UserMapper.toDTO(savedUser);
    }

    @Override
    public Optional<UserDTO> loginUser(User user) {
        Optional<User> existedUser = userRepository.findByEmail(user.getEmail());
        if (existedUser.isEmpty()||!PasswordUtil.matchPassword(user.getPassword(), existedUser.get().getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email or password");
        }

        return Optional.of(UserMapper.toDTO(existedUser.get()));
    }

    @Override
    public Optional<UserDTO> getUserById(long id) {
        return userRepository.findById(id).map(UserMapper::toDTO);
    }

    @Override
    public Optional<UserDTO> getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(UserMapper::toDTO);
    }

    @Override
    public UserDTO updateUser(long id, User user) {
        Optional<User> existedUser = userRepository.findById(id);
        if (existedUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User updatedUser = existedUser.get();
        updatedUser.setEmail(user.getEmail());
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            updatedUser.setPassword(PasswordUtil.hashPassword(user.getPassword()));
        }
        userRepository.save(updatedUser);
        return UserMapper.toDTO(updatedUser);
    }

    @Override
    public void deleteUser(long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }
}