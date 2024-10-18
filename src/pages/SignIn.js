import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import axios from '../api/axios';
import Cookies from "js-cookie";


const SignIn = ({theme, setTheme}) => {

    const navigate = useNavigate();

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'black' ? 'white' : 'black'));
    };

    const loginUrl = "/login";


    const [enteredData, setEnteredData] = useState({
        email: '',
        password: ''
    })

    const enteredEmail = (e) => {
        e.preventDefault();
        let val = e.target.value;

        setEnteredData({
            ...enteredData, email: val
        });
    }

    const enteredPass = (e) => {
        e.preventDefault();
        let val = e.target.value;

        setEnteredData({
            ...enteredData, password: val
        });
    }

    const validateData = (e) => {
        e.preventDefault();
        const newErrors = {};

        if ((enteredData.email === null) || (enteredData.password === null)) {
            newErrors = "Incorrect Email or Password";
            return false;
        }
        else {
            return true
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("Submit clicked");
        const isValid = await validateData(e);

        if (!isValid) {
            alert("Incorrect Email or Password. Try again");
        }
        else {
            try {
                console.log("Sending..")
                const response = await axios.post(loginUrl,
                    JSON.stringify({
                        email: enteredData.email,
                        password: enteredData.password
                    }),
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
                console.log("Access token: " + response.data.data.accessToken);

                const userAccessToken = response.data.data.accessToken;
                Cookies.set('myAccessToken', userAccessToken);


                const token = Cookies.get("myAccessToken");
                console.log("Cookie: " + token);

                navigate('/mainpage')

            } catch (err) {
                console.log("Api Error: " + err.message);
                alert("Incorrect Email or Password");
            }
            console.log("Sending Done")
        }

    }


    return (
        <main
            className={theme}
        >

            <nav className="navbar">
                <div className="nav-container">
                    <button onClick={toggleTheme} className="nav-button toggle-theme">Toggle Theme</button>
                    <button onClick={() => navigate('/signin')} className="nav-button sign-in" >Sign In</button>
                    <button onClick={() => navigate('/signup')} className="nav-button sign-up">Sign Up</button>
                </div>
            </nav>

            <section className={theme}>
                <div className="main-div">

                    <h1>Sign In</h1>

                    <form className="signup-form">
                        <div className="input-box">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter E-mail"
                                onChange={enteredEmail}
                            />
                            <Button startIcon={<MailIcon />} className='icon'></Button>
                        </div>
                        <div className="input-box">
                            <label htmlFor="pass">Password</label>
                            <input
                                type="password"
                                id="pass"
                                placeholder="Enter Password"
                                onChange={enteredPass}
                            />
                            <Button startIcon={<LockIcon />} className='icon'></Button>
                        </div>

                        <button
                            type="submit"
                            className='submit'
                            aria-label="Submit data"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <div className="signup-link linking">
                            <p>Don't have an account?</p>
                            <Link to="/signup" className="link">Sign Up</Link>
                        </div>

                    </form>
                </div>
            </section>

        </main>

    )
}

export default SignIn;