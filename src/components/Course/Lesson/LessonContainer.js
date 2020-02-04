import React from 'react';
import Lesson from './Lesson';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setLessonData } from '../../../redux/lesson-reducer';
import { withRouter } from 'react-router';
import { lessonsAPI } from '../../../api/api';
class LessonContainer extends React.Component {
    
    componentDidMount() {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        let response = {
            id: lessonId,
            title: 'LESSON TITLE ' + lessonId,
            media: "https://www.youtube.com/embed/5R3RI5xowdI",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            task: {
                type: null,
                img: null,
                text: null,
                variants: null
            }
        }
        this.props.setLessonData(response);

        // lessonsAPI.getLesson(lessonId).then((response) => {
        //     this.props.setLessonData(response.data[0]);    
        // });
      
    }




    componentDidUpdate(prevProps) {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;

        if (lessonId !== prevProps.lesson.id) {
            // lessonsAPI.getLesson(lessonId).then((response) => {
            //     this.props.setLessonData(response.data[0]);    
            // });
            
            let response = {
                id: lessonId,
                title: 'LESSON TITLE ' + lessonId,
                media: "https://www.youtube.com/embed/5R3RI5xowdI",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                task: {
                    type: null,
                    img: null,
                    text: null,
                    variants: null
                }
            }
            this.props.setLessonData(response);




            
        }
    }

    render() {
        return <Lesson {...this.props} lesson={this.props.lesson} />
    }
}


let mapStateToProps = (state) => {
    return {
        lesson: state.lessonPage.lesson,
    }
}



let WithUrlDataContainerComponent = withRouter(LessonContainer);

export default connect(mapStateToProps, { setLessonData })(WithUrlDataContainerComponent);