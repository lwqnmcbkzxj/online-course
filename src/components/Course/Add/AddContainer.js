import React from 'react';
import Add from './Add';
import { connect } from 'react-redux';
import { addSection, addLesson } from '../../../redux/course-reducer';


class AddContainer extends React.Component {    
    render() {        
        return <Add {...this.props} sections={this.props.sections} />
    }
}

let mapStateToProps = (state) => ({
    sections: state.course.sections,
    currentSectionId: state.course.currentSectionId,
})



export default connect(mapStateToProps, {  addSection, addLesson })(AddContainer);
