// eslint-disable-next-line import/extensions
import { clearErrorsArr, errorsArr, checkInput } from '../modules/validation.js';

const BASE_URL = 'http://localhost:3000';
const formEl = document.forms[0];

const errSpanEl = document.querySelectorAll('.errorSpan');
const errh3El = document.querySelector('.err');

const emailInpEL = formEl.elements.email;
const passwordInpEL = formEl.elements.password;
const repPasswordInpEl = formEl.elements.repPassword;
const fullNameInpEl = formEl.elements.full_name;

function clearErrors() {
  clearErrorsArr();

  errSpanEl.forEach((htmlElement) => {
    // eslint-disable-next-line no-param-reassign
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
function handleError(msg) {
  errSpanEl.textContent = '';
  if (msg === false) {
    // eslint-disable-next-line no-param-reassign
    msg = 'This email is already in use by another user';
    errh3El.textContent = msg;
    return;
  }
  if (typeof msg === 'string') {
    errSpanEl.forEach((elements) => {
      // eslint-disable-next-line no-param-reassign
      elements.textContent = msg;
      elements.previousElementSibling.classList.add('invalid-input');
    });
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}

fullNameInpEl.addEventListener('blur', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'fullName']);
  handleError(errorsArr);
});
emailInpEL.addEventListener('blur', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'email']);
  handleError(errorsArr);
});

passwordInpEL.addEventListener('blur', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'maxLength-10']);
  handleError(errorsArr);
});

repPasswordInpEl.addEventListener('blur', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'maxLength-10']);
  handleError(errorsArr);
});

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const logInInfo = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    name: formEl.elements.full_name.value.trim(),
  };

  clearErrors();

  checkInput(logInInfo.email, 'email', ['required', 'minLength-4', 'email']);
  checkInput(logInInfo.password, 'password', ['required', 'minLength-4', 'maxLength-10']);
  checkInput(repPasswordInpEl.value, 'repPassword', ['required', 'minLength-4', 'maxLength-10']);
  checkInput(fullNameInpEl.value, 'full_name', ['required', 'minLength-4']);
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }

  if (logInInfo.password !== repPasswordInpEl.value) {
    handleError([
      { message: 'Passwords do not match', field: 'password' },
      { message: 'Password does not match', field: 'repPassword' },
    ]);
    return;
  }

  try {
    // eslint-disable-next-line no-undef
    const { data } = await axios.post(`${BASE_URL}/registration`, logInInfo);

    if (data.success) {
      // eslint-disable-next-line no-alert
      alert(data.msg);
      window.location.replace('../login/index.html');
    }
  } catch (error) {
    console.log('error ===', error);
    handleError(error.response.data.success);
  }
});
