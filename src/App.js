import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import { Switch } from 'react-router';
import { withRouter } from 'react-router'

import { authUser } from './redux/user-reducer';
import { initApp, setStartPagename } from './redux/app-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Preloader from './components/Common/Preloader/Preloader';

import Welcome from './components/Welcome/Welcome';
import Tasks from './components/Tasks/Tasks';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup'
import DashboardContainer from './components/Dashboard/DashboardContainer';
import CourseContainer from './components/Course/CourseContainer';
import HeaderContainer from './components/Header/HeaderContainer';


class App extends React.Component {
	componentDidMount() {		
		this.props.authUser();		
		this.props.initApp();
	}
	componentWillUpdate() {
		if (this.props.startPageName === 'welcome') {			
			this.props.setStartPagename('course');			
			this.props.history.push(`/course/lesson/${this.props.firstNotCompletedLessonId}`);			
		}
	}
	render() {
		if (this.props.history.location.pathname === '/')
			this.props.history.push("/welcome");

		if (!this.props.initialized)
			return <Preloader />;
		return (
			<div className="app-wrapper">
				<Route path="/" render={() => <HeaderContainer />} />

				<div className='app-container'>
					<Switch>
						<Route exact path="/welcome" render={() => <Welcome />} />
						<Route path="/course" render={() => <CourseContainer />} />
						<Route path="/tasks" render={() => <Tasks />} />
						<Route path="/dashboard" render={() => <DashboardContainer />} />
						<Route exact path="/login" render={() => <Login />} />
						<Route exact path="/signin" render={() => <Signup />} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</div>
		);
	}
}


let mapStateToProps = (state) => ({
	initialized: state.app.initialized,
	firstNotCompletedLessonId: state.course.firstNotCompletedLessonId,
	currentSectionId: state.course.currentSectionId,
	startPageName: state.app.startPageName,
	logged: state.user.logged,
	
})


export default compose(
	withRouter,
	connect(mapStateToProps, { authUser, initApp, setStartPagename }))(App);