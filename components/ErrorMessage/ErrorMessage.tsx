import React from 'react';
import { GiTerror } from 'react-icons/gi';
import Text, { TextColor } from '../Text';
import { StyledComponent } from 'types';
import classNames from 'classnames';
import { COLORS } from 'consts';

interface ErrorMessageProps extends StyledComponent {
  message?: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className, message }) => (
  <div className={classNames('w-100 flex-column flex-align-center flex-justify-center', className)}>
    <GiTerror color={COLORS.danger} size={100} className='mb-3' />
    <Text color={TextColor.Danger}>{message}</Text>
  </div>
);

export default ErrorMessage;
