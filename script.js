const addButton = document.getElementById("add-card");
const imageUpload = document.getElementById("image-upload");
const popup = document.getElementById("card-popup");
const popupButtons = document.querySelectorAll(".popup-btn");
const closePopup = document.querySelector(".popup-close");
const doneBtn = document.getElementById("done-btn");

let selectedType = "";

addButton.addEventListener("click", () => {
    popup.classList.remove("hidden");
});

popupButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        selectedType = btn.dataset.type;
        popup.classList.add("hidden");
        imageUpload.click();
    });
});

closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
});

imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file && selectedType) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const card = document.createElement("div");
            card.className = "card";
            card.style.backgroundImage = `url('${e.target.result}')`;

            card.addEventListener("click", () => {
                expandCard(card);
            });

            const container = selectedType === "credit"
                ? document.getElementById("credit-container")
                : document.getElementById("loyalty-container");

            const cardIndex = container.children.length;
            card.style.setProperty("--i", cardIndex);
            container.appendChild(card);

            selectedType = "";
        };
        reader.readAsDataURL(file);
    }
});

function expandCard(card) {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(c => {
        if (c !== card) c.style.display = "none";
    });

    card.classList.add("expanded");
    doneBtn.style.display = "block";
}

doneBtn.addEventListener("click", () => {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((c, index) => {
        c.classList.remove("expanded");
        c.style.display = "block";
        c.style.setProperty("--i", index);
    });
    doneBtn.style.display = "none";
});
