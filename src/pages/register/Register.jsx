import "./register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
	// code for the register page
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwrdAgain, setPasswrdAgain] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userName = displayName
			.split("")
			.filter((char) => char.match(/[a-zA-Z0-9]/))
			.join("")
			.toLowerCase();
		const user = {
			userName: userName,
			displayName: displayName,
			profilePicture: "",
			coverImage: "",
			nickName: "",
			numOfFriendRequests: 0,
			numOfMsgs: 0,
			friends: [],
			numOfNotifications: 0,
			city: "",
			from: "",
			relationship: "",
			online: true,
			email: email,
			password: password,
		};
		try {
			await axios.post("http://localhost:3000/users", user);
			navigate("/login");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="register">
			<div className="register_wrapper">
				<div className="register_left">
					<h1 className="register_title">Lamasocial</h1>
					<span className="register_desc">
						Connect with friends and the world around you on
						lamasocial
					</span>
				</div>
				<div className="register_right">
					<form onSubmit={handleSubmit} className="register_form">
						<input
							type="text"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							placeholder="Display name..."
							className="register_input"
							required
						/>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email..."
							className="register_input"
							required
						/>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password..."
							className="register_input"
							minLength={6}
							required
						/>
						<input
							type="password"
							value={passwrdAgain}
							onChange={(e) => setPasswrdAgain(e.target.value)}
							onInput={(e) => {
								e.target.value !== password
									? e.target.setCustomValidity(
											"Passwords do not match"
									  )
									: e.target.setCustomValidity("");
							}}
							placeholder="Password again..."
							className="register_input"
							minLength={6}
							required
						/>
						<button
							className="register_register_button"
							type="submit"
						>
							Sign up
						</button>
					</form>
					<Link to="/login">
						<button className="register_login_button">
							Log into your account
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
