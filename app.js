// Modal Toggle Logic
const modals = {
    menu: document.getElementById('menuModal'),
    addCard: document.getElementById('addCardModal')
};

document.querySelector('.menu-btn').addEventListener('click', () => toggleModal('menu'));
document.querySelector('.add-btn').addEventListener('click', () => toggleModal('addCard'));

function toggleModal(modalName) {
    // Close all modals first
    Object.values(modals).forEach(modal => modal.style.display = 'none');
    
    // Show requested modal
    const modal = modals[modalName];
    modal.style.display = 'block';
    
    // Click-outside handler
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Card Addition Logic
document.querySelectorAll('.card-option').forEach(option => {
    option.addEventListener('click', function() {
        const type = this.classList.contains('credit-card') ? 'credit' : 'pass';
        triggerFileInput(type);
    });
});

function triggerFileInput(type) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => handleImageUpload(e, type);
    input.click();
}

function handleImageUpload(e, type) {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        addNewCard(type, event.target.result);
    };
    reader.readAsDataURL(file);
}

function addNewCard(type, imageSrc) {
    // Card creation logic here
    console.log(`Added ${type} card with image:`, imageSrc);
}
