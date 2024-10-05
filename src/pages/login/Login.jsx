import "./login.css";

const Login = () => {
	return (
		<div className="login">
			<div className="login_wrapper">
				<div className="login_left">
					<h1 className="login_title">Lamasocial</h1>
					<span className="login_desc">
                        Connect with friends and the world around you on lamasocial
					</span>
				</div>
				<div className="login_right">
					<input
						type="email"
						placeholder="Email..."
						className="login_input"
					/>
					<input
						type="password"
						placeholder="Password..."
						className="login_input"
					/>
					<button className="login_login_button">Log in</button>
					<span className="login_forgot_password">
						Forgot Password?
					</span>
					<button className="logn_signup_button">Create a new account</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
