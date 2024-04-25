import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { StyledComponent } from 'types';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import Text, { TextColor, TextSize } from '../Text';
import TextResourceContext from 'contexts/TextResource';
import { emptyFieldValidationError } from './validations';

import './Input.scss';

// @ts-ignore
interface InputProps extends StyledComponent, InputHTMLAttributes<HTMLInputElement> {
  value?: string | number;
  onSetValue: (val: string) => void;
  wrapperClassName?: string;
  validations?: ((val: string | number) => string | null)[];
  withEmptyStringValidation?: boolean;
  label?: string | React.ReactNode;
  labelClassName?: string;
  onSetError?: (err: string) => void;
  setValidationCb?: (validFn: () => string | null) => void;
  onFocus?: () => void;
  size?: TextSize;
}

const Input: React.FC<InputProps> = ({
  value = '',
  onSetValue,
  className,
  type,
  wrapperClassName,
  onSetError,
  validations = [],
  label,
  labelClassName,
  setValidationCb,
  size,
  withEmptyStringValidation = true,
  onFocus: onFocusProps,
  ...attrs
}) => {
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const { getTextResourceByKey } = React.useContext(TextResourceContext);

  const onChangePasswordVisibility = React.useCallback(() => {
    setPasswordIsVisible(val => !val);
  }, []);

  const onChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (errorMessage) {
        setErrorMessage('');
      }
      onSetValue(e.target.value);
    },
    [errorMessage]
  );

  const checkValidation = React.useCallback(() => {
    const updatedValidations = withEmptyStringValidation ? [...validations, emptyFieldValidationError] : validations;
    const errorMsgFn = updatedValidations.find(validation => validation(value));

    if (errorMsgFn) {
      const errorMsg = errorMsgFn(value);

      if (errorMsg) {
        const localizedMsg = getTextResourceByKey(errorMsg) as string;

        setErrorMessage(localizedMsg);
        onSetError?.(localizedMsg);
      }

      return errorMsg;
    }

    return null;
  }, [value, validations]);

  const onBlur = React.useCallback(() => {
    checkValidation();
    setIsFocused(false);
  }, [checkValidation]);

  const onFocus = React.useCallback(() => {
    setIsFocused(true);
    onFocusProps?.();
  }, []);

  React.useMemo(() => {
    setValidationCb?.(checkValidation);
  }, [checkValidation]);

  return (
    <div className={classNames('input-wrapper', wrapperClassName)}>
      <div className='d-flex align-items-center w-100'>
        {label && <span className={classNames('mr-4 capitalize no-white-space', labelClassName)}>{`${label}: `}</span>}
        <div className='w-100'>
          <input
            className={classNames('input', className, { 'is-error': errorMessage }, size && `size-${size}`)}
            value={value}
            onChange={onChange}
            type={passwordIsVisible ? 'text' : type}
            onBlur={onBlur}
            onFocus={onFocus}
            readOnly={type === 'password' && !isFocused}
            {...attrs}
          />
          {errorMessage && (
            <Text color={TextColor.Danger} size={TextSize.Sm} className='input__error'>
              {errorMessage}
            </Text>
          )}
        </div>
      </div>
      {type === 'password' && (
        <ReactSVG
          src={`${process.env.PUBLIC_URL}/eye${passwordIsVisible ? 'opened' : 'closed'}.svg`}
          className='input__eye'
          onClick={onChangePasswordVisibility}
        />
      )}
    </div>
  );
};

export default React.memo(Input);
