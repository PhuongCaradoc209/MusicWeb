package com.example.demo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    @Value("${security.jwt.secret-key}")
    private String SECRET_KEY; // Ít nhất 32 ký tự
    @Value("${security.jwt.expiration-time}")
    private long EXPIRATION_TIME; // 1 ngày

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email) // ✅ Đặt username vào `sub` trong payload
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            System.out.println("🔍 Debug: Claims - " + claims);
            return claims.getSubject(); // ✅ Trả về email thay vì username
        } catch (Exception e) {
            System.err.println("❌ Debug: Lỗi khi trích xuất email - " + e.getMessage());
            return null;
        }
    }


    public boolean validateToken(String token, String username) {
        return extractEmail(token).equals(username) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parser()  // ✅ Đúng cú pháp cho JJWT 0.11.x
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

    public void addJwtToCookie(HttpServletResponse response, String token) {
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true) // 🔥 Nếu dùng HTTPS, đặt thành true
                .sameSite("None")
                .path("/")
                .maxAge(1 * 24 * 60 * 60) // 🔥 Token hết hạn sau 1 ngày
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }
}