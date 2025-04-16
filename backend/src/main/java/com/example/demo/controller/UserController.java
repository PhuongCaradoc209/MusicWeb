package com.example.demo.controller;

import com.example.demo.dto.ListeningHistoryDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.model.ListeningHistory;
import com.example.demo.model.User;
import com.example.demo.service.listeningHistory.ListeningHistoryService;
import com.example.demo.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final ListeningHistoryService listeningHistoryService;

    public UserController(UserService userService, ListeningHistoryService listeningHistoryService) {
        this.userService = userService;
        this.listeningHistoryService = listeningHistoryService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable long id, @RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.updateUser(id, user));
        } catch (RuntimeException ex) {
            throw new RuntimeException("Error during user update: " + ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/user/{userId}")
    public List<ListeningHistoryDTO> getUserHistory(@PathVariable Long userId) {
        return listeningHistoryService.getUserHistoryDTO(userId);
    }
}