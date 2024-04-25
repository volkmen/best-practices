import React from 'react';
import LocalizationSwitcher from '../LocalizationSwitcher';
import './HeaderLayout.scss';

const HeaderLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='flex'>
    <div className='header w-100'>{children}</div>
    <LocalizationSwitcher className='align-self-center' />
  </div>
);

export default HeaderLayout;
