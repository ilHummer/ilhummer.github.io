const addButton = document.getElementById("add-card");
const imageUpload = document.getElementById("image-upload");

addButton.addEventListener("click", () => {
    const choice = prompt("Add a Credit/Debit card or a Loyalty card? Type 'credit' or 'loyalty'");
    if (choice === "credit" || choice === "loyalty") {
        imageUpload.setAttribute("data-type", choice);
        imageUpload.click();
    } else {
        alert("Invalid choice. Please type 'credit' or 'loyalty'.");
    }
});

imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    const type = this.getAttribute("data-type");

    if (file && type) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const card = document.createElement("div");
            card.className = "card";
            card.style.backgroundImage = `url('${e.target.result}')`;

            if (type === "credit") {
                document.getElementById("credit-cards").appendChild(card);
            } else {
                document.getElementById("loyalty-cards").appendChild(card);
            }
        };
        reader.readAsDataURL(file);
    }
});
