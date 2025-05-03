document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'walletCards';
    let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // UI Elements
    const elements = {
        credit: document.querySelector('.credit-cards'),
        loyalty: document.querySelector('.loyalty-cards'),
        addBtn: document.getElementById('addBtn'),
        deleteBtn: document.getElementById('deleteBtn'),
        confirmationModal: document.getElementById('confirmationModal'),
        cardOverlay: document.getElementById('cardOverlay')
    };

    // Initialize
    checkFirstVisit();
    renderCards();
    setupEventListeners();

    function checkFirstVisit() {
        if (!localStorage.getItem('tutorialShown')) {
            showLegalDisclaimer();
            localStorage.setItem('tutorialShown', 'true');
        }
    }

    function showLegalDisclaimer() {
        const disclaimer = confirm("This app is for educational purposes only. Do not use for actual financial transactions.");
        if (!disclaimer) window.close();
    }

    function renderCards() {
        elements.credit.innerHTML = '';
        elements.loyalty.innerHTML = '';

        cards.forEach(card => {
            const cardElement = createCardElement(card);
            elements[card.type === 'credit' ? 'credit' : 'loyalty'].appendChild(cardElement);
        });
    }

    function createCardElement(cardData) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const img = new Image();
        img.src = cardData.image;
        img.alt = `${cardData.type} card`;
        
        card.appendChild(img);
        
        card.addEventListener('click', (e) => {
            if (!card.classList.contains('active')) {
                showCardDetail(cardData);
            }
        });

        return card;
    }

    function showCardDetail(cardData) {
        const overlayContent = document.createElement('div');
        overlayContent.className = 'card-detail';
        overlayContent.innerHTML = `
            <div class="card">
                <img src="${cardData.image}" alt="${cardData.type} card">
                <div class="card-actions">
                    ${cardData.type === 'loyalty' ? '<button class="action-btn">Share</button>' : ''}
                    <button class="action-btn">${cardData.type === 'credit' ? 'Transactions' : 'Details'}</button>
                </div>
                <button class="done-btn">Done</button>
            </div>
        `;

        elements.cardOverlay.innerHTML = '';
        elements.cardOverlay.appendChild(overlayContent);
        elements.cardOverlay.classList.add('active');

        // Close handlers
        elements.cardOverlay.addEventListener('click', (e) => {
            if (e.target === elements.cardOverlay || e.target.classList.contains('done-btn')) {
                elements.cardOverlay.classList.remove('active');
            }
        });
    }

    function setupEventListeners() {
        // Add Card
        elements.addBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = e => handleImageUpload(e);
            input.click();
        });

        // Delete Cards
        elements.deleteBtn.addEventListener('click', () => {
            elements.confirmationModal.style.display = 'flex';
        });

        // Confirm Delete
        document.querySelector('.delete').addEventListener('click', () => {
            cards = [];
            localStorage.removeItem(STORAGE_KEY);
            renderCards();
            elements.confirmationModal.style.display = 'none';
        });

        // Cancel Delete
        document.querySelector('.cancel').addEventListener('click', () => {
            elements.confirmationModal.style.display = 'none';
        });
    }

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const type = confirm('Is this a loyalty card?') ? 'loyalty' : 'credit';
        const reader = new FileReader();
        
        reader.onload = () => {
            cards.push({ type, image: reader.result });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
            renderCards();
        };
        reader.readAsDataURL(file);
    }
});
