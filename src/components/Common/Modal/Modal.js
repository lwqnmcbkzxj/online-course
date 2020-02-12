import React from 'react';
import s from './Modal.module.css';

const Modal = (props) => {
    let confirm = () => {
        props.modalFunction.func(props.modalFunction.data);
        props.toggleModalVisible();
    }
    return (
        <div>
            {
                props.modalIsVisible ?
                    <div className={s.modal}>
                        {/* <h2>{props.question}</h2> */}

                        < h2 > Are you sure you want to delete this Section/Lesson/Element</h2>
                        <div className={s.options}>
                            {/* <div>{props.options.confirm}</div> */}
                            <button onClick={confirm}>Delete</button>
                            <button onClick = {() => {props.toggleModalVisible()}}>Cancel</button>
                        </div>
                    </div>
                    : null

            }
        </div >
    );
}
export default Modal;
