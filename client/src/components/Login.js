import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleLogin } from "../utils/resource";

const Login = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		if (username.trim() && password.trim()) {
			e.preventDefault();
			handleLogin(username, password, navigate);
			setPassword("");
			setUsername("");
			onLogin();
		}
	};

	return (
		<main className='login'>
			<head>
				<link href="https://fonts.googleapis.com/css2?family=Bowlby+One&display=swap" rel="stylesheet"></link>
			</head>
			<form className='login__form' onSubmit={handleSubmit}>
				<h1 style={{'fontFamily': 'Bowlby One', 'fontSize': '6rem', 'color': 'rgb(227, 119, 4)', 'letterSpacing': '4px', 'padding-bottom': '2%'}}>PocketPlanner</h1>
				<h2 className='login__title'>Log into your account</h2>
				<label htmlFor='username'>Username</label>
				<input
					id='username'
					name='username'
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className='username'
					placeholder="Username"
				/>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					type='password'
					name='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='password'
					placeholder="Password"
				/>
				<button className='loginButton'>LOG IN</button>
				<p style={{ textAlign: "center", marginTop: "30px" }}>
					Don't have an account?{" "}
					<Link className='registerlink' to='/register'>
						Create one
					</Link>
				</p>
			</form>
		</main>
	);
};

export default Login;