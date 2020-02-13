import React from 'react';
import s from './LessonElements.module.css';

class Picture extends React.Component {
    state = {
        media: "",
    }
    componentDidUpdate(prevProps) {
        if (this.props.media !== prevProps.media) {
            if (this.props.media !== null) {
                this.setState({ media: this.props.media });
            }
            else
                this.setState({ media: "" });
        }
    }
    deleteElement = (position) => {
        this.props.deleteElement(position);
    }
    render() {
        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.deleteElement(this.props.id) }}></i>
                        <i className="fa fa-arrows" aria-hidden="true"></i>
                        <h2>Picture</h2>
                    </div>
                    <input defaultValue={this.state.media} placeholder={"http://"} />
                </div>
                : this.state.media ?
                    <div className={s.picture}>
                        <img src={s.media} />
                    </div>
                    : null
        );
    }
}
export default Picture;
