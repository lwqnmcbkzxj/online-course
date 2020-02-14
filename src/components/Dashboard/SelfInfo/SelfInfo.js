import React from 'react';
import s from './SelfInfo.module.css';
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
        progressPercent: 100
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            let totalStats = {};
            for (let key in this.props.stats) {
                if (typeof this.props.stats[key] !== "object")
                    totalStats[key] = this.props.stats[key];
            }

            this.setState({
                totalStats: { ...totalStats },
                completed: { ...this.props.stats.completed }
            })
            this.calculateProgressPercent({ ...this.state.totalStats }, { ...this.state.completed })
        }
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

    changeEmail() {

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
                    <div>
                        <div>Password</div>
                        <div>********</div>
                        <button>Change</button>
                    </div>
                    <div>
                        <div>Email</div>
                        <div>{this.props.info.email}</div>
                        <button onClick={this.changeEmail}>Change</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default SelfInfo;
