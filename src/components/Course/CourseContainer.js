import React from 'react';
import Course from './Course';
import Axios from 'axios';
import { connect } from 'react-redux';



class CourseContainer extends React.Component {    
    render() {
        return <Course {...this.props} />
    }
}

let mapStateToProps = (state) => ({
})



export default connect(mapStateToProps, {  })(CourseContainer);
