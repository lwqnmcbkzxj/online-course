import React from 'react';
import Lesson from './Lesson';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setLessonData } from '../../../redux/lesson-reducer';
import { withRouter } from 'react-router';


class LessonContainer extends React.Component {
    
    componentDidMount() {
        let lessonId = this.props.match.params.lessonId ? this.props.match.params.lessonId : 1;
        // Axios.get(`https://lessons/${lessonId}`)
        // .then((response) => {
        //     console.log(response.data)
            this.props.setLessonData(lessonId,'asdasd','asd','asd');
        // });
    }
    render() {
        return <Lesson {...this.props} lesson={this.props.lesson}/>
    }
}


let mapStateToProps = (state) => {
    return {
        lesson: state.lessonPage,
    }
}



let WithUrlDataContainerComponent = withRouter(LessonContainer);

export default connect(mapStateToProps, {setLessonData}) (WithUrlDataContainerComponent);