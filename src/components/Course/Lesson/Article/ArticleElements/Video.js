import React from 'react';
import s from './ArticleElements.module.css';

class Video extends React.Component {
    state = {
        media: "",
    }
    componentDidMount(prevProps) {
        this.setState({ media: this.props.media });

            //     if (this.state.media.includes('youtube')) {
            //         let videoID = '';

            //         if (this.state.media.includes('watch'))
            //             videoID = this.state.media.split('/')[3].split('=')[1];
            //         else if (this.state.media.includes('embed'))
            //             videoID = this.state.media.split('/')[4];

            //         this.setState({ media: videoID !== '' ? "https://www.youtube.com/embed/" + videoID : "" });
            //     }
            // }
            // else
            //     this.setState({ media: "" });
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
        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.deleteElement(this.props.id) }}></i>
                        <i className="fa fa-arrows" aria-hidden="true"></i>
                        <h2>Video</h2>
                    </div>
                    <input defaultValue={this.state.media} placeholder={"http://"} onChange={this.onTextChange} onBlur={()=>{this.editElement(this.props.id)}}/>
                </div>
                : this.state.media ?
                    <div className={s.video}>
                        <iframe src={this.state.media} frameBorder="0" title="YT-video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    : null
        );
    }
}
export default Video;