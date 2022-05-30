/* eslint-disable comma-dangle */
const token = localStorage.getItem('userToken');

if (!token) {
  window.location.replace('../login/index.html');
}
const signOutEl = document.getElementById('signOut');
const gridEl = document.querySelector('.grid');
const errorEl = document.querySelector('.error');
const BASE_URL = 'http://localhost:3000';
const newGroupFormEl = document.querySelector('.newGroupForm');
const inpEl = document.getElementById('groupName');
const selectFormEl = document.querySelector('.selectForm');
const selectgroupEl = document.getElementById('group');

signOutEl.addEventListener('click', () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userId');
});
// getting accounts ========================================================
function createCard(id, name) {
  const cardEl = document.createElement('div');
  cardEl.className = 'card';
  cardEl.addEventListener('click', () => {
    window.location.replace(`../bills/bills.html?id=${id}`);
  });
  const h3El = document.createElement('h3');
  h3El.textContent = `ID: ${id}`;
  const pEl = document.createElement('p');
  pEl.textContent = name;

  cardEl.append(h3El, pEl);
  return cardEl;
}

function generateCard(dest, arr) {
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = '';
  arr.forEach((tutObj) => {
    const card = createCard(tutObj.group_id, tutObj.name);
    dest.appendChild(card);
  });
}

async function getAcounts(endpoint) {
  try {
    // eslint-disable-next-line no-undef
    const { data } = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    generateCard(gridEl, data.data);
  } catch (error) {
    errorEl.textContent = 'something went wrong';
  }
}
// gen option=========================================================
function generateOptions(dest, arr) {
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = '';

  arr.forEach((optionObj) => {
    const option = document.createElement('option');

    option.value = optionObj.id;

    option.textContent = optionObj.name;

    dest.appendChild(option);
  });
}
getAcounts(`${BASE_URL}/accounts`);

async function getGroups(endpoint, dest) {
  try {
    // eslint-disable-next-line no-undef
    const { data } = await axios(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      generateOptions(dest, data.data);
    }
  } catch (error) {
    console.log('something went wrong');
  }
}
// add newgroup =======================================================
newGroupFormEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    // eslint-disable-next-line no-undef
    const { data } = await axios.post(
      `${BASE_URL}/groups`,
      { name: inpEl.value },
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
      inpEl.value = '';

      getAcounts(`${BASE_URL}/accounts`);
      getGroups(`${BASE_URL}/groups`, selectgroupEl);
    }
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert('something went wrong');
  }
});
// add accounts ===================================================================
selectFormEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    // eslint-disable-next-line no-undef
    const { data } = await axios.post(
      `${BASE_URL}/accounts`,
      { groupId: selectgroupEl.value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (data.success) {
      getAcounts(`${BASE_URL}/accounts`);
      getGroups(`${BASE_URL}/groups`, selectgroupEl);
    }
  } catch (error) {
    console.log('something went wrong');
  }
});

getGroups(`${BASE_URL}/groups`, selectgroupEl);
