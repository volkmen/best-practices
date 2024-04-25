import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoJS, { Player } from './VideoJS';
import Spinner from '../Spinner';
import { StyledComponent } from '../../types';
import classNames from 'classnames';

interface VideoPlayerProps extends StyledComponent {
  src: string;
  autoplay?: boolean;
  spinnerSize?: 'sm' | 'md';
}

const spinnerStyleSm = {
  transform: 'scale(0.45)'
};

const spinnerStyleMd = {
  transform: 'scale(0.65)'
};

const spinnerStylesMap = {
  sm: spinnerStyleSm,
  md: spinnerStyleMd
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, autoplay, spinnerSize = 'md', className }) => {
  const playerRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const videoJsOptions = React.useMemo(
    () => ({
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      html5: {
        hls: {
          withCredentials: true,
          overrideNative: true
        }
      },
      sources: [
        {
          src: src,
          type: 'video/mp4'
        }
      ]
    }),
    [src]
  );

  React.useEffect(() => {
    setIsLoading(true);
  }, [src]);

  const handlePlayerReady = React.useCallback((player: Player) => {
    playerRef.current = player;
    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('loadeddata', () => {
      videojs.log('player is loadeddata');
      setIsLoading(false);
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });

    player.on('load', () => {
      if (autoplay) {
        player.play();
      }
      videojs.log('player is ready');
    });
  }, []);

  return (
    <div className={classNames('relative', className)}>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      {isLoading && (
        <div className='absolute-centered'>
          <Spinner style={spinnerStylesMap[spinnerSize]} isFullSize={false} />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
