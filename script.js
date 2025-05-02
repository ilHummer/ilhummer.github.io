const addBtn = document.getElementById("addBtn");
const popup = document.getElementById("popup");
const addCreditBtn = document.getElementById("addCreditBtn");
const addLoyaltyBtn = document.getElementById("addLoyaltyBtn");
const cardContainer = document.getElementById("cardContainer");
const doneBtn = document.getElementById("done-btn");

let cards = [];
let loyaltyCards = [];

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/*";
fileInput.style.display = "none";
document.body.appendChild(fileInput);

addBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
});

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

function renderCards() {
  cardContainer.innerHTML = "";
  const all = [...cards, ...loyaltyCards];

  all.forEach((src, index) => {
    const div = document.createElement("div");
    div.className = "card";
    const img = document.createElement("img");
    img.src = src;
    div.appendChild(img);

    div.style.marginTop = index === 0 ? "0px" : "-80px";
    div.style.zIndex = index + 1;

    div.addEventListener("click", () => expandCard(div));
    cardContainer.appendChild(div);
  });
}

function expandCard(card) {
  document.querySelectorAll(".card").forEach((c) => {
    if (c !== card) c.style.display = "none";
  });

  card.classList.add("active");
  doneBtn.style.display = "block";
}

doneBtn.addEventListener("click", () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.style.display = "block";
    card.classList.remove("active");
  });
  doneBtn.style.display = "none";
});
