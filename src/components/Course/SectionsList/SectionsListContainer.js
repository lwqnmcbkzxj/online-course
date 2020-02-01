import React from 'react';
import SectionsList from './SectionsList';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setSections } from '../../../redux/sections-reducer';


class SectionsListContainer extends React.Component {
    componentDidMount() {
        // Axios.get(`http://c0432b9a.ngrok.io/sections/`)
        //     .then((response) => {
        //         console.log(response.data)
        //         this.props.setSections(response.data);
        
        //     });
    }
    render() {
        return <SectionsList {...this.props} sections={this.props.sections}/>
    }
}

let mapStateToProps = (state) => ({
    sections: state.sectionsPage.sections
})



export default connect(mapStateToProps, { setSections })(SectionsListContainer);
