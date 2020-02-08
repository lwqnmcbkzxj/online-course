import React from 'react';
import s from './SelfInfo.module.css';
const SelfInfo = (props) => {
    return (
        <div className={s.selfInfo}>
            <div className = {s.stats}>
                <div>
                    <div className={s.statName}>Progress</div>
                    <div>24 %</div>
                </div>
                <div className={s.statName}>
                    <div>Sections</div>
                    <div>1 / 10</div>
                </div>
                <div className={s.statName}>
                    <div>Lessons</div>
                    <div>21 / 173</div>
                </div>
                <div className={s.statName}>
                    <div>Tasks</div>
                    <div>42 / 80</div>
                </div>
                
            </div>
            <div className={s.info}>
                <div>
                    <div>Password</div>
                    <div>********</div>
                    <button>Change</button>
                </div>
                <div>
                    <div>Email</div>
                    <div>po****@gmail.com</div>
                    <button>Change</button>
                </div>
            </div>
        </div>        
    );
}
export default SelfInfo;
