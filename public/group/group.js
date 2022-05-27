const gridEl = document.querySelector('.grid');
const BASE_URL = 'http://localhost:3000';

const token = localStorage.getItem('userToken');
const userId = localStorage.getItem('userId');
console.log('userId ===', userId);
if (!token) {
  window.location.replace('../login/index.html');
}

function createCard(id, name) {
  const cardEl = document.createElement('div');
  cardEl.className = 'card';
  const h3El = document.createElement('h3');
  h3El.textContent = `ID: ${id}`;
  const pEl = document.createElement('p');
  pEl.textContent = name;

  cardEl.append(h3El, pEl);
  return cardEl;
}

function generateCard(dest, arr) {
  dest.innerHTML = '';
  arr.forEach((tutObj) => {
    const card = createCard(tutObj.group_id, tutObj.name);
    dest.appendChild(card);
  });
}

async function fetchTutorials(endpoint) {
  try {
    const { data } = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    generateCard(gridEl, data.data);
  } catch (error) {
    console.log(error);
  }
}
fetchTutorials(`${BASE_URL}/accounts`);
