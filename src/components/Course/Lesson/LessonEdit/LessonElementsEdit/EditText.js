import React from 'react';
import s from '../LessonEdit.module.css';

const EditText = (props) => {
    let deleteElement = (position) => {
        props.deleteElement(props.lessonId, position)
    }
    return (
        <div className={s.text}>
            <div className={s.elementHeader}>
                <i className="fa fa-trash-o" aria-hidden="true" onClick={()=> {deleteElement(props.position)}}></i>
                <i className="fa fa-arrows" aria-hidden="true"></i>
                <h2>Lecture notes</h2>
            </div>
            
            <textarea defaultValue={props.text} placeholder={"Write text here"}/>
        </div>

    );
}
export default EditText;
