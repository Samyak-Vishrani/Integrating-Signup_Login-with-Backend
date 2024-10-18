import './App.css';
import Landing_page from './pages/Landing_page';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MainPage from './pages/MainPage';
import ChangePass from './pages/ChangePass';
import UpdateDetails from './pages/UpdateDetails';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './pages/PrivateRoute';
import { useState } from 'react';




function App() {

    const [theme, setTheme] = useState('black');
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'black' ? 'white' : 'black'));
    };

    return (
        <div className="App">

            <Router>
                <Routes>

                    <Route path='/' element={<Landing_page theme={theme} setTheme={setTheme} />} />
                    <Route path='/signup' element={<SignUp theme={theme} setTheme={setTheme} />} />
                    <Route path='/signin' element={<SignIn theme={theme} setTheme={setTheme} />} />

                    <Route path='/' element={<PrivateRoute />}>
                        <Route path='mainpage' element={<MainPage theme={theme} setTheme={setTheme} />} />
                        <Route path='changepassword' element={<ChangePass theme={theme} setTheme={setTheme} />} />
                        <Route path='update' element={<UpdateDetails theme={theme} setTheme={setTheme} />} />
                    </Route>

                </Routes>
            </Router>

        </div>
    );
}

export default App;
