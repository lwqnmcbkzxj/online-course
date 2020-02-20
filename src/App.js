import React from 'react';
import { Route } from "react-router-dom";
import { withRouter, Redirect } from 'react-router';
import './App.css';

import Welcome from './components/Welcome/Welcome'

import Tasks from './components/Tasks/Tasks'
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'
import DashboardContainer from './components/Dashboard/DashboardContainer'
import CourseContainer from './components/Course/CourseContainer'
import HeaderContainer from './components/Header/HeaderContainer';


class App extends React.Component {
	state = {
		firstInit: true
	}
	
	render() {
		if (this.state.firstInit) {
			this.setState({ firstInit: false });
			return <Redirect to="/welcome" />;
		}
		return (
			<div className="app-wrapper">
				<Route path="/" render={() => <HeaderContainer />}/>

				<div className='app-container'>
					<Route path="/welcome" render={() => <Welcome />} />

					<Route path="/course" render={() => <CourseContainer />} />
					<Route path="/tasks" render={() => <Tasks />} />
					<Route path="/dashboard" render={() => <DashboardContainer />} />
					<Route path="/login" render={() => <Login />} />
					<Route path="/signin" render={() => <Signup />} />

				</div>
			</div>
		);
	}
}

export default App;




