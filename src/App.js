import React, { useContext } from "react";
import Home from "./pages/home/Home";
import "./vars.css";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={user ? <Home /> : <Navigate to="/login" />}
					/>
					<Route path="/profile/:id" element={<Profile />} />
					<Route
						path="/login"
						element={user ? <Navigate to="/" /> : <Login />}
					/>
					<Route
						path="/register"
						element={user ? <Navigate to="/" /> : <Register />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
