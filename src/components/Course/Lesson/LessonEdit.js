import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'

const LessonEdit = (props) => {
    let addElement = (elementType) => {
        props.addElement(props.lesson.id, props.lesson.type, elementType);
    }

    let deleteElement = (elementId) => {
        props.setModalFunction(props.deleteElement, elementId, 'Element');
    }

    return (
        <div className={s.lesson}>
            {props.isFirstLesson ?
                props.editMode ?
                    <input defaultValue={props.sectionTitle}/> :
                    <h1>{props.sectionTitle}</h1> 
                : null}

            <div className={s.elementHeader}>
                <i className="fa fa-trash-o" style={{ visibility: "hidden" }} aria-hidden="true" onClick={() => { }}></i>
                <i className="fa fa-arrows" aria-hidden="true"></i>
                <input defaultValue={props.lesson.title} placeholder={"Write title here"} />
            </div>
            {
                props.lesson.elements ? props.lesson.elements.map(element =>
                    <div className={s.lessonElement} key={`i${element.id}e${element.lesson_position}`}>
                        {
                            element.type == 0 ? <Text {...element} editMode={props.editMode} deleteElement={deleteElement} />
                                : element.type == 1 ? <Picture {...element} editMode={props.editMode} deleteElement={deleteElement} />
                                    : element.type == 2 ? <Video {...element} editMode={props.editMode} deleteElement={deleteElement} /> : null

                        }

                    </div>

                ) : null
            }

            <div className={s.addElements}>
                <button onClick={() => { addElement(0) }}>+ Add text</button>
                <button onClick={() => { addElement(1) }}>+ Add picture</button>
                <button onClick={() => { addElement(2) }}>+ Add video</button>
            </div>
        </div>
    );
}
export default LessonEdit;
