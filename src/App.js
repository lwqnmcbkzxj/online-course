import React from 'react';
import { Route } from "react-router-dom";
import './App.css';

import Header from './components/Header/Header'
import Tasks from './components/Tasks/Tasks'
import Dashboard from './components/Dashboard/Dashboard'
import Course from './components/Course/Course'


const App = (props) => {
	return (
		<div className="app-wrapper">
			<Header />
			<div className='app-container'>	
				<Route path="/course" render={() => <Course />} />          
				<Route path="/tasks" render={() => <Tasks />} />          
				<Route path="/dashboard" render={() => <Dashboard />} /> 
			</div>
		</div>
	);
}

export default App;
