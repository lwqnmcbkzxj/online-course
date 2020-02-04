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
            media: "https://www.youtube.com/watch?v=2lAe1cqCOXo",
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit. 
            In voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident.`,
            task: {
                type: 1,
                img: 'https://bugaga.ru/uploads/posts/2013-05/1369165348_milahi-29.jpg',
                text: "Текст вопроса",
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
                media: "https://www.youtube.com/watch?v=2lAe1cqCOXo",
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit. 
                In voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident.`,
                task: {
                    type: 1,
                    img: 'https://bugaga.ru/uploads/posts/2013-05/1369165348_milahi-29.jpg',
                    text: "Текст вопроса",
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