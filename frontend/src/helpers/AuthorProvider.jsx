import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const fetchUserProfile = async (token) => {
    try {
        const decoded = jwtDecode(token); // ✅ Giải mã JWT
        const username = decoded.sub; // ✅ Lấy username từ token
        const res = await axios.get(`http://localhost:8080/api/users/profile?username=${username}`, {
            headers: { Authorization: `Bearer ${token}` },
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserProfile(token).then((userData) => {
                if (userData) {
                    setUser(userData);
                    setIsAuthenticated(true);
                } else {
                    logout();
                }
            });
        }
    }, []);

    const login = async (credentials) => {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", credentials);
            const { token } = res.data;
    
            localStorage.setItem("token", token);
            setIsAuthenticated(true);
    
            const userData = await fetchUserProfile(token);
            setUser(userData);
    
            return { token };
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // ✅ Ném lỗi để `handleLogin()` xử lý
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
