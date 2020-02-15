import React from 'react';
import { Route } from "react-router-dom";
import './App.css';

import Welcome from './components/Welcome/Welcome'

import Tasks from './components/Tasks/Tasks'
import Login from './components/Login/Login'
import Signin from './components/Login/Signin'
import Dashboard from './components/Dashboard/Dashboard'
import CourseContainer from './components/Course/CourseContainer'
import HeaderContainer from './components/Header/HeaderContainer';


const App = (props) => {
	return (
		<div className="app-wrapper">		
			{/* <Route path={/^(?!.*welcome).*$/} render={() => <HeaderContainer />} /> */}
			<Route path="/" render={() => <HeaderContainer />} />

			<div className='app-container'>
				<Route exact path="/welcome" render={() => <Welcome />} />
				<Route path="/course" render={() => <CourseContainer />} />
				<Route path="/tasks" render={() => <Tasks />} />
				<Route path="/dashboard" render={() => <Dashboard />} />
				<Route path="/login" render={() => <Login />} />
				<Route path="/signin" render={() => <Signin />} />
				
			</div>
		</div>
	);
}

export default App;




