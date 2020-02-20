import React from 'react';
import s from './Login.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/user-reducer';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router';



const LoginForm = (props) => {
    return (
        <div className = {s.login}>
            <form onSubmit={props.handleSubmit}>
                <Field placeholder="Email" name={"email"} component="input"/>
                <Field placeholder="Password" name={"password"} type = "password" component="input"/>
                <button className={s.active}>Log in</button>
            </form>
        </div>
    );
}

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password);
    }
    if (props.logged) return <Redirect to={"/course"} />

    return (
        <div className={s.login}>
            <h1>LOGIN</h1>            
            <ReduxLoginForm onSubmit={onSubmit} />
            <NavLink to="/signin"><button>Sign in</button></NavLink>
        </div>
    );
}




const ReduxLoginForm = reduxForm({ form: 'login' })(LoginForm)

const mapStateToProps = (state) => ({
    logged: state.user.logged
})

export default connect(mapStateToProps, { login })(Login);