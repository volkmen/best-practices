import React from 'react';
import { useBoolean } from 'usehooks-ts';
import Input from '../Input';
import Text, { TextProps } from './Text';
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { COLORS } from 'consts';
import classNames from 'classnames';

interface EditableTextProps extends TextProps {
  initialText: string | number;
  onConfirm: (text: string | number) => void;
  wrapperClassname?: string;
  iconSize?: number;
}

const EditableText: React.FC<EditableTextProps> = ({
  initialText,
  iconSize,
  onConfirm,
  wrapperClassname,
  ...textProps
}) => {
  const { value: isEditMode, setTrue: setEditMode, setFalse: setEditModeFalse } = useBoolean(false);
  const [text, setText] = React.useState<string | number>(initialText);

  const onSubmit = React.useCallback(() => {
    onConfirm(text);
    setEditModeFalse();
  }, [text]);

  const onDecline = React.useCallback(() => {
    setText(initialText);
    setEditModeFalse();
  }, [initialText]);

  return (
    <div className={classNames('editable-text', wrapperClassname)}>
      {isEditMode ? (
        <div className='flex'>
          <Input
            value={text}
            onSetValue={setText}
            size={textProps.size}
            className='editable-text__input mr-3'
            withEmptyStringValidation={false}
          />
          <div>
            <AiOutlineClose color={COLORS.danger} className='cursor-pointer' onClick={onDecline} size={iconSize} />
            <AiOutlineCheck color={COLORS.success} className='cursor-pointer' onClick={onSubmit} size={iconSize} />
          </div>
        </div>
      ) : (
        <div className='editable-text__text'>
          <Text {...textProps} className='mr-3'>
            {text}
          </Text>
          <AiOutlineEdit color={COLORS.warning} onClick={setEditMode} size={iconSize} />
        </div>
      )}
    </div>
  );
};

export default React.memo(EditableText);
