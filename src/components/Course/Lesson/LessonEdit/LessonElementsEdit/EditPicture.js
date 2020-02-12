import React from 'react';
import s from '../LessonEdit.module.css';

const EditPicture = (props) => {
    let deleteElement = (position) => {
        props.deleteElement(props.lessonId, position)
    }

    return (
        <div className={s.picture}>
            <div className={s.elementHeader}>
                <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { deleteElement(props.position) }}></i>
                <i className="fa fa-arrows" aria-hidden="true"></i>
                <h2>Picture</h2>
            </div>

            <div>
                <input defaultValue={props.text} placeholder={"Write picture title here"} />
                {
                    props.media ? <input defaultValue={props.media} placeholder={"http://"} />
                        :  <input defaultValue={""} placeholder={"http://"} />
                }
            </div>

        </div>
    );
}
export default EditPicture;
