document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'walletCards';
    let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    const cardStack = {
        credit: document.querySelector('.credit-cards'),
        loyalty: document.querySelector('.loyalty-cards')
    };

    // Initialize app
    init();

    function init() {
        renderCards();
        setupEventListeners();
    }

    function renderCards() {
        cardStack.credit.innerHTML = '';
        cardStack.loyalty.innerHTML = '';

        cards.forEach(card => {
            const cardElement = createCardElement(card);
            cardStack[card.type].appendChild(cardElement);
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
        document.getElementById('addBtn').addEventListener('click', () => {
            document.getElementById('typeSelectionOverlay').style.display = 'block';
        });

        // Type selection
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                document.getElementById('typeSelectionOverlay').style.display = 'none';
                triggerImageUpload(type);
            });
        });

        // Cancel buttons
        document.querySelectorAll('.cancel, .cancel-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal-overlay').forEach(el => {
                    el.style.display = 'none';
                });
            });
        });

        // Delete functionality
        document.getElementById('deleteBtn').addEventListener('click', () => {
            document.getElementById('confirmationOverlay').style.display = 'block';
        });

        document.querySelector('.delete').addEventListener('click', () => {
            cards = [];
            localStorage.removeItem(STORAGE_KEY);
            renderCards();
            document.getElementById('confirmationOverlay').style.display = 'none';
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
