import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
		<div className="login">
			<div className="login_wrapper">
				<div className="login_left">
					<h1 className="login_title">Lamasocial</h1>
					<span className="login_desc">
						Connect with friends and the world around you on
						lamasocial
					</span>
				</div>
				<form className="login_right" onSubmit={handleSubmit}>
					<input
						type="text"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						placeholder="Display name..."
						className="login_input"
						required
					/>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email..."
						className="login_input"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password..."
						className="login_input"
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
						className="login_input"
						minLength={6}
						required
					/>
					<button className="login_login_button">Sign up</button>
					<button className="logn_signup_button">
						Log into your account
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
