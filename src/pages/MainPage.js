import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from '../api/axios';



const MainPage = () => {

    const navigate = useNavigate();

    const [theme, setTheme] = useState('black');
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'black' ? 'white' : 'black'));
    };

    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        dob: ''
    })

    const accessToken = Cookies.get("myAccessToken");

    const currentUserURL = '/current-user';
    const logoutURL = '/logout';

    const getData = async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: currentUserURL,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log(JSON.stringify(response.data.data.username));
                const dateOfBirth = (response.data.data.dob);
                const dobObj = new Date(dateOfBirth);
                const dobFormatted = dobObj.toDateString();
                setUserData({
                    name: response.data.data.fullName,
                    email: response.data.data.email,
                    username: response.data.data.username,
                    phone: response.data.data.phone,
                    dob: dobFormatted
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const handleShow = () => {
        console.log("show clicked");
        getData();
    }

    const handleLogout = () => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: logoutURL,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

        Cookies.remove('myAccessToken');

        navigate('/signin');
    }


    return (
        <main
            className={theme}
        >
            <nav className="navbar">
                <div className="nav-container">
                    <button onClick={toggleTheme} className="nav-button toggle-theme">Toggle Theme</button>
                    <button onClick={handleLogout} className="nav-button sign-in" >Logout</button>
                </div>
            </nav>

            <div className="info">
                <button
                    className='showInfo'
                    type="submit"
                    aria-label="Show user data"
                    onClick={handleShow}
                >
                    Show User Info
                </button>
                <div className="all-info">
                    <div className='userData'><strong>Name:</strong> {userData.name}</div>
                    <div className='userData'><strong>Email:</strong> {userData.email}</div>
                    <div className='userData'><strong>Username:</strong> {userData.username}</div>
                    <div className='userData'><strong>DOB:</strong> {userData.dob}</div>
                    <div className='userData'><strong>Phone:</strong> {userData.phone}</div>
                </div>
            </div>

        </main>
    )
}

export default MainPage;
