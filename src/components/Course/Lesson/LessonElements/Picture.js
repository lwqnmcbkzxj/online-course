import React from 'react';
import s from './LessonElements.module.css';

const Media = (props) => {

    return (
        props.media ?
            <div className={s.picture}>
                <h2>{props.text}</h2>
                <img src={props.media} alt = "picture"/>
            </div>
            : null
    );
}
export default Media;
