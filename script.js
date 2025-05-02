const addButton = document.getElementById("add-card");
const imageUpload = document.getElementById("image-upload");
const popup = document.getElementById("card-popup");
const popupButtons = document.querySelectorAll(".popup-btn");
const closePopup = document.querySelector(".popup-close");

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

imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file && selectedType) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const card = document.createElement("div");
            card.className = "card";
            card.style.backgroundImage = `url('${e.target.result}')`;
            if (selectedType === "credit") {
                document.getElementById("credit-cards").appendChild(card);
            } else {
                document.getElementById("loyalty-cards").appendChild(card);
            }
        };
        reader.readAsDataURL(file);
        selectedType = ""; // reset
    }
});

closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
});
