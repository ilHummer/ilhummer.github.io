document.addEventListener('DOMContentLoaded', () => {
  const disclaimerModal = document.getElementById('disclaimerModal');
  const welcomeModal = document.getElementById('welcomeModal');
  const acknowledgeBtn = document.getElementById('acknowledgeBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const slideImage = document.getElementById('slideImage');
  const slideText = document.getElementById('slideText');
  const cardDetailModal = document.getElementById('cardDetailModal');
  const cardDetailImage = document.getElementById('cardDetailImage');
  const doneBtn = document.getElementById('doneBtn');
  const cardContainer = document.getElementById('cardContainer');

  const slides = [
    { text: "Welcome to Wallet Prank!", img: "slide1.png" },
    { text: "Add your own cards easily.", img: "slide2.png" },
    { text: "Tap on a card to view details.", img: "slide3.png" },
    { text: "Delete all cards with the menu.", img: "slide4.png" },
    { text: "Your cards are saved locally.", img: "slide5.png" },
    { text: "Enjoy the experience!", img: "slide6.png" }
  ];

  let currentSlide = 0;

  function showModal(modal) {
    modal.classList.add('show');
  }

  function hideModal(modal) {
    modal.classList.remove('show');
  }

  function updateSlide() {
    slideImage.src = slides[currentSlide].img;
    slideText.textContent = slides[currentSlide].text;
  }

  // Show disclaimer on first visit
  if (!localStorage.getItem('welcomeShown')) {
    showModal(disclaimerModal);
  }

  acknowledgeBtn.addEventListener('click', () => {
    hideModal(disclaimerModal);
    showModal(welcomeModal);
    updateSlide();
  });

  nextSlideBtn.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide < slides.length) {
      updateSlide();
    } else {
      hideModal(welcomeModal);
      localStorage.setItem('welcomeShown', 'true');
    }
  });

  // Example: Adding a card (you can expand this as needed)
  function addCard(imageSrc) {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Card';
    card.appendChild(img);
    cardContainer.appendChild(card);

    card.addEventListener('click', () => {
      cardDetailImage.src = imageSrc;
      showModal(cardDetailModal);
    });
  }

  // Close card detail modal
  doneBtn.addEventListener('click', () => {
    hideModal(cardDetailModal);
  });

  // Example usage: addCard('path_to_card_image.png');
});
