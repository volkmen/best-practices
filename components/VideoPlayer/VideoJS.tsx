import React from 'react';
import videojs from 'video.js';
import './VideoPlayer.scss';

export type Player = any;

interface VideoJSProps {
  options: any;
  onReady: (player: Player) => void;
}

const videoJsOptions = {
  autoplay: true,
  controls: true,
  responsive: true,
  fluid: true,
  bigPlayButton: false,
  html5: {
    hls: {
      withCredentials: true,
      overrideNative: true
    }
  }
};

const VideoJS: React.FC<VideoJSProps> = ({ options, onReady }) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<Player>(null);

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered', 'rounded-1');
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, { ...videoJsOptions, ...options }, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      }));

      videoElement.querySelector('.vjs-error-display')?.classList.add('rounded-1');

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);

      // player.one('load', () => {
      //   console.log('loaded');
      // });
      // onReady(player);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return <div ref={videoRef} />;
};

export default VideoJS;
