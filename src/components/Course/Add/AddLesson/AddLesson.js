import React from 'react';
import s from '../Add.module.css';



const AddLesson = (props) => {
    let addLesson = () => {
        let newLesson = {

        }
        props.addLesson(newLesson, props.currentSectionId);
    }
    return (
        <div className={s.add}>
            <div>
                <textarea className={s.titleInput} placeholder={"Write title here"}></textarea>
            </div>
            
            <div>
                <textarea className={s.textInput} placeholder={"Write text here"}></textarea>
            </div>

            <div>
                <h2>Link to video</h2>
                <textarea className={s.videoInput} placeholder={"http://"}></textarea>
            </div>

            <div>
                <h2>Link to picture</h2>
                <textarea className={s.pictureInput} placeholder={"http://"}></textarea>
            </div>

            <div className={s.addElements}>
                <button>+ Add text</button>
                <button>+ Add picture</button>
                <button>+ Add video</button>
            </div>

            <div className={s.buttonHolder}><button className={s.addButton} onClick={addLesson}>Add lesson</button></div>
        </div>
    );
}
export default AddLesson;
