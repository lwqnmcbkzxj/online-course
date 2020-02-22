import React from 'react';
import s from './Preloader.module.css';
import loader from '../../../assets/images/Preloader.svg';


const Preloader = (props) => {
    return (
        <div className={s.preloader}>
            <img src={loader} alt="Preloader"/>
        </div>

    );
}

export default Preloader;
