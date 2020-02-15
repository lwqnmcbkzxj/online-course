import React from 'react';
import { Route } from "react-router-dom";

import s from './Course.module.css';

import SectionsListContainer from './SectionsList/SectionsListContainer';
import LessonContainer from './Lesson/LessonContainer';
import Modal from '../Common/Modal/Modal';


class Course extends React.Component {
    render() {
        return (
            <div>
                <div className={s.course}>
                    <SectionsListContainer />
                    <Route path="/course/lesson/:lessonId" render={() => <LessonContainer />} />
                </div>
                <Modal modalIsVisible={this.props.modalIsVisible} toggleModalVisible={this.props.toggleModalVisible} modalFunction={this.props.modalFunction} />
            </div>
        );
    }
}
export default Course;
