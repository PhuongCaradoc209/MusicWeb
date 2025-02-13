package com.example.demo.service.user;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;
import java.util.List;
import java.util.Optional;

public interface IUserService {
    UserDTO registerUser(User user);
    Optional<UserDTO> loginUser(User user);
    Optional<UserDTO> getUserById(long id);
    Optional<UserDTO> getUserByEmail(String email);
    UserDTO updateUser(long id, User user);
    void deleteUser(long id);
    List<UserDTO> getAllUsers();
}
