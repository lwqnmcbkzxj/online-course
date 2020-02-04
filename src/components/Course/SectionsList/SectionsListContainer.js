import React from 'react';
import SectionsList from './SectionsList';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setSections } from '../../../redux/sections-reducer';
import { sectionsAPI } from '../../../api/api';


class SectionsListContainer extends React.Component {
    componentDidMount() {       

        // sectionsAPI.getSections().then((response) => {
        //     this.props.setLessonData(response.data[0]);    
        // })

        let response = [
            {
                id: 1,
                title: 'Section Title 1',
                lessons: [
                    { id: 1, name: 'Lesson 1' },
                    { id: 2, name: 'Lesson 2' },
                    { id: 3, name: 'Lesson 3' }                    
                ]
            },
            {
                id: 2,
                title: 'Section Title 2',
                lessons: [
                    { id: 4, name: 'Lesson 4' },                                     
                ]
            },
            {
                id: 3,
                title: 'Section Title 3',
                lessons: [                    
                    { id: 5, name: 'Lesson 5' },
                    { id: 6, name: 'Lesson 6' }                    
                ]
            }
        ]
        this.props.setSections(response);

    }
    render() {
        return <SectionsList {...this.props} sections={this.props.sections} />
    }
}

let mapStateToProps = (state) => ({
    sections: state.sectionsPage.sections
})



export default connect(mapStateToProps, { setSections })(SectionsListContainer);
