const cards = [];
let cardZIndex = 1;

// Elements
const addBtn = document.getElementById('addBtn');
const popup = document.getElementById('popup');
const cardContainer = document.getElementById('cardContainer');
const doneBtn = document.getElementById('done-btn');

// Create Card Element
function createCard(imageSrc, isLoyalty) {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.zIndex = cardZIndex++;
  card.style.transform = `translateY(${cardZIndex * 12}px)`;

  const img = document.createElement('img');
  img.src = imageSrc;
  card.appendChild(img);

  // Add to appropriate position
  if(isLoyalty) {
    cards.push(card);
  } else {
    cards.unshift(card);
  }
  
  cardContainer.append(...cards.map(c => {
    c.style.transform = `translateY(${(cards.indexOf(c) + 1) * 12}px)`;
    return c;
  }));

  // Click Handler
  card.addEventListener('click', () => {
    document.querySelectorAll('.card').forEach(c => c.style.display = 'none');
    card.style.display = 'block';
    card.classList.add('active');
    document.querySelector('header').style.display = 'none';
    doneBtn.classList.add('visible');
  });
}

// Image Upload Handler
function handleImageUpload(isLoyalty) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => createCard(reader.result, isLoyalty);
    reader.readAsDataURL(file);
  };
  input.click();
}

// Event Listeners
addBtn.addEventListener('click', () => popup.classList.add('visible'));

document.getElementById('addCreditBtn').addEventListener('click', () => {
  popup.classList.remove('visible');
  handleImageUpload(false);
});

document.getElementById('addLoyaltyBtn').addEventListener('click', () => {
  popup.classList.remove('visible');
  handleImageUpload(true);
});

document.getElementById('cancelBtn').addEventListener('click', () => {
  popup.classList.remove('visible');
});

doneBtn.addEventListener('click', () => {
  document.querySelectorAll('.card').forEach(c => {
    c.style.display = 'block';
    c.classList.remove('active');
  });
  document.querySelector('header').style.display = 'flex';
  doneBtn.classList.remove('visible');
});
