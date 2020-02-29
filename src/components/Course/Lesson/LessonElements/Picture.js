import React from 'react';
import s from './LessonElements.module.css';

import deleteIcon from '../../../../assets/images/delete.png'

class Picture extends React.Component {
    state = {
        media: "",
    }
    componentDidMount() {
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
        let propsMeida = this.props.media
        if (propsMeida === null)
            propsMeida = "";
        if (this.state.media !== propsMeida) {
            this.props.editElement(elementId, this.state.media);
        }
    }

    onTextChange = (e) => {
        let media = e.currentTarget.value;
        let length = 300;
        if (!media.includes('http')) {
            length = length - 7;
        }
        if (media.length < length)        
            this.setState({ media })
    }

    render() {
        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { this.deleteElement(this.props.id) }} /></div>
                        <div>
                            <i className="fa fa-caret-up" aria-hidden="true" onClick={()=>{this.props.changeElementPosition(this.props.id, this.props.is_answer, 0)}}></i>
                            <i className="fa fa-caret-down" aria-hidden="true" onClick={()=>{this.props.changeElementPosition(this.props.id, this.props.is_answer, 1)}}></i>
                        </div>
                        <h2>Picture</h2>
                    </div>
                    <input value={this.state.media} placeholder={"http://"} onChange={this.onTextChange} onBlur={() => { this.editElement(this.props.id) }} />
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
