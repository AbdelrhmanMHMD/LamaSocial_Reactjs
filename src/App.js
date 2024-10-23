import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import "./vars.css";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

function App() {
	const [loggedUser, setLoggedUser] = useState({});
	const [loggedUserCondition, setLoggedUserCondition] = useState(true);
	useEffect(() => {
		const fetchLoggedUser = async () => {
			try {
				const { data } = await axios.get(
					"http://localhost:3000/loggedUser"
				);
				setLoggedUser(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchLoggedUser();
	}, []);

	useEffect(() => {
		if (Object.keys(loggedUser).length !== 0) {
			setLoggedUserCondition(true);
		} else {
			setLoggedUserCondition(false);
		}
	}, [loggedUser]);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							loggedUserCondition ? (
								<Home />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route path="/profile/:id" element={<Profile />} />
					<Route
						path="/login"
						element={
							loggedUserCondition ? (
								<Navigate to="/" />
							) : (
								<Login />
							)
						}
					/>
					<Route
						path="/register"
						element={
							loggedUserCondition ? (
								<Navigate to="/" />
							) : (
								<Register />
							)
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
