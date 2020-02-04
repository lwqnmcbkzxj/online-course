import React from 'react';
import s from './Lesson.module.css';


const Lesson = (props) => {
    console.log(props)
    
    return (
        <div className = {s.lesson}>           
           <h1 className={s.title}>{props.lesson.title}</h1>
            <div className={s.media}>
                <iframe src={props.lesson.media} frameBorder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className={s.lessonText}>
                <h2>Lecture notes</h2>
                <p>{props.lesson.text}</p>
            </div>
            {/* <div className={s.task}>
                <h2>Task</h2>
                <div>
                    <p>{props.lesson.task.text}</p>
                    <img src={props.lesson.task.img}/>
                </div>
            </div> */}
        </div>        
    );
}
export default Lesson;
