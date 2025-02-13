package com.example.demo.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {

    public static String hashPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }

    public static boolean matchPassword(String rawPassword, String hashedPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(rawPassword, hashedPassword);
    }

    public static boolean isStrongPassword(String password) {
        if (password == null || password.trim().isEmpty()) return false; // Không được rỗng hoặc toàn khoảng trắng
        if (password.length() < 8) return false; // Ít nhất 8 ký tự
        if (!password.matches(".*[A-Z].*")) return false; // Ít nhất 1 chữ hoa
        if (!password.matches(".*[a-z].*")) return false; // Ít nhất 1 chữ thường
        if (!password.matches(".*\\d.*")) return false;   // Ít nhất 1 số
        if (!password.matches(".*[@#$%^&+=!].*")) return false; // Ít nhất 1 ký tự đặc biệt
        if (password.contains(" ")) return false; // Không chứa khoảng trắng
        return true;
    }
}