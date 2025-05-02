const cardContainer = document.getElementById("cardContainer");
const uploader = document.getElementById("cardUploader");

// Load cards from localStorage
window.addEventListener("load", () => {
  const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
  savedCards.forEach(src => addCard(src));
});

// Handle uploads
uploader.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const src = event.target.result;
    addCard(src);

    // Save to localStorage
    const currentCards = JSON.parse(localStorage.getItem("cards")) || [];
    currentCards.push(src);
    localStorage.setItem("cards", JSON.stringify(currentCards));
  };
  reader.readAsDataURL(file);
});

// Add card to UI
function addCard(src) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${src}" alt="Card" />`;
  cardContainer.prepend(card);
}
