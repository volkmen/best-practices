import React from 'react';
import Button, { ButtonSize, ButtonType } from '../Button';
import Text, { TextColor, TextSize } from '../Text';
import Separator from '../Separator';
import TextResourceContext from 'contexts/TextResource';

import './ConfirmModalBody.scss';

interface ConfirmModalBodyProps {
  title: string | React.ReactNode;
  onClose: () => void;
  onSubmit: () => Promise<unknown> | void;
  children: React.ReactNode;
  type?: 'delete';
}

const ConfirmModalBody: React.FC<ConfirmModalBodyProps> = ({ title, onSubmit, onClose, children, type }) => {
  const { getTextResourceByKey } = React.useContext(TextResourceContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickSubmit = React.useCallback(() => {
    setIsLoading(true);
    onSubmit()?.then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className='confirm-modal'>
      <Text size={TextSize.Md} color={TextColor.White} className='text-center mb-3 uppercase'>
        {title}
      </Text>
      <Separator className='mb-3' />
      <div className='mb-5'>{children}</div>
      <div className='flex-justify-end w-100'>
        <Button
          buttonType={ButtonType.Secondary}
          size={ButtonSize.SmallMedium}
          className='mr-3 uppercase'
          onClick={onClose}
        >
          {getTextResourceByKey('cancel')}
        </Button>
        <Button
          loading={isLoading}
          buttonType={type === 'delete' ? ButtonType.Danger : ButtonType.Success}
          size={ButtonSize.SmallMedium}
          onClick={onClickSubmit}
          className='uppercase'
        >
          {getTextResourceByKey('submit')}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModalBody;
