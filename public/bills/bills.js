/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
const token = localStorage.getItem('userToken');

if (!token) {
  window.location.replace('../login/index.html');
}
const signOutEl = document.getElementById('signOut');
const BASE_URL = 'http://localhost:3000';
const groupsId = window.location.search.split('=')[1];
const errorEl = document.querySelector('.error');
const tableEl = document.querySelector('.table');
const formEl = document.forms[0];
const amountInpEl = formEl.elements.amount;
const descriptionInpEl = formEl.elements.description;

signOutEl.addEventListener('click', () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userId');
});
async function getAcounts(endpoint) {
  try {
    // eslint-disable-next-line no-undef
    const { data } = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    generateTable(data.data, tableEl);
  } catch (error) {
    errorEl.textContent = 'something went wrong';
  }
}
getAcounts(`${BASE_URL}/bill/${groupsId}`);

function createOneTr(id, amount, description) {
  const trEl = document.createElement('tr');
  const tdIdEl = document.createElement('td');
  tdIdEl.textContent = id;
  const tdDescriptionEl = document.createElement('td');
  tdDescriptionEl.textContent = description;
  const tdAmountEl = document.createElement('td');
  tdAmountEl.textContent = `$${amount}`;
  trEl.append(tdIdEl, tdDescriptionEl, tdAmountEl);
  return trEl;
}
function generateTable(arr, dest) {
  dest.innerHTML = '';
  generateTh(dest);
  arr.forEach((obj) => {
    dest.append(createOneTr(obj.id, obj.amount, obj.description));
  });
}
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  postBill();
});

async function postBill() {
  try {
    // eslint-disable-next-line no-undef
    const { data } = await axios.post(
      `${BASE_URL}/bill`,
      { groupId: groupsId, amount: amountInpEl.value, description: descriptionInpEl.value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (data.success) {
      // eslint-disable-next-line no-alert
      alert('Group created successfully ');
      amountInpEl.value = '';
      descriptionInpEl.value = '';
      getAcounts(`${BASE_URL}/bill/${groupsId}`);
    }
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert('something went wrong');
  }
}
function generateTh(dest) {
  const trEl = document.createElement('tr');
  const thIdEl = document.createElement('th');
  thIdEl.textContent = 'ID';
  const thDescriptionEl = document.createElement('th');
  thDescriptionEl.textContent = 'Description';
  const thAmountEl = document.createElement('th');
  thAmountEl.textContent = 'Amount';
  trEl.append(thIdEl, thDescriptionEl, thAmountEl);
  dest.append(trEl);
}
