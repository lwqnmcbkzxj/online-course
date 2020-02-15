import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'
import Task from './LessonElements/Task'

const LessonEdit = (props) => {

    let addTaskElement = (taskType) => { 
        let options = null;
        let answers = null;
        if (taskType === 1) {
            answers = [''];
            options = ['', '', '', ''];            
        } else if (taskType === 2) {
            answers = ['', ''];
            options = ['', '', '', ''];
        } else if (taskType === 3) {           
            answers = [''];
        }
       
        
        props.addTaskElement(props.lesson.id, 3, [options, answers]);   
    }

    let addElement = (elementType) => {
        props.addElement(props.lesson.id, elementType, props.lesson.type);
    }

    let deleteElement = (elementId) => {
        props.setModalFunction(props.deleteElement, [elementId, props.lesson.type], 'Element');
    }

    let editElement = (elementId, data, elementType) => {
        props.editElement(elementId, data, elementType, props.lesson.type)
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
                                    : element.type == 2 ? <Video {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement} />
                                        : element.type == 3  ? <Task {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement}/>
                                            : null

                        }

                    </div>

                ) : null
            }

            <div className={s.addElements}>
                <button onClick={() => { addElement(0) }}>+ Add text</button>
                <button onClick={() => { addElement(1) }}>+ Add picture</button>
                <button onClick={() => { addElement(2) }}>+ Add video</button>
            </div>

            {props.lesson.type === 1 ? 
                <div className={s.addElements}>                    
                    <h2>Task</h2>
                    <button onClick={() => { addTaskElement(1) }}>+ Add one choise test</button>
                    <button onClick={() => { addTaskElement(2) }}>+ Add multichoise test</button>
                    <button onClick={() => { addTaskElement(3) }}>+ Add open answer</button>
                </div>
                : null}
        </div>
    );
}
export default LessonEdit;
