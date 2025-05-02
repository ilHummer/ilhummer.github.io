const addBtn = document.getElementById("addBtn");
const popup = document.getElementById("popup");
const addCreditBtn = document.getElementById("addCreditBtn");
const addLoyaltyBtn = document.getElementById("addLoyaltyBtn");
const cardContainer = document.getElementById("cardContainer");
const doneBtn = document.getElementById("done-btn");

let cards = [];
let loyaltyCards = [];

// Hidden input for file upload
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/*";
fileInput.style.display = "none";
document.body.appendChild(fileInput);

// Open popup when "+" is clicked
addBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
});

// Add credit card
addCreditBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    cards.push(url);
    renderCards();
  };
  fileInput.click();
});

// Add loyalty card
addLoyaltyBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    loyaltyCards.push(url);
    renderCards();
  };
  fileInput.click();
});

// Close popup
function closePopup() {
  popup.classList.add("hidden");
}

// Render cards
function renderCards() {
  cardContainer.innerHTML = "";

  const all = [...cards, ...loyaltyCards];

  all.forEach((src, index) => {
    const div = document.createElement("div");
    div.className = "card";
    const img = document.createElement("img");
    img.src = src;
    div.appendChild(img);

    // Add stacking animation
    div.style.marginTop = index === 0 ? "0px" : "-100px";
    div.style.zIndex = all.length - index;

    div.addEventListener("click", () => expandCard(div));
    cardContainer.appendChild(div);
  });
}

// Expand selected card
function expandCard(card) {
  document.querySelectorAll(".card").forEach((c) => {
    if (c !== card) c.style.display = "none";
  });

  card.classList.add("active");
  doneBtn.style.display = "block";
}

// Exit card view
doneBtn.addEventListener("click", () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.style.display = "block";
    card.classList.remove("active");
  });
  doneBtn.style.display = "none";
});
