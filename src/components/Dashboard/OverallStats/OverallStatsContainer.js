import React from 'react';
import OverallStats from './OverallStats';
import { connect } from 'react-redux';
import { setOverallStats } from '../../../redux/users-reducer';


class OverallStatsContainer extends React.Component {    
    componentDidMount() {
        // this.props.setOverallStats(response);
        
    }
    render() {
        return <OverallStats {...this.props} stats={this.props.stats}/>
    }
}

let mapStateToProps = (state) => ({
    stats: state.users.stats
})



export default connect(mapStateToProps, { setOverallStats })(OverallStatsContainer);
