import React from 'react';
import s from './Login.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, authUser } from '../../redux/user-reducer';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router';


const LoginForm = (props) => {
    return (
        <div className={s.login}>
            <form onSubmit={props.handleSubmit}>
                <Field placeholder="Email" name={"email"} component="input" />
                <Field placeholder="Password" name={"password"} type="password" component="input" />
                <button className={s.active}>Log in</button>
            </form>
        </div>
    );
}

class Login extends React.Component {
    componentDidMount() {        
        this.props.authUser();
    }
    login = (formData) => {
        this.props.login(formData.email, formData.password);
    }
    render() {
        if (this.props.logged) {
            // let currentNotCompletedLesson = getFirstNotCompletedLesson();
            return <Redirect to={"/course"} />
        }

        return (
            <div className={s.login}>
                <h1>LOGIN</h1>
                <ReduxLoginForm onSubmit={this.login} />
                <NavLink to="/signin"><button>Sign in</button></NavLink>
            </div>
        );
    }
}




const ReduxLoginForm = reduxForm({ form: 'login' })(LoginForm)

const mapStateToProps = (state) => ({
    logged: state.user.logged,
})

export default connect(mapStateToProps, { login, authUser })(Login);