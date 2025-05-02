const addBtn = document.getElementById("addBtn");
const popup = document.getElementById("popup");
const addCreditBtn = document.getElementById("addCreditBtn");
const addLoyaltyBtn = document.getElementById("addLoyaltyBtn");
const cancelBtn = document.getElementById("cancelBtn");
const cardContainer = document.getElementById("cardContainer");
const doneBtn = document.getElementById("done-btn");

let cardZIndex = 1;

function createCard(imageSrc, isLoyalty = false) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.zIndex = cardZIndex++;
  card.style.top = `${cardZIndex * 12}px`;

  const img = document.createElement("img");
  img.src = imageSrc;

  card.appendChild(img);
  cardContainer.appendChild(card);

  card.addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => {
      if (c !== card) {
        c.style.display = "none";
      } else {
        c.classList.add("active");
      }
    });
    doneBtn.classList.add("visible");
  });
}

function openImagePicker(isLoyalty) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      createCard(event.target.result, isLoyalty);
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

addBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
});

addCreditBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  openImagePicker(false);
});

addLoyaltyBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  openImagePicker(true);
});

cancelBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

doneBtn.addEventListener("click", () => {
  document.querySelectorAll(".card").forEach(c => {
    c.classList.remove("active");
    c.style.display = "block";
  });
  doneBtn.classList.remove("visible");
});
