import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


const Landing_page = ({theme, setTheme}) => {

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'black' ? 'white' : 'black'));
        console.log(theme);
    };

    const navigate = useNavigate();




    return (

        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <nav className="navbar">
                <div className="nav-container">
                    <button onClick={toggleTheme} className="nav-button toggle-theme" style={{ backgroundColor: 'black' }}>Toggle Theme</button>
                    <button onClick={() => navigate('/signin')} className="nav-button sign-in" >Sign In</button>
                    <button onClick={() => navigate('/signup')} className="nav-button sign-up">Sign Up</button>
                </div>
            </nav>
            <div className="main-div">
                <h1>THIS IS LANDING PAGE</h1>
            </div>
        </motion.main>
    )
}

export default Landing_page;