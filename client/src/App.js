import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import { useState } from "react";

const App = () => {
	return (
		<div>
			<Routes>
				<Route exact path='/pocketplan' element={<Login />} />
				<Route path='/register' element={<Signup />} />
          		<Route path='/home' element={<Home />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}; 

export default App;
