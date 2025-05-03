document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'walletCards';
    let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    const elements = {
        creditCards: document.querySelector('.credit-cards'),
        loyaltyCards: document.querySelector('.loyalty-cards'),
        addBtn: document.getElementById('addBtn'),
        deleteBtn: document.getElementById('deleteBtn'),
        typeOverlay: document.getElementById('typeSelectionOverlay'),
        confirmOverlay: document.getElementById('confirmationOverlay')
    };

    // Initialize app
    init();

    function init() {
        renderCards();
        setupEventListeners();
    }

    function renderCards() {
        elements.creditCards.innerHTML = '';
        elements.loyaltyCards.innerHTML = '';

        cards.forEach(card => {
            const cardElement = createCardElement(card);
            card.type === 'credit' 
                ? elements.creditCards.appendChild(cardElement)
                : elements.loyaltyCards.appendChild(cardElement);
        });
    }

    function createCardElement(cardData) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${cardData.image}" alt="Card">`;
        
        card.addEventListener('click', () => {
            card.classList.toggle('active');
            document.querySelector('header').style.opacity = card.classList.contains('active') ? 0 : 1;
        });

        return card;
    }

    function setupEventListeners() {
        // Add button click
        elements.addBtn.addEventListener('click', () => {
            elements.typeOverlay.style.display = 'block';
        });

        // Type selection
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                elements.typeOverlay.style.display = 'none';
                triggerImageUpload(type);
            });
        });

        // Cancel buttons
        document.querySelectorAll('.cancel').forEach(btn => {
            btn.addEventListener('click', () => {
                elements.typeOverlay.style.display = 'none';
                elements.confirmOverlay.style.display = 'none';
            });
        });

        // Delete functionality
        elements.deleteBtn.addEventListener('click', () => {
            elements.confirmOverlay.style.display = 'block';
        });

        document.querySelector('.delete').addEventListener('click', () => {
            cards = [];
            localStorage.removeItem(STORAGE_KEY);
            renderCards();
            elements.confirmOverlay.style.display = 'none';
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
