import React from 'react';
import SelfStats from './SelfStats';
import { connect } from 'react-redux';
import { setStats } from '../../../redux/user-reducer';


class SelfStatsContainer extends React.Component {    
    componentDidMount() {
        // this.props.setStats(response);
        
    }
    render() {
        return <SelfStats {...this.props} stats={this.props.stats}/>
    }
}

let mapStateToProps = (state) => ({
    stats: state.user.stats
})



export default connect(mapStateToProps, { setStats })(SelfStatsContainer);
