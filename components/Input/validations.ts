import urlRegex from 'url-regex';

export const emptyFieldValidationError = (val: string | number) => {
  if (val === '' || !val) {
    return 'fieldCanNotBeEmpty';
  }

  return null;
};

export const urlValidationError = (val: string | number) => {
  if (!urlRegex().test(val.toString())) {
    return 'isNotUrl';
  }

  return null;
};

export const numberValidationError = (val: string | number) =>
  val.toString().match('[+-]?([0-9]*[.])?[0-9]+') ? null : 'isNotNumber';

export const optionalPortValidation = (val: number | string) => portValidation(val, false);

export const portValidation = (val: number | string, valIsRequired = true) => {
  if (!valIsRequired && !val) {
    return null;
  }

  return val
    .toString()
    .match('^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$')
    ? null
    : 'isNotPortNumber';
};

export const coordinateValidationError = (val: string | number) => {
  const numberValidError = numberValidationError(val);

  if (numberValidError) {
    return 'notValidCoord';
  }
  const valAsNumber = +val;

  return valAsNumber <= 180 && valAsNumber >= -180 ? null : 'notValidCoord';
};

export const passwordValidation = (val: string | number) =>
  /^(?!.*[\s])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/.test(val as string) ? null : 'passwordValidation';

export const ipValidation = (val: string | number) =>
  /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}(?::\d{0,4})?\b$/.test(val.toString()) ? null : 'ipValidation';
