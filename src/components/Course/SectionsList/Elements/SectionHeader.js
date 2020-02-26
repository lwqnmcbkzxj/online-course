import React from 'react';
import s from '../SectionsList.module.css';

import deleteIcon from '../../../../assets/images/delete.png'


const SectionsHeader = (props) => {
    let deleteSection = (sectionId) => {
        props.deleteSection(sectionId)
    }

    let toggleSection = (sectionId) => {
        props.toggleSection(sectionId)
    }


    let changeSectionPosition = (position, direction) => {
        props.changeSectionPosition(position, direction)
    }

    return (
        <div className={s.sectionContent}>
            {props.editMode &&
                <div className={s.serviceBlock}>
                    <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { deleteSection(props.id) }} /></div>
                    <div className={s.moveElementBlock}>
                        {props.dash_position !== 1 ?
                            <i className="fa fa-caret-up" aria-hidden="true" onClick={() => { changeSectionPosition(props.dash_position, 0) }}></i>
                            : null}
                        {props.dash_position !== props.sectionsLength ?
                            <i className="fa fa-caret-down" aria-hidden="true" onClick={() => { changeSectionPosition(props.dash_position, 1) }}></i>
                            : null}
                    </div>
                </div>}

            {props.completedSectionsIds.some(id => +id === +props.id) ? <div><i className="fa fa-check" aria-hidden="true"></i></div> : null}


            <div onClick={() => { toggleSection(props.id) }} className={s.sectionNameBlock}>
                <h1 className={s.sectionName} > {props.title}   </h1>
                {props.visibleSections.some(id => +id === +props.id) ?
                    <i className="fa fa-chevron-up fa-rotate-180" aria-hidden="true"></i> :
                    <i className="fa fa-chevron-up" aria-hidden="true"></i>}
            </div>
        </div>
    )
}

export default SectionsHeader;
