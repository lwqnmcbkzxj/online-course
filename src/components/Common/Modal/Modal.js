import React from 'react';
import s from './Modal.module.css';

const Modal = (props) => {
    let confirm = () => {
        if (Array.isArray(props.modalFunction.data))
            props.modalFunction.func(...props.modalFunction.data);
        else
            props.modalFunction.func(props.modalFunction.data);

        props.toggleModalVisible();
    }
    return (
        props.modalIsVisible ?
            <div className={s.modal}>
                < h2 > Are you sure you want to delete this {props.modalFunction.text}?</h2>
                <div className={s.options}>
                    <button onClick={confirm}>Delete</button>
                    <button onClick={() => { props.toggleModalVisible() }}>Cancel</button>
                </div>
            </div>
            : null
    );
}
export default Modal;
