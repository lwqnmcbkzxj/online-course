import React from 'react';
import s from './SelfInfo.module.css';

import { Field, reduxForm } from 'redux-form';
class SelfInfo extends React.Component {
    state = {
        totalStats: {
            sections_count: 0,
            article_count: 0,
            task_count: 0,
        },
        completed: {
            article_count: 0,
            task_count: 0,
            sections_count: 0,
        },
        progressPercent: 100,
        visibleEmail: '',
        passwordFormVisible: false,
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            let totalStats = {};
            for (let key in this.props.stats) {
                if (typeof this.props.stats[key] !== "object")
                    totalStats[key] = this.props.stats[key];
            }
            let email = this.props.info.email;
            if (email) {
                let emailFirstPart = email.slice(0, 3);
                let emailLastPart = email.slice(email.indexOf('@'), email.length);
                email = emailFirstPart + "***" + emailLastPart;
            } else
                email = "email@gmail.com";


            this.setState({
                totalStats: { ...totalStats },
                completed: { ...this.props.stats.completed },
                email
            })
            this.calculateProgressPercent({ ...this.state.totalStats }, { ...this.state.completed })
        }
    }

    
    togglePasswordChangeForm = () => {
        this.setState({
            passwordFormVisible: !this.state.passwordFormVisible
        })
    }

    calculateProgressPercent = (totalStats, completed) => {
        let total = 0;
        let current = 0;
        for (let key in totalStats)
            total += totalStats[key];
        for (let key in completed)
            current += completed[key];
        if (total !== 0) {
            this.setState({
                progressPercent: Math.round(current / total * 100, 2),
            });
        }
    }

    changePassword = (formData) => {
        if (formData.password === formData['repeat-password']) 
            this.props.changePassword(formData.password);            
    }

    logout = () => {
        this.props.logout();
    }
    render() {
        return (
            <div className={s.selfInfo}>
                <div className={s.stats}>
                    <div>
                        <div className={s.statName}>Progress</div>
                        <div>{this.state.progressPercent} %</div>
                    </div>
                    <div className={s.statName}>
                        <div>Sections</div>
                        <div>{this.state.completed.sections_count} / {this.state.totalStats.sections_count}</div>
                    </div>
                    <div className={s.statName}>
                        <div>Lessons</div>
                        <div>{this.state.completed.article_count} / {this.state.totalStats.article_count}</div>
                    </div>
                    <div className={s.statName}>
                        <div>Tasks</div>
                        <div>{this.state.completed.task_count} / {this.state.totalStats.task_count}</div>
                    </div>

                </div>
                <div className={s.info}>
                    <div className={s.infoBlock}>
                        <div>
                            <div>Password</div>
                            <div>********</div>
                            <button onClick={this.togglePasswordChangeForm}>{this.state.passwordFormVisible ? "Cancel" : "Change"}</button>
                        </div>
                        {this.state.passwordFormVisible ? <ReduxPasswordResetForm onSubmit={this.changePassword} /> : null}
                    </div>
                    <div className={s.infoBlock}>
                        <div>
                            <div>Email</div>
                            <div>{this.state.email}</div>                           
                        </div>
                    </div>
                    <div className={s.buttonHolder}><button onClick={this.logout}>Logout</button></div>
                </div>
            </div>
        );
    }
}
export default SelfInfo;


const PasswordResetForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.resetForm}>
            <Field placeholder="Password" name={"password"} type="password" component="input" />
            <Field placeholder="Repeat password" name={"repeat-password"} type="password" component="input" />
            <button>Save password</button>
        </form>
    );
}

const ReduxPasswordResetForm = reduxForm({ form: 'password-reset' })(PasswordResetForm);
