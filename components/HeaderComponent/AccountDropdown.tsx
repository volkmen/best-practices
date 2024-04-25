import React, { PropsWithChildren } from 'react';
import RCTooltip from 'rc-tooltip';
import MenuDropdown from '../MultiSelect/MenuDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData, signOut } from 'store/authReducer';
import { AppDispatch } from 'store/types';
import ChangeLanguage from './ChangeLanguage';
import TextResourceContext from 'contexts/TextResource';
import Text, { TextColor } from '../Text/Text';
import { ROLES_MAP } from 'consts';
import { ModalContext } from 'contexts/ModalContext';
import ChangePasswordModal from 'modals/ChangePasswordModal';
import { PageRoutes } from 'types';
import { useNavigate } from 'react-router-dom';

const AccountDropdown: React.FC<PropsWithChildren> = () => {
  const [isCloseForce, setIsCloseForce] = React.useState(false);
  const authData = useSelector(getAuthData);
  const dispatch = useDispatch() as AppDispatch;
  const { getTextResourceByKey } = React.useContext(TextResourceContext);
  const { openModal, closeModal } = React.useContext(ModalContext);
  const navigate = useNavigate();

  const forceCloseDropdown = () => {
    setIsCloseForce(true);

    setTimeout(() => {
      setIsCloseForce(false);
    });
  };

  const logout = () => {
    dispatch(signOut());
  };

  const onChanePassword = () => {
    forceCloseDropdown();
    openModal(<ChangePasswordModal closeModal={closeModal} />);
  };

  const gotoAccountPage = () => {
    navigate(PageRoutes.Account);
  };

  const options = [
    {
      value: 'settings',
      label: <div className='text-uppercase'>{getTextResourceByKey('settings')}</div>,
      onClick: gotoAccountPage
    },
    {
      value: 'changePassword',
      label: <div className='text-uppercase'>{getTextResourceByKey('changePassword')}</div>,
      onClick: onChanePassword
    },
    {
      value: 'language',
      label: <ChangeLanguage />
    },
    {
      value: 'sign_out',
      label: <div className='text-uppercase'>{getTextResourceByKey('signOut')}</div>,
      onClick: logout
    }
  ];

  const overlay = <MenuDropdown options={options} theme='light' />;

  if (!authData) {
    return null;
  }

  const rolesValue = ROLES_MAP[authData.role] || authData.role;

  return (
    <RCTooltip
      {...(isCloseForce ? { visible: false } : {})}
      overlay={overlay}
      placement='bottomLeft'
      destroyTooltipOnHide={true}
      showArrow={false}
      mouseLeaveDelay={0.5}
      mouseEnterDelay={0.5}
    >
      <div className='text-center cursor-pointer'>
        <div className='mb-1'>{authData?.name}</div>
        <Text color={TextColor.Success} className='text-uppercase'>
          {getTextResourceByKey(rolesValue)}
        </Text>
      </div>
    </RCTooltip>
  );
};

export default AccountDropdown;
