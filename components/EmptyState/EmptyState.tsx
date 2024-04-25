import React from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';
import Text, { TextColor } from '../Text';
import TextResourceContext from 'contexts/TextResource';
import { StyledComponent } from 'types';
import classNames from 'classnames';
import { COLORS } from 'consts';

const style = { minHeight: '500px' };

const EmptyState: React.FC<StyledComponent> = ({ className }) => {
  const { getTextResourceByKey } = React.useContext(TextResourceContext);

  return (
    <div className={classNames('w-100 flex-column flex-align-center flex-justify-center', className)} style={style}>
      <RiEmotionSadLine color={COLORS.warning} size={100} className='mb-3' />
      <Text color={TextColor.Warning}>{getTextResourceByKey('emptyState')}</Text>
    </div>
  );
};

export default EmptyState;
