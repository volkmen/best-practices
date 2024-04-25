import React from 'react';
import { PageRoutes, UsersRole } from 'types';
import { Link, useLocation } from 'react-router-dom';
import Text, { TextSize } from 'components/Text';
import classNames from 'classnames';
import TextResourceContext from 'contexts/TextResource';
import { useSelector } from 'react-redux';
import { getAuthRole } from 'store/authReducer';

import './Navbar.scss';

const pages = [
  {
    title: 'dashboard',
    route: PageRoutes.Dashboard
  },
  {
    title: 'map',
    route: PageRoutes.Map
  },
  {
    title: 'vms',
    route: PageRoutes.VMS
  },
  {
    title: 'events',
    route: PageRoutes.Events
  },
  {
    title: 'admin',
    route: PageRoutes.AdminPanel,
    rolesPermission: [UsersRole.Admin, UsersRole.SuperAdmin]
  }
];

const getIsPageDynamic = (pathName: string, route: string) =>
  pathName.indexOf(route) === 0 && pathName[route.length] === '/';

const Navbar = () => {
  const location = useLocation();
  const { getTextResourceByKey } = React.useContext(TextResourceContext);
  const role = useSelector(getAuthRole);

  return (
    <div className='navbar'>
      {pages.map(page =>
        !page.rolesPermission || page.rolesPermission.includes(role as UsersRole) ? (
          <Link to={page.route} key={page.title}>
            <Text
              className={classNames('navbar__item', { 'is-selected': location.pathname === page.route })}
              size={TextSize.Md}
            >
              {getTextResourceByKey(page.title)}
            </Text>
          </Link>
        ) : null
      )}
      {getIsPageDynamic(location.pathname, PageRoutes.Stations) && (
        <Text className={classNames('navbar__item is-selected pointer-events-none')} size={TextSize.Md}>
          {getTextResourceByKey('stationData')}
        </Text>
      )}
      {getIsPageDynamic(location.pathname, PageRoutes.Settings) && (
        <Text className={classNames('navbar__item is-selected pointer-events-none')} size={TextSize.Md}>
          {getTextResourceByKey('settings')}
        </Text>
      )}
    </div>
  );
};

export default Navbar;
