import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'
import Task from './LessonElements/Task'

const LessonEdit = (props) => {
    let taskCount = 0;
    let addTaskElement = (taskType) => {
        let options = null;
        let answers = null;
        if (taskType === 1) {
            answers = [''];
            options = ['', ''];
        } else if (taskType === 2) {
            answers = ['', ''];
            options = ['', ''];
        } else if (taskType === 3) {
            answers = [''];
            options = [''];
        }

        if (answers !== null)
            answers = JSON.stringify(answers)

        if (options !== null)
            options = JSON.stringify(options)

        props.addTaskElement(props.lesson.id, 3, [options, answers]);
    }

    let addElement = (elementType, isAnswer = false) => {
        props.addElement(props.lesson.id, elementType, props.lesson.type, isAnswer);
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

    let togglePublish = (type) => {
        props.togglePublish(props.lesson.id, props.currentSectionId, type)
    }
    
    return (
        <div className={s.lesson}>
            {props.isFirstLesson ? <div className={s.publishCheckboxBlock}> Publish section<input type="checkbox" checked={props.publishedSection} onChange={() => { togglePublish('section') }} /> </div> : null}
            <div className={s.publishCheckboxBlock}> Publish lesson<input type="checkbox" checked={props.publishedLesson} onChange={() => { togglePublish('lesson') }} /> </div>
            {props.isFirstLesson ? <input defaultValue={props.sectionTitle} placeholder={"Write section title here"} onBlur={(e) => { editSection(e) }} /> : null}
            <input defaultValue={props.lessonTitle} placeholder={"Write lesson title here"} onBlur={(e) => { editLesson(e) }} />

            {props.lesson.elements ? props.lesson.elements.map(element =>
                <div className={s.lessonElement} key={`i${element.id}e${element.lesson_position}`}>
                    {!element.is_answer ?
                        element.type === 0 ? <Text {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement} />
                            : element.type === 1 ? <Picture {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement} />
                                : element.type === 2 ? <Video {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement} />
                                    : null
                        : null}
                </div>
            ) : null}

            <div className={s.addElements}>
                <button onClick={() => { addElement(0) }}>+ Add text</button>
                <button onClick={() => { addElement(1) }}>+ Add picture</button>
                <button onClick={() => { addElement(2) }}>+ Add video</button>
            </div>


            {props.lesson.elements ? props.lesson.elements.map(element =>
                <div className={s.lessonElement} key={`i${element.id}e${element.lesson_position}`}>
                    {element.type === 3 ? taskCount++ ||
                        <Task {...element}
                            editMode={props.editMode}
                            deleteElement={deleteElement}
                            editElement={editElement}
                            lesson={props.lesson}
                            completedLessonsIds={props.completedLessonsIds}
                        /> : null}
                </div>

            ) : null}

            {props.lesson.type === 1 && taskCount === 0 ?
                <div className={s.addElements}>
                    <h2>Task</h2>
                    <button onClick={() => { addTaskElement(1) }}>+ Add one choice test</button>
                    <button onClick={() => { addTaskElement(2) }}>+ Add multichoice test</button>
                    <button onClick={() => { addTaskElement(3) }}>+ Add open answer</button>
                </div>
                : null}


            {props.lesson.type === 1 ?
                <div className={s.answerBlock}>
                    <h2>Answer</h2>
                    {props.lesson.elements ? props.lesson.elements.map(element =>
                        <div className={s.lessonElement} key={`i${element.id}e${element.lesson_position}`}>
                            {element.is_answer ?
                                element.type === 0 ? <Text {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement} />
                                    : element.type === 1 ? <Picture {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement} />
                                        : element.type === 2 ? <Video {...element} editMode={props.editMode} deleteElement={deleteElement} editElement={editElement} />
                                            : null
                                : null}
                        </div>
                    ) : null}
                    <div className={s.addElements}>
                        <button onClick={() => { addElement(0, true) }}>+ Add text</button>
                        <button onClick={() => { addElement(1, true) }}>+ Add picture</button>
                        <button onClick={() => { addElement(2, true) }}>+ Add video</button>
                    </div>
                </div>
                : null}

        </div>
    );
}
export default LessonEdit;
