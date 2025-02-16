import React from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-color_4">
            <div className="rounded-xl p-8 min-w-72 border bg-white shadow-lg my-8">
                <h2 className="text-xl font-bold text-gray-700 text-center mb-6">
                    Log in to Music
                </h2>

                <button
                    type="button"
                    className="flex items-center justify-center text-black py-2 w-full rounded-3xl
                            transition duration-300 text-xs border border-gray-300 
                            hover:border-gray-600 hover:shadow"
                >
                    <FcGoogle size={16} className="mr-2" />
                    Log in with Google
                </button>

                <form className="mt-6">
                    <div className="flex flex-col mb-4 text-xs">
                        <label className="text-gray-600 mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded-md px-3 py-2 
                                    font-sans focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col mb-4 text-xs">
                        <label className="text-gray-600 mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="border border-gray-300 rounded-md px-3 py-2
                                    font-sans focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-color_1 text-white font-semibold py-2 w-full rounded-3xl 
                            hover:scale-105 transition duration-300 text-xs"
                    >
                        Login
                    </button>
                </form>

                <ul className="text-gray-600 mt-6 text-xs text-center">
                    <li className="cursor-pointer hover:underline hover:font-medium transition">
                        Forgot your password?
                    </li>
                    <li className="mt-2">
                        <span>Don't have an account? </span>
                        <a href="/signup" className="cursor-pointer hover:underline transition font-semibold">
                            Sign up
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Login;