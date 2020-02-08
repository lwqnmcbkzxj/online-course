import React from 'react';
import s from './Dashboard.module.css';
import SelfInfoContainer from './SelfInfo/SelfInfoContainer';
import OverallStats from './OverallStats/OverallStats';


const Dashboard = () => {
    let isAdmin = true;
    return (
        <div className={s.dashboard}>
            <SelfInfoContainer />
            {isAdmin ? <OverallStats /> : null}
        </div>        
    );
}
export default Dashboard;
