import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const fetchUserProfile = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/users/profile", { 
            withCredentials: true // ✅ Gửi cookie để backend xác thực
        });
        return res.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
        return null;
    }
};


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // ✅ Kiểm tra trạng thái đăng nhập từ backend
    const checkAuthStatus = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/auth/status", { 
                withCredentials: true // ✅ BẮT BUỘC để gửi Cookie
            });
            console.log("✅ API trả về:", res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("❌ Lỗi khi gọi /status:", error);
            setIsAuthenticated(false);
            setUser(null);
        }
    };    

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        try {
            await axios.post("http://localhost:8080/api/auth/login", credentials, { 
                withCredentials: true 
            });
            await checkAuthStatus();
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8080/api/auth/logout", {}, { 
                withCredentials: true 
            });
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
