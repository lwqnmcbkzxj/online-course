import React from 'react';
import s from './Media.module.css';

const Media = (props) => {
    let url = props.media;
    let defaultYTUrl = 'https://www.youtube.com/embed/';
    let videoID = '';

    if (props.media) {
        if (url.includes('watch'))            
            videoID = url.split('/')[3].split('=')[1];
        else if (url.includes('embed'))
            videoID = url.split('/')[4];
    }
    
    return (
        <div className = {s.media}>           
            <iframe src={defaultYTUrl + videoID} frameBorder="0" title="YT-video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>        
    );
}
export default Media;
