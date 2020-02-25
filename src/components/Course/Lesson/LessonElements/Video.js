import React from 'react';
import s from './LessonElements.module.css';

import moveIcon from '../../../../assets/images/move.svg'
import deleteIcon from '../../../../assets/images/delete.png'

class Video extends React.Component {
    state = {
        media: "",
    }
    componentDidMount() {
        if (this.props.media.includes('youtube')) {
            let videoID = '';

            let media = this.props.media;
            if (media.includes('watch'))
                videoID = media.split('/')[3].split('=')[1];
            else if (media.includes('embed'))
                videoID = media.split('/')[4];

            this.setState({ media: videoID !== '' ? "https://www.youtube.com/embed/" + videoID : "" });
        }
        else
            this.setState({ media: "" });
    }
    componentDidUpdate() {
        
    }

    deleteElement = (elementId) => {
        this.props.deleteElement(elementId);
    }

    editElement = (elementId) => {
        this.props.editElement(elementId, this.state.media, this.props.type);
    }

    onTextChange = (e) => {
        this.setState({
            media: e.currentTarget.value
        })
    }
    render() {
        if (this.props.editMode) {
            const { isDragging, connectDragSource, connectDragPreview, connectDropTarget, editMode, find, move, change, ...restProps } = this.props
            const opacity = isDragging ? 0.5 : 1;
            return(
            // connectDropTarget(
                // connectDragPreview(
                    <div>
                        <div className={s.elementHeader} style={{ 'opacity': opacity }} >
                            <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { this.deleteElement(this.props.id) }} /></div>
                            {/* {connectDragSource(<div className="icon move"><img src={moveIcon} alt="moveIcon" /></div>)} */}
                            <h2>Video</h2>
                        </div>
                        <input defaultValue={this.state.media} placeholder={"http://"} onChange={this.onTextChange} onBlur={() => { this.editElement(this.props.id) }} />
                    </div>
                // )
            )
        } else {
            return this.state.media ?
                <div className={s.video}>
                    <iframe src={this.state.media} frameBorder="0" title="YT-video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                : null
        }
    }
}
export default Video;