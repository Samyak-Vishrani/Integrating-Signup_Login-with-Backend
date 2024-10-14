import React from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from "js-cookie";

const PrivateRoute = () => {
    
    const accessToken = Cookies.get("myAccessToken");

    if (accessToken) {
        return <Outlet />
    }
    else {
        return "ERROR"
    }
}

export default PrivateRoute;