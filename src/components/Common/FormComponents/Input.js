import React from 'react';
import s from './FormComponents.module.css';

export const Input = (props) => {
    const { input, meta, ...restProps } = props;
    const hasError = meta.touched && meta.error;

    return <input {...input} {...restProps} className={hasError ? s.errorInput : null} />
}
