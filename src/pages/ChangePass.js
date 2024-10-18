import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from '../api/axios';
import { Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';


const ChangePass = ({theme, setTheme}) => {

    const navigate = useNavigate();

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'black' ? 'white' : 'black'));
    };

    const currAccessToken = Cookies.get('myAccessToken');
    const changePassURL = '/change-password';
    const logoutURL = '/logout';

    const handleMainPage = () => {
        navigate('/mainpage');
    }
    const [errors, setErrors] = useState('');
    const newErrors = {};

    const [passData, setPassData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const oldPass = (e) => {
        e.preventDefault();
        let val = e.target.value

        setPassData({
            ...passData, oldPassword: val
        })
    }
    const newPass = (e) => {
        e.preventDefault();
        let val = e.target.value

        setPassData({
            ...passData, newPassword: val
        })
    }
    const confirmNewPass = (e) => {
        e.preventDefault();
        let val = e.target.value

        setPassData({
            ...passData, confirmPassword: val
        })
    }

    const validateData = () => {
        const regexPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

        if (!regexPass.test(passData.newPassword)) {
            newErrors.pass = "Password must have min 8 chars, max 20 chars, at least one uppercase letter, one lowercase letter, one number and a special character";
        }
        if (passData.newPassword !== passData.confirmPassword) {
            newErrors.confirmPass = "Password doesn't match"
        }

        setErrors(newErrors);
        console.log("Errors: " + newErrors.pass);
        return Object.keys(newErrors).length !== 0;
    }

    const logoutFunc = () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: logoutURL,
            headers: {
                'Authorization': `Bearer ${currAccessToken}`,
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

    const changePassword = () => {
        let data = JSON.stringify({
            "oldPassword": passData.oldPassword,
            "newPassword": passData.newPassword,
            "confirmPassword": passData.confirmPassword
        });

        console.log(`Data: ${data}`);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: changePassURL,
            headers: {
                'Authorization': `Bearer ${currAccessToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Password Change Successful!!");
            })
            .catch((error) => {
                console.log("Change Pass error: " + error);
            });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit Clicked");

        const err = await validateData();

        if(!err) {
            await changePassword();
            await logoutFunc();
        }


    }



    return (
        <main className={theme}>

            <nav className="navbar">
                <div className="nav-container">
                    <button onClick={toggleTheme} className="nav-button toggle-theme">Toggle Theme</button>
                    <button onClick={handleMainPage} className="nav-button sign-in" >Return to Main Page</button>
                </div>
            </nav>

            <section>

                <div className="main-div">

                    <h1>CHANGE PASSWORD</h1>

                    <form className='changePass'>

                        <div className="input-box">
                            <label htmlFor="oldPass">Old Password</label>
                            <input
                                autoFocus
                                type="password"
                                id="oldPass"
                                placeholder="Enter Old Password"
                                onChange={oldPass}
                            />
                            {/* {errors.name && <p className="error">{errors.name}</p>} */}
                            <Button startIcon={<LockIcon />} className='icon'></Button>
                        </div>
                        <div className="input-box">
                            <label htmlFor="newPass">New Password</label>
                            <input
                                type="password"
                                id="newPass"
                                placeholder="Enter New Password"
                                onChange={newPass}
                            />
                            {errors.pass && <p className="error">{errors.pass}</p>}
                            <Button startIcon={<LockIcon />} className='icon'></Button>
                        </div>
                        <div className="input-box">
                            <label htmlFor="confirmPass">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPass"
                                placeholder="Confirm New Password"
                                onChange={confirmNewPass}
                            />
                            {errors.confirmPass && <p className="error">{errors.confirmPass}</p>}
                            <Button startIcon={<LockIcon />} className='icon'></Button>
                        </div>

                        <button
                            className='submit'
                            type="submit"
                            aria-label="Submit data"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>

                    </form>

                </div>

            </section>


        </main>
    )
}

export default ChangePass