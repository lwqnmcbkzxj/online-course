import React from 'react';
import s from './Dashboard.module.css';
import SelfInfoContainer from './SelfInfo/SelfInfoContainer';
import OverallStats from './OverallStats/OverallStats';

const Dashboard = (props) => {
    return (
        <div className={s.dashboard}>
            <SelfInfoContainer />
            {props.role ? <OverallStats /> : null}
        </div>        
    );
}

export default Dashboard;
