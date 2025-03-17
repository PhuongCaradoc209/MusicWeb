package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.enums.UserRole;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.user.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<Map<String, String>> login(@RequestBody User user, HttpServletResponse response) {
        try {
            // ✅ Tìm user bằng email
            UserDTO userDTO = userService.loginUser(user)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email or password"));

            // ✅ Tạo token bằng email
            String token = jwtUtil.generateToken(user.getEmail());

            // ✅ Thêm JWT vào HttpOnly Cookie
            jwtUtil.addJwtToCookie(response, token);

            return ResponseEntity.ok(Map.of("message", "Login successful"));

        } catch (ResponseStatusException ex) {
            return ResponseEntity.status(ex.getStatusCode()).body(Map.of("message", ex.getReason()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        // ✅ Xóa cookie bằng cách đặt Max-Age = 0
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus(@CookieValue(name = "jwt", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No token found"));
        }

        try {
            System.out.println("🔍 Debug: Token nhận được - " + token);
            String username = jwtUtil.extractEmail(token);
            System.out.println("✅ Debug: Username từ token - " + username);

            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid token"));
            }

            return ResponseEntity.ok(Map.of("username", username));
        } catch (Exception e) {
            System.err.println("❌ Debug: Lỗi xử lý token - " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Error decoding token"));
        }
    }


}
