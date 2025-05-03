document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'walletCards';
    let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    const elements = {
        credit: document.querySelector('.credit-cards'),
        loyalty: document.querySelector('.loyalty-cards'),
        addBtn: document.getElementById('addBtn'),
        deleteBtn: document.getElementById('deleteBtn'),
        typeModal: document.getElementById('typeModal'),
        confirmModal: document.getElementById('confirmModal')
    };

    // Initialize app
    init();

    function init() {
        renderCards();
        setupEventListeners();
    }

    function renderCards() {
        elements.credit.innerHTML = '';
        elements.loyalty.innerHTML = '';

        cards.forEach(card => {
            const cardElement = createCardElement(card);
            elements[card.type].appendChild(cardElement);
        });
    }

    function createCardElement(cardData) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const img = document.createElement('img');
        img.src = cardData.image;
        img.alt = `${cardData.type} card`;
        
        card.appendChild(img);
        
        card.addEventListener('click', () => {
            card.classList.toggle('active');
            document.querySelector('header').style.opacity = card.classList.contains('active') ? 0 : 1;
        });

        return card;
    }

    function setupEventListeners() {
        // Add card flow
        elements.addBtn.addEventListener('click', () => {
            elements.typeModal.style.display = 'block';
        });

        // Type selection
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                elements.typeModal.style.display = 'none';
                triggerImageUpload(type);
            });
        });

        // Delete flow
        elements.deleteBtn.addEventListener('click', () => {
            elements.confirmModal.style.display = 'block';
        });

        // Cancel buttons
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                elements.typeModal.style.display = 'none';
                elements.confirmModal.style.display = 'none';
            });
        });

        // Confirm delete
        document.querySelector('.delete-btn').addEventListener('click', () => {
            cards = [];
            localStorage.removeItem(STORAGE_KEY);
            renderCards();
            elements.confirmModal.style.display = 'none';
        });
    }

    function triggerImageUpload(type) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = e => handleImageUpload(e, type);
        input.click();
    }

    function handleImageUpload(e, type) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            cards.push({ type: type, image: reader.result });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
            renderCards();
        };
        reader.readAsDataURL(file);
    }
});
