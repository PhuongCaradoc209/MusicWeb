package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.enums.UserRole;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        try {
            UserDTO userDTO = userService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (ResponseStatusException ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", ex.getReason());  // ✅ Trả về lỗi trong key "message"
            return ResponseEntity.status(ex.getStatusCode()).body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        try {
            // ✅ Kiểm tra email & password trong UserService
            UserDTO userDTO = userService.loginUser(user)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email or password"));

            // ✅ Tạo JWT token
            String token = jwtUtil.generateToken(user.getUsername());

            // ✅ Trả về token dưới dạng JSON
            return ResponseEntity.ok(Map.of("token", token, "message", "Login successful"));

        } catch (ResponseStatusException ex) {
            // ✅ Trả về JSON lỗi chuẩn
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", ex.getReason());
            return ResponseEntity.status(ex.getStatusCode()).body(errorResponse);
        }
    }
}
