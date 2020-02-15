import React from 'react';
import s from './Task.module.css';

const TaskEdit = (props) => {   
    let addElement = (elementType) => {
        props.addTaskElement(props.lesson.id, elementType);
    }

    let deleteElement = (elementId) => {
        props.setModalFunction(props.deleteTaskElement, elementId, 'Element');
    }

    let editElement = (elementId, data, elementType) => {
        props.editTaskElement(elementId, data, elementType)
    }

    let editLesson = (e) => {
        props.editLesson(props.currentSectionId, props.lesson.id, e.currentTarget.value)
    }

    let editSection = (e) => {
        props.editSection(props.currentSectionId, e.currentTarget.value)        
    }


    return (
        <div className={s.task}>
           
        </div>
    );
}
export default TaskEdit;
