import React, { useEffect, useRef } from 'react';
import { render } from "react-dom";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const YoutubePlayer = ({ url, title }) => {

    function getYouTubeVideoId(youtubeUrl) {
        const urlParams = new URLSearchParams(new URL(youtubeUrl).search);
        return urlParams.get("v");
    }

    const videoId = getYouTubeVideoId(url);


    /*  const playerRef = useRef(null);
     const playerContainerId = `youtube-player-${index}`;
     useEffect(() => {
         try {
             if (videoId) {
                 const player = new window.YT.Player(playerContainerId, {
                     height: '115',
                     width: '160',
                     videoId: videoId,
                 });
             }
         } catch (error) {
             console.error('Error al cargar el reproductor de YouTube:', error);
         }
 
         return () => {
             if (playerRef.current) {
                 playerRef.current.destroy();
             }
         };
     }, [videoId, playerContainerId]);
  */


    return (
        <div>
            <LiteYouTubeEmbed
                id={videoId}
                title={title}
            />
        </div>
    );
};

export default YoutubePlayer