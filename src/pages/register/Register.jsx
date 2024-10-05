import "./register.css";

const Register = () => {
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
						type="text"
						placeholder="Username..."
						className="login_input"
					/>
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
					<input
						type="password"
						placeholder="Password again..."
						className="login_input"
					/>
					<button className="login_login_button">Sign up</button>
					<button className="logn_signup_button">Log into your account</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
