document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cardContainer');
  const addBtn = document.getElementById('addBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const popup = document.getElementById('popup');
  const addCreditBtn = document.getElementById('addCreditBtn');
  const addLoyaltyBtn = document.getElementById('addLoyaltyBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const doneBtn = document.getElementById('done-btn');
  const welcomeModal = document.getElementById('welcomeModal');
  const disclaimerModal = document.getElementById('disclaimerModal');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const acknowledgeBtn = document.getElementById('acknowledgeBtn');

  let cards = [];
  let currentSlide = 0;
  const slides = [
    { text: "Welcome to Wallet Prank!", img: "slide1.png" },
    { text: "Add your own cards easily.", img: "slide2.png" },
    { text: "Tap on a card to view details.", img: "slide3.png" },
    { text: "Delete all cards with the menu.", img: "slide4.png" },
    { text: "Your cards are saved locally.", img: "slide5.png" },
    { text: "Enjoy the experience!", img: "slide6.png" }
  ];

  // Initialize
  function init() {
    loadCards();
    if (!localStorage.getItem('welcomeShown')) {
      showWelcomeModal();
    }
  }

  // Load Cards from localStorage
  function loadCards() {
    const savedCards = JSON.parse(localStorage
::contentReference[oaicite:11]{index=11}
 
