import React from 'react';
import s from './LessonElements.module.css';

import deleteIcon from '../../../../assets/images/delete.png'

class Picture extends React.Component {
    state = {
        media: "",
    }
    componentDidMount(prevProps) {
        if (this.props.media) {
            let pictureUrl = this.props.media;

            if (!pictureUrl.includes('http'))
                pictureUrl = 'http://' + pictureUrl;
            this.setState({ media: pictureUrl });
        }
        else
            this.setState({ media: "" });
    }
    deleteElement = (elementId) => {
        this.props.deleteElement(elementId);
    }

    editElement = (elementId) => {
        this.props.editElement(elementId, this.state.media);
    }

    onTextChange = (e) => {
        this.setState({
            media: e.currentTarget.value
        })
    }

    render() {
        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { this.deleteElement(this.props.id) }} /></div>
                        <div>
                            <i className="fa fa-caret-up" aria-hidden="true" onClick={()=>{this.props.changeElementPosition(this.props.lesson_position, this.props.is_answer, 0)}}></i>
                            <i className="fa fa-caret-down" aria-hidden="true" onClick={()=>{this.props.changeElementPosition(this.props.lesson_position, this.props.is_answer, 1)}}></i>
                        </div>
                        <h2>Picture</h2>
                    </div>
                    <input defaultValue={this.state.media} placeholder={"http://"} onChange={this.onTextChange} onBlur={() => { this.editElement(this.props.id) }} />
                </div>
                : this.state.media ?
                    <div className={s.picture}>
                        <img src={this.state.media} alt="pictureBlockImage" />
                    </div>
                    : null
        )
    }
}
export default Picture;
