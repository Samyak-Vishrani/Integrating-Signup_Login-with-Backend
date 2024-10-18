import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from '../api/axios';
import { Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const UpdateDetails = ({theme, setTheme}) => {

    const navigate = useNavigate();

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'black' ? 'white' : 'black'));
    };

    const currAccessToken = Cookies.get('myAccessToken');
    const updateURL = '/update-details';

    const [errors, setErrors] = useState('');
    const newErrors = {};

    const handleMainPage = () => {
        navigate('/mainpage');
    }

    const [userDetails, setUserDetails] = useState({
        phone: '',
        dob: ''
    });

    const newPhone = (e) => {
        e.preventDefault();
        let val = e.target.value

        setUserDetails({
            ...userDetails, phone: val
        })
    }

    const newDob = (e) => {
        e.preventDefault();
        let val = e.target.value

        setUserDetails({
            ...userDetails, dob: val
        })
    }

    const validateData = () => {
        const regexPhone = /^\d{10}$/;

        if (!regexPhone.test(userDetails.phone)) {
            newErrors.phone = "Enter Valid Phone Number";
        }

        setErrors(newErrors);
        console.log("Errors: " + newErrors.pass);
        return Object.keys(newErrors).length !== 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const err = validateData();

        let data = JSON.stringify({
            "phone": userDetails.phone,
            "dob": userDetails.dob
        });

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: updateURL,
            headers: {
                'Authorization': `Bearer ${currAccessToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

        navigate('/mainpage');

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

                    <h1>UPDATE DETAILS</h1>

                    <form className="update-details">

                        <div className="input-box">
                            <label htmlFor="phone">New Phone Number</label>
                            <input
                                autoFocus
                                type="text"
                                id="phone"
                                placeholder="Enter New Phone No."
                                onChange={newPhone}
                            />
                            {errors.phone && <p className="error">{errors.phone}</p>}
                            <Button startIcon={<PhoneIcon />} className='icon'></Button>

                        </div>

                        <div className="input-box">
                            <label htmlFor="dob">New DOB</label>
                            <input
                                autoFocus
                                type="date"
                                id="dob"
                                placeholder="Enter New DOB"
                                onChange={newDob}
                            />
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

export default UpdateDetails