import React from 'react'
import { useNavigate } from "react-router-dom";

function SignUpLogInButton() {
    const navigate = useNavigate();
    return (
    <div>
        <button className='py-2 px-6 text-lg rounded-3xl
                            font-medium
                            hover:scale-105 hover:text-white
                            transition-transform ease-linear'
                onClick={() => navigate("/signup")}>Sign up</button>
        <button className='py-2 px-6 text-lg border rounded-3xl
                            bg-white text-black
                            hover:scale-105 transition-transform ease-linear'
                onClick={() => navigate("/login")}>Log in</button>
    </div>
    )
}

export default SignUpLogInButton
