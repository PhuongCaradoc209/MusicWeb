import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaSpotify } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthorProvider";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Xử lý login bằng email/password
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            setErrorMessage("");
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage(error.response?.data?.message || "An unexpected error occurred.");
        }
    };

    // Xử lý login với Spotify
    const handleSpotifyLogin = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/spotify/login"); // Gọi API lấy URL Spotify
            window.location.href = response.data; // Điều hướng đến trang xác thực của Spotify
        } catch (error) {
            console.error("Error getting Spotify auth URL:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4 animate-bgAnimation">
            <div className="rounded-xl w-full max-w-md min-h-[550px] border bg-white shadow-lg flex flex-col px-8 md:px-20 py-10">
                <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
                    Log in to Music
                </h2>

                {/* Đăng nhập với Google */}
                <button
                    type="button"
                    className="flex items-center justify-center text-black py-3 w-full rounded-3xl
                            transition duration-300 text-lg border border-gray-300 
                            hover:border-gray-600 hover:shadow mb-4"
                >
                    <FcGoogle size={25} className="mr-5" />
                    Log in with Google
                </button>

                {/* Đăng nhập với Spotify */}
                <button
                    type="button"
                    onClick={handleSpotifyLogin}
                    className="flex items-center justify-center text-white bg-green-500 py-3 w-full rounded-3xl
                            transition duration-300 text-lg hover:bg-green-600"
                >
                    <FaSpotify size={25} className="mr-5" />
                    Log in with Spotify
                </button>

                <hr className="my-8"></hr>
                <form className="flex flex-col flex-grow" onSubmit={handleLogin}>
                    <div className="flex flex-col mb-4 text-sm">
                        <label className="text-gray-600 mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 
                                    font-sans focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col mb-4 text-sm">
                        <label className="text-gray-600 mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Example#123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2
                                    font-sans focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-red-500 text-sm mb-4 mt-2">{errorMessage}</div>
                    )}

                    <button
                        type="submit"
                        className="bg-color_1 text-white font-semibold py-3 w-full rounded-3xl 
                            hover:scale-105 transition duration-300 text-sm mt-2"
                    >
                        Log in
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <ul className="text-gray-600 text-sm">
                        <li className="cursor-pointer hover:underline hover:font-medium transition">
                            Forgot your password?
                        </li>
                        <li className="mt-2">
                            <span>Don't have an account? </span>
                            <a href="/signup" 
                            className="cursor-pointer font-semibold
                                    hover:underline hover:text-color_1 transition">
                                Sign up
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Login;
