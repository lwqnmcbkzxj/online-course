import React from 'react';
import Lesson from './Lesson';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setLessonData, setCurrentLesson } from '../../../redux/lesson-reducer';
import { setCurrentSection } from '../../../redux/sections-reducer';
import { withRouter } from 'react-router';
import { lessonsAPI } from '../../../api/api';
class LessonContainer extends React.Component {
    componentDidMount() {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        // let response = {{
        //     "id": "1",
        //     "elements": [
        //         {
        //             "text": "\"Ancient Egypt was famous for physics\"",
        //             "media": null
        //         },
        //         {
        //             "text": "Egyptian Music",
        //             "media": null
        //         },
        //         {
        //             "text": null,
        //             "media": "https://youtube.com"
        //         },
        //         {
        //             "text": "Привет там",
        //             "media": null
        //         }
        //     ]
        // }
        // this.props.setLessonData(response);
        // this.props.setCurrentLesson(response.id);


        lessonsAPI.getLesson(lessonId).then((response) => {
            console.log(response)
            // this.props.setLessonData(response);
            // this.props.setCurrentLesson(lessonId);
        });
    }




    componentDidUpdate(prevProps) {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;

        if (lessonId !== prevProps.lesson.id) {
            lessonsAPI.getLesson(lessonId).then((response) => {
                this.props.setLessonData(response);
                this.props.setCurrentLesson(lessonId);
            });

            // let response = {
            //     id: lessonId,
            //     title: 'LESSON TITLE ' + lessonId,
            //     media: "https://www.youtube.com/watch?v=2lAe1cqCOXo",
            //     text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            //     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit. 
            //     In voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident.`,
            // }
            // this.props.setLessonData(response);
            // this.props.setCurrentLesson(response.id);
        }
    }

    render() {
        return <Lesson {...this.props} lesson={this.props.lesson} />
    }
}


let mapStateToProps = (state) => {
    return {
        lesson: state.lessonPage.lesson,
        currentLesson: state.lessonPage.currentLesson,
        currentSection: state.sections.currentSection,
    }
}



let WithUrlDataContainerComponent = withRouter(LessonContainer);

export default connect(mapStateToProps, { setLessonData, setCurrentLesson, setCurrentSection })(WithUrlDataContainerComponent);