import React from 'react';
import OverallStats from './OverallStats';
import { connect } from 'react-redux';
import { getOverallStats } from '../../../redux/users-reducer';


class OverallStatsContainer extends React.Component {    
    componentDidMount() {
        // this.props.getOverallStats();        
    }
    render() {
        return <OverallStats {...this.props} />
    }
}

let mapStateToProps = (state) => ({
    stats: state.users.stats
})



export default connect(mapStateToProps, { getOverallStats })(OverallStatsContainer);
