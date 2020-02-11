import React from 'react';
import s from './LessonElements.module.css';

const Media = (props) => {
    let url = props.media ? props.media : '';
    let videoID = '';
    if (url.includes('youtube')) {

        if (url.includes('watch'))
            videoID = url.split('/')[3].split('=')[1];
        else if (url.includes('embed'))
            videoID = url.split('/')[4];


        url = videoID !== '' ? "https://www.youtube.com/embed/" + videoID : null;
    }






    return (

        url ?
            <div className={s.videoBlock}>
                <h2>{props.text}</h2>
                <div className={s.video}>
                    <iframe src={url} frameBorder="0" title="YT-video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            : null

    );
}
export default Media;
