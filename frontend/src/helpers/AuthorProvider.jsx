import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

// Hàm lấy thông tin người dùng theo id
const fetchUserProfile = async (id, token) => {
  const res = await axios.get(`http://localhost:8080/api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); 
        if (token && userId) {
        fetchUserProfile(userId, token)
            .then((userData) => {
            setUser(userData);
            setIsAuthenticated(true);
            })
            .catch(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            });
        }
    }, []);

    const login = async (credentials) => {
        try {
        const res = await axios.post("http://localhost:8080/api/users/login", credentials);
        const { token, id } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id); 
        const userData = await fetchUserProfile(id, token);
        setUser(userData);
        setIsAuthenticated(true);
        } catch (error) {
        console.error("Đăng nhập thất bại:", error);
        throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};