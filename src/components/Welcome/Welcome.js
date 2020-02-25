import React from 'react';
import s from './Welcome.module.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setStartPagename } from '../../redux/app-reducer';

const Welcome = (props) => {
    let setStartPagename = () => {
        props.setStartPagename('welcome');
    }
    return (
        <div className={s.welcome}>
            <div className={s.header}>
                <div>Creativity in Physics</div>
                <div className={s.navlinks}>
                <NavLink to="/login"><button className={s.item}onClick={setStartPagename}>Resume</button></NavLink>
                <NavLink to="/signin"><button className={s.item}>Enroll</button></NavLink>
                </div>
            </div>
            <div className={s.content}>
                <div className={s.entollText}>
                    <p>Learn to<br />
                         be creative<br />
                         in physics</p>
                    <button>Enroll</button>
                </div>
                <div className={s.monitorBlock}>
                    {props.firstVideo ?
                         <div className={s.video}>
                            <iframe src={props.firstVideo} frameBorder="0" title="video-welcome" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        firstVideo: state.course.firstVideo
    }
}
export default connect(mapStateToProps, { setStartPagename })(Welcome);;
    