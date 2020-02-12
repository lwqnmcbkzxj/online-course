import React from 'react';
import s from './LessonEdit.module.css';

import EditVideo from './LessonElementsEdit/EditVideo'
import EditPicture from './LessonElementsEdit/EditPicture'
import EditText from './LessonElementsEdit/EditText'

const LessonEdit = (props) => {
    let addElement = (type) => {        
        props.addElement(props.lesson.id, type);
    }
   
    return (
        <div className={s.lesson}>
            <div className={s.elementHeader}>
                <i className="fa fa-trash-o" style={{ visibility: "hidden"}}aria-hidden="true" onClick={()=> {}}></i>
                <i className="fa fa-arrows" aria-hidden="true"></i>
                <input defaultValue={props.lesson.title} placeholder={"Write title here"}/>
            </div>
            {
                props.lesson.elements ? props.lesson.elements.map(element =>
                    <div className={s.lessonElement} key={element.position}>
                        {
                            element.type == 0 ? <EditVideo {...element} editMode={props.editMode} deleteElement={props.deleteElement} lessonId={props.lesson.id}/>
                                : element.type == 1 ? <EditPicture {...element} editMode={props.editMode} deleteElement={props.deleteElement} lessonId={props.lesson.id}/>
                                    : element.type == 2 ? <EditText {...element} editMode={props.editMode} deleteElement={props.deleteElement} lessonId={props.lesson.id}/> : null

                        }

                    </div>

                ) : null
            }

            <div className={s.addElements}>
                <button onClick={()=>{addElement(2)}}>+ Add text</button>
                <button onClick={()=>{addElement(1)}}>+ Add picture</button>
                <button onClick={()=>{addElement(0)}}>+ Add video</button>
            </div>
        </div>
    );
}
export default LessonEdit;
