// eslint-disable-next-line import/no-mutable-exports
export let errorsArr = [];

export function clearErrorsArr() {
  errorsArr = [];
}

function addError(message, field) {
  errorsArr.push({
    message,
    field,
  });
}

function checkRequired(value, field) {
  if (value === '') {
    addError('this field is required', field);
    return true;
  }
  return false;
}

function checkMinLength(value, minLength, field) {
  if (value.length <= minLength) {
    addError(`length must be greater than ${minLength}`, field);
  }
}
function checkFullName(value, field) {
  if (!value.includes(' ')) {
    addError('must contain first name and last name', field);
    return false;
  }
  return true;
}
function checkEmail(value, field) {
  const splitedValue = value.split('@');
  if (splitedValue.length < 2) {
    addError('Email must have @', field);
    return false;
  }
  if (splitedValue[1].split('.').length < 2) {
    addError('Email must have for exsample "exsample.com"', field);
    return false;
  }

  return true;
}

export function checkInput(valueToCheck, field, rulesArr) {
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rulesArr) {
    if (rule === 'required') {
      if (checkRequired(valueToCheck, field)) {
        return;
      }
    }
    if (rule === 'positive') {
      if (valueToCheck < 0) {
        addError('must be positive', field);
        return;
      }
    }

    if (rule.split('-')[0] === 'minLength') {
      const min = rule.split('-')[1];
      checkMinLength(valueToCheck, min, field);
    }

    if (rule.split('-')[0] === 'maxLength') {
      const max = rule.split('-')[1];
      if (valueToCheck.length >= max) {
        addError(`Too long. Length must be less than ${max}`, field);
      }
    }
    if (rule === 'email') {
      if (checkEmail(valueToCheck, field)) {
        return;
      }
    }
    if (rule === 'fullName') {
      if (checkFullName(valueToCheck, field)) {
        return;
      }
    }
  }
}
