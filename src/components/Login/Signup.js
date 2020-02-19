import React from 'react';
import s from './Login.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/user-reducer';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router';

const RegisterForm = (props) => {
    return (
        <div className={s.login}>           
            <form onSubmit={props.handleSubmit}>                
                <Field placeholder="Login" name="login" component="input"/>
                <Field placeholder="Email" name="email" component="input"/>
                <Field placeholder="Password" name="password" type="password" component="input"/>
                <Field placeholder="Repeat password" name="repeat_password" type="password" component="input"/>
                <button className={s.active}>Sign up</button>
            </form>
        </div>
    );
}


const Register = (props) => {
    const onSubmit = (formData) => {
        if (formData.password === formData.repeat_password) {
            // props.register(formData.login, formData.email, formData.password);
            return <Redirect to={"/course"} />
        }
        
    }

    return (
        <div className={s.login}>
            <h1>LOGIN</h1>            
            <ReduxRegisterForm onSubmit={onSubmit} />
            <NavLink to="/login"><button>Log in</button></NavLink>
        </div>
    );
}



const ReduxRegisterForm = reduxForm({ form: 'register' })(RegisterForm)

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps, { register })(Register);