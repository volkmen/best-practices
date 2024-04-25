import React from 'react';
import Text, { TextColor, TextSize } from '../Text';
import dayjs from 'dayjs';

interface ToastNotificationProps {
  title: string;
  message: React.ReactNode;
  description?: React.ReactNode;
  type: 'success' | 'error';
  date: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  title,
  message,
  description,
  date,
  type = 'success'
}) => (
  <div>
    <div className='d-flex justify-content-between w-100 gap-3'>
      <Text className='mb-2' color={type === 'success' ? TextColor.Success : TextColor.Danger} size={TextSize.Sm}>
        {title}
      </Text>
      <Text color={TextColor.Dark} size={TextSize.XSm} className='text-underline no-white-space'>
        {dayjs(new Date(date)).format('HH:mm')}
      </Text>
    </div>

    <Text className='mb-1' color={TextColor.Dark} size={TextSize.XSm}>
      {message}
    </Text>
    <Text size={TextSize.XSm}>{description}</Text>
  </div>
);

export default ToastNotification;
