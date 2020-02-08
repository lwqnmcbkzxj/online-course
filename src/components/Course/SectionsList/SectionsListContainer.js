import React from 'react';
import SectionsList from './SectionsList';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setSections, setCurrentSection } from '../../../redux/sections-reducer';
import { sectionsAPI } from '../../../api/api';


class SectionsListContainer extends React.Component {
    componentDidMount() {
        sectionsAPI.getSections().then((response) => {
            this.props.setSections(response);
        })

        // let response = [
        //     {
        //         "id": 1,
        //         "title": "Section 1 intro",
        //         "lessons": [
        //             {
        //                 "title": "Lecture on Egypt",
        //                 "id": 1,
        //                 "section_position": 1,
        //                 "content_type": 0
        //             },
        //             {
        //                 "title": "Lecture on Greece",
        //                 "id": 2,
        //                 "section_position": 2,
        //                 "content_type": 0
        //             }
        //         ]
        //     },
        //     {
        //         "id": 3,
        //         "title": "Section 3 Experimental Physics",
        //         "lessons": [
        //             {
        //                 "title": "Task 5",
        //                 "id": 4,
        //                 "section_position": 1,
        //                 "content_type": 1
        //             },
        //             {
        //                 "title": "2",
        //                 "id": 7,
        //                 "section_position": 2,
        //                 "content_type": 0
        //             }
        //         ]
        //     },
        //     {
        //         "id": 4,
        //         "title": "Section 4 Computer Aggregated Data & Physics",
        //         "lessons": []
        //     },
        //     {
        //         "id": 5,
        //         "title": "Section 5",
        //         "lessons": []
        //     },
        //     {
        //         "id": 6,
        //         "title": "Section 6",
        //         "lessons": []
        //     },
        //     {
        //         "id": 7,
        //         "title": "Section 7",
        //         "lessons": []
        //     }
        // ]
        // this.props.setSections(response);

    }
    render() {
        return <SectionsList {...this.props} sections={this.props.sections} currentSection={this.props.currentSection} />
    }
}

let mapStateToProps = (state) => ({
    sections: state.sections.sections,
    currentSection: state.sections.currentSection,
    currentLesson: state.lessonPage.currentLesson
})



export default connect(mapStateToProps, { setSections, setCurrentSection })(SectionsListContainer);
