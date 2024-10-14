import './App.css';
import Landing_page from './pages/Landing_page';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './pages/PrivateRoute';



function App() {

    return (
        <div className="App">

            <Router>
                <Routes>

                    <Route path='/' element={<Landing_page />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/signin' element={<SignIn />} />

                    <Route path='/' element={<PrivateRoute />}>
                        <Route path='mainpage' element={<MainPage />} />
                    </Route>

                </Routes>
            </Router>

        </div>
    );
}

export default App;
