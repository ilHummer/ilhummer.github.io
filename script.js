const addButton = document.getElementById("add-card");
const imageUpload = document.getElementById("image-upload");
const popup = document.getElementById("card-popup");
const popupButtons = document.querySelectorAll(".popup-btn");
const closePopup = document.querySelector(".popup-close");
const doneBtn = document.getElementById("done-btn");
const cardContainer = document.getElementById("credit-container");

let selectedType = "";
let allCards = [];

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
            card.dataset.type = selectedType;

            card.addEventListener("click", () => {
                expandCard(card);
            });

            applyTiltEffect(card);
            allCards.push(card);
            renderCardStack();
            selectedType = "";
        };
        reader.readAsDataURL(file);
    }
});

function renderCardStack() {
    cardContainer.innerHTML = "";
    const sorted = [
        ...allCards.filter(c => c.dataset.type === "credit"),
        ...allCards.filter(c => c.dataset.type === "loyalty")
    ];
    sorted.forEach((card, i) => {
        card.style.setProperty('--i', i);
        cardContainer.appendChild(card);
    });
}

function expandCard(card) {
    allCards.forEach(c => {
        if (c !== card) c.style.display = "none";
    });
    card.classList.add("expanded");
    doneBtn.style.display = "block";
    triggerVibration();
    showNfcOverlay();
}

doneBtn.addEventListener("click", () => {
    allCards.forEach((card, i) => {
        card.classList.remove("expanded");
        card.style.display = "block";
        card.style.setProperty('--i', i);
    });
    renderCardStack();
    doneBtn.style.display = "none";
});

function applyTiltEffect(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 10;
        const rotateX = -((y - centerY) / centerY) * 10;

        card.style.setProperty('--rotateX', `${rotateX}deg`);
        card.style.setProperty('--rotateY', `${rotateY}deg`);
        card.classList.add('tilted');
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rotateX', `0deg`);
        card.style.setProperty('--rotateY', `0deg`);
        card.classList.remove('tilted');
    });
}

function triggerVibration() {
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

function showNfcOverlay() {
    let overlay = document.createElement('div');
    overlay.className = 'nfc-overlay';
    overlay.innerText = 'Scanning...';
    document.body.appendChild(overlay);
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.removeChild(overlay);
    }, 1000);
}
