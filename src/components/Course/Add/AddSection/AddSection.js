import React from 'react';
import s from '../Add.module.css';

const AddSection = (props) => {   
    let addSection = () => {
        let newSection = {            
            title: "NEW SECTION",
            lessons: []
        }
        props.addSection(newSection);
    }
    return (
        <div className={s.addElement}>
            <div className={s.buttonHolder}><button className={s.addButton} onClick={addSection}>Add section</button></div>
        </div>        
    );
}
export default AddSection;
