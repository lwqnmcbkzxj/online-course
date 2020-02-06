import React from 'react';
import s from './Dashboard.module.css';
import SelfStatsContainer from './SelfStats/SelfStatsContainer';
import OverallStats from './OverallStats/OverallStats';


const Dashboard = () => {
    let isAdmin = true;
    return (
        <div className = {s.dashboard}>
            <SelfStatsContainer />
            {isAdmin ? <OverallStats /> : null}
        </div>        
    );
}
export default Dashboard;
