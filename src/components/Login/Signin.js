import React from 'react';
import s from './Login.module.css';
import { NavLink } from 'react-router-dom';


const Signin = () => {
    return (
        <div className = {s.login}>
            <form>
                <h1>LOGIN</h1>
                <input placeholder="Login"/>
                <input placeholder="Email"/>
                <input placeholder="Password"/>
                <input placeholder="Repeat password" />
            </form>
            <button className={s.active}>Sign in</button>
            <NavLink to="/login"><button>Log in</button></NavLink>
        </div>
    );
}
export default Signin;
