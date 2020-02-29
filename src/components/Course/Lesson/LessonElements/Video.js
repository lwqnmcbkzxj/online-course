import React from 'react';
import s from './LessonElements.module.css';

import deleteIcon from '../../../../assets/images/delete.png'

class Video extends React.Component {
    state = {
        media: "",
    }
    componentDidMount() {
        if (this.props.media && this.props.media.includes('youtu')) {
            let videoID = '';
            let media = this.props.media;
            if (media.includes('watch'))
                videoID = media.split('/')[3].split('=')[1];
            else if (media.includes('embed'))
                videoID = media.split('/')[4];
            else if (media.includes('youtu.be'))
                videoID = media.split('/')[3];


            this.setState({ media: videoID !== '' ? "https://www.youtube.com/embed/" + videoID : "" });
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
            this.props.editElement(elementId, this.state.media, this.props.type);
        }
    }

    onTextChange = (e) => {
        let media = e.currentTarget.value;

        if (media.length < 300)
            this.setState({ media })
    }
    render() {
        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader} >
                        <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { this.deleteElement(this.props.id) }} /></div>
                        <div>
                            <i className="fa fa-caret-up" aria-hidden="true" onClick={() => { this.props.changeElementPosition(this.props.id, this.props.is_answer, 0) }}></i>
                            <i className="fa fa-caret-down" aria-hidden="true" onClick={() => { this.props.changeElementPosition(this.props.id, this.props.is_answer, 1) }}></i>
                        </div>

                        <h2>Video</h2>
                    </div>
                    <input value={this.state.media} placeholder={"http://"} onChange={this.onTextChange} onBlur={() => { this.editElement(this.props.id) }} />
                </div>
                : this.state.media ?
                    <div className={s.videoBlock}>
                        <div className={s.video}>
                            <iframe src={this.state.media} frameBorder="0" title="YT-video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                    : null
        )
    }
}
export default Video;