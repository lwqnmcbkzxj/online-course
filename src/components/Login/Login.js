import React from 'react';
import s from './Login.module.css';
import { NavLink } from 'react-router-dom';


const Login = () => {
    return (
        <div className = {s.login}>
            <form>
                <h1>LOGIN</h1>
                <input placeholder="Login"/>
                <input placeholder="Password" />
            </form>
            <button className={s.active}>Log in</button>
            <NavLink to="/signin"><button>Sign in</button></NavLink>
        </div>
    );
}
export default Login;
