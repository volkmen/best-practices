import React from 'react';
import Text, { TextColor, TextSize } from 'components/Text';
import { useDispatch } from 'react-redux';
import { COLORS } from 'consts';
import TextResourceContext from 'contexts/TextResource';
import Navbar from './Navbar';
import ButtonIcon from '../ButtonIcon';
import { ButtonType } from '../Button';
import { refreshStationsAction } from 'store/stationsReducer';
import { AppDispatch } from 'store/types';
import useGetNextTimeUpdate from 'hooks/useGetNextTimeUpdate';
import { RxReload } from 'react-icons/rx';
import './HeaderComponent.scss';
import AccountDropdown from './AccountDropdown';

interface HeaderComponentProps {
  logoSrc?: string;
  extraComponent?: React.ReactNode;
  logo?: React.ReactNode;
}

const ICON_SIZE = 20;

const HeaderComponent: React.FC<HeaderComponentProps> = ({ extraComponent, logo }) => {
  const { getTextResourceByKey } = React.useContext(TextResourceContext);
  const dispatch = useDispatch() as AppDispatch;
  const nextTimeToUpdate = useGetNextTimeUpdate();

  const refreshStations = React.useCallback(() => {
    dispatch(refreshStationsAction());
  }, []);

  return (
    <div className='mb-2'>
      <div className='header-component layout-width'>
        <div className='d-flex align-items-center'>
          {logo}
          <Navbar />
        </div>
        <div className='d-flex'>
          <div className='mr-3 align-self-center'>{extraComponent}</div>
          <div className='mr-3 text-center'>
            <Text color={TextColor.HalfLight} className='mb-1'>
              {getTextResourceByKey('nextUpdate')}
            </Text>
            <Text size={TextSize.Md}>{`${nextTimeToUpdate.min}:${nextTimeToUpdate.sec}`}</Text>
          </div>
          <ButtonIcon buttonType={ButtonType.Secondary} className='mr-3' onClick={refreshStations}>
            <RxReload size={ICON_SIZE} color={COLORS.black} />
          </ButtonIcon>

          <div className='d-flex align-items-center'>
            <AccountDropdown />
          </div>
        </div>
      </div>
      <div className='header-placeholder' />
    </div>
  );
};

export default HeaderComponent;
