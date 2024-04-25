import React from 'react';
import { BsCameraVideoOff } from 'react-icons/bs';
import { COLORS } from 'consts';

interface VideoPlayerPlaceholderProps {
  children?: React.ReactNode;
}

const VideoPlayerPlaceholder: React.FC<VideoPlayerPlaceholderProps> = ({ children }) => (
  <div className='w-100 h-100 relative d-flex align-items-center flex-justify-center relative'>
    <BsCameraVideoOff size={100} color={COLORS.gray} />
    {children}
  </div>
);

export default VideoPlayerPlaceholder;
