import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./components";
import { Home } from "./conatinners";
import { fetchUser } from "./utils/fetchUser";




// import { fetchUser } from "./utils/fetchUser";

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

        if (!User) navigate('/login');
    }, []);

    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<Home />} />
        </Routes>
    );
};

export default App;