import React from 'react';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const YoutubePlayer = ({ url, title }) => {

    function getYouTubeVideoId(youtubeUrl) {
        const urlParams = new URLSearchParams(new URL(youtubeUrl).search);
        return urlParams.get("v")
    }

    const videoId = getYouTubeVideoId(url)


    return (
        <div>
            <LiteYouTubeEmbed
                id={videoId}
                title={title}
                playerClass="lty-playbtn"
            />
        </div>
    );
};

export default YoutubePlayer