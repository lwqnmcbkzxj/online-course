import React from 'react';
import SelfInfo from './SelfInfo';
import { connect } from 'react-redux';
import { setStats } from '../../../redux/user-reducer';


class SelfInfoContainer extends React.Component {    
    componentDidMount() {
        // this.props.setStats(response);
        
    }
    render() {
        return <SelfInfo {...this.props} info={this.props.info} stats={this.props.stats}/>
    }
}

let mapStateToProps = (state) => ({
    stats: state.user.stats,
    info: state.user.info
})
 


export default connect(mapStateToProps, { setStats })(SelfInfoContainer);
