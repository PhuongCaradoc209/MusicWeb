import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

function SignUp() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignUp = async () => {
        try {
            const user = { email, password };
            const response = await axios.post('http://localhost:8080/api/users/register', user);
            console.log('User registered:', response.data);

            setSuccessMessage('Sign up successful! Please go to log in.');
            setErrorMessage('');
        } catch (error) {
            console.error('Error registering user:', error);

            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'An error occurred');
            } else {
                setErrorMessage('An unexpected error occurred.');
            }

            setSuccessMessage('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen animate-bgAnimation">
            <div className="rounded-xl w-full max-w-md min-h-[550px] border bg-white shadow-lg flex flex-col px-8 md:px-20 py-10 pt-12">
                <h2 className="text-4xl font-bold text-gray-700 text-center mb-10 leading-tight whitespace-pre-line">
                    Sign up to start listening
                </h2>

                <form className="flex flex-col flex-grow">
                    {step === 1 ? (
                        <div className="flex flex-col mb-4 text-sm">
                            <label className="text-gray-600 mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 font-sans focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col mb-4 text-sm">
                            <label className="text-gray-600 mb-1 font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 font-sans focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    )}

                    {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}
                    {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

                    {step === 1 ? (
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="bg-color_1 text-white font-semibold py-3 w-full rounded-3xl hover:scale-105 transition duration-300 text-sm mt-2"
                        >
                            Next
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={() => setStep(1)}  // Button to go back to email step
                                className="bg-gray-300 text-black font-semibold py-3 w-full rounded-3xl hover:scale-105 transition duration-300 text-sm mt-2"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={handleSignUp}
                                className="bg-color_1 text-white font-semibold py-3 w-full rounded-3xl hover:scale-105 transition duration-300 text-sm mt-2"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </form>

                <div className="flex items-center my-8">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="mx-4 text-gray-600 text-lg font-medium">or</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>

                <button
                    type="button"
                    className="flex items-center justify-center text-black py-3 mb-4 w-full rounded-3xl transition duration-300 text-lg border border-gray-300 hover:border-gray-600 hover:shadow"
                >
                    <FcGoogle size={25} className="mr-5" />
                    Log in with Google
                </button>

                <ul className="text-gray-600 text-sm text-center mt-auto">
                    <li className="mt-2">
                        <span>Already have an account? </span>
                        <a href="/login" className="cursor-pointer font-semibold hover:underline hover:text-color_1 transition">
                            Log in here
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SignUp;
