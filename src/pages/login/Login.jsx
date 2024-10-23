import "./login.css";
import { useContext, useState } from "react";
import { loginCall } from "./../../apiCalls";
import { AuthContext } from "./../../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user, isFetching, error, dispatch } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await loginCall({ email, password }, dispatch);

		// reload

		window.location.reload();
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
						className="login_input"
						type="email"
						required
						placeholder="Email..."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						required
						placeholder="Password..."
						className="login_input"
						minLength="6"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error ? (
						<div className="login_error">
							Invalid email or password
						</div>
					) : null}
					<button
						className="login_login_button"
						disabled={isFetching}
					>
						{isFetching ? "Loading..." : "Login"}
					</button>
					<span className="login_forgot_password">
						Forgot Password?
					</span>
					<button
						className="login_signup_button"
						disabled={isFetching}
					>
						<Link
							style={{ color: "white", textDecoration: "none" }}
							to="/register"
						>
							Create a new account
						</Link>
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
