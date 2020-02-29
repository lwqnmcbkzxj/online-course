import React from 'react';
import s from './Login.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { register } from '../../redux/user-reducer';
import { SubmissionError } from 'redux-form'

import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormComponents/Input';
import { required } from '../../utils/validators/validators';

const RegisterForm = (props) => {
    return (
        <div className={s.login}>           
            <form onSubmit={props.handleSubmit}>
                {props.error ? 
                    <div className={s.formError}>{props.error}</div> :
                    <div className={s.formSuccess}>{props.successMessage}</div>
                }
                <Field placeholder="Login" name="login" component={Input} validate={[required]}/>
                <Field placeholder="Email" name="email" component={Input} validate={[required]}/>
                <Field placeholder="Password" name="password" type="password" component={Input} validate={[required]} />
                <Field placeholder="Repeat password" name="repeat_password" type="password" component={Input} validate={[required]} />
                <button className={s.active}>Sign up</button>
            </form>
        </div>
    );
}
const ReduxRegisterForm = reduxForm({ form: 'register' })(RegisterForm)

class Register extends React.Component {
    state = { successMessage: '' }

    onSubmit = (formData) => {
        let regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regExp.test(formData.email))
            throw new SubmissionError({ _error: "Incorrect email" })

        if (formData.password === formData.repeat_password) {
            this.props.register(formData.login, formData.email, formData.password).then((response) => { 
                if (response)
                    this.setState({successMessage: response })
            });
            
        } else {
            throw new SubmissionError({ _error: "Passwords don't match" })
        } 
    }

    render() {
        return (
            <div className={s.login}>
                <h1>SIGN UP</h1>  
                <ReduxRegisterForm onSubmit={this.onSubmit} successMessage={this.state.successMessage}/>
                <NavLink to="/login"><button>Log in</button></NavLink>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { register })(Register);