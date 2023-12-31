import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";

const App = () => {
	return (
		<div>
			<Routes>
				<Route exact path='/' element={<Login />} />
				<Route path='/register' element={<Signup />} />
          		<Route path='/*' element={<Home />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}; 

export default App;
