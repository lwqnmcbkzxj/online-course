import React from 'react';
import s from './Article.module.css';

import Video from './ArticleElements/Video'
import Picture from './ArticleElements/Picture'
import Text from './ArticleElements/Text'

const LessonEdit = (props) => {
    let addElement = (elementType) => {
        props.addElement(props.lesson.id, elementType);
    }

    let deleteElement = (elementId) => {
        props.setModalFunction(props.deleteElement, elementId, 'Element');
    }

    let editElement = (elementId, data, elementType) => {
        props.editElement(elementId, data, elementType)
    }

    let editLesson = (e) => {
        props.editLesson(props.currentSectionId, props.lesson.id, e.currentTarget.value)
    }

    let editSection = (e) => {
        props.editSection(props.currentSectionId, e.currentTarget.value)        
    }
    return (
        <div className={s.lesson}> 
            {props.isFirstLesson ?  <input defaultValue={props.sectionTitle} placeholder={"Write section title here"} onBlur={(e) => { editSection(e) }}/>: null}
            <input defaultValue={props.lessonTitle} placeholder={"Write lesson title here"} onBlur={(e) => { editLesson(e) }} />

            {
                props.lesson.elements ? props.lesson.elements.map(element =>
                    <div className={s.lessonElement} key={`i${element.id}e${element.lesson_position}`}>
                        {
                            element.type == 0 ? <Text {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement} />
                                : element.type == 1 ? <Picture {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement} />
                                    : element.type == 2 ? <Video {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement} /> : null

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
