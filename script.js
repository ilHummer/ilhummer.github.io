document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'walletCards';
    let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    // UI Elements
    const cardStack = document.querySelector('.card-stack');
    const addBtn = document.getElementById('addBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    
    // Initialize app
    initApp();
    
    function initApp() {
        checkFirstVisit();
        renderCards();
        setupEventListeners();
    }
    
    function checkFirstVisit() {
        if (!localStorage.getItem('welcomeShown')) {
            showTutorial();
        }
    }
    
    function renderCards() {
        cardStack.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = createCardElement(card, index);
            cardStack.appendChild(cardElement);
        });
    }
    
    function createCardElement(cardData, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.type = cardData.type;
        card.innerHTML = `
            <img src="${cardData.image}" alt="Card">
            <div class="card-overlay">
                <div class="action-buttons">
                    ${cardData.type === 'loyalty' ? '<button class="action-btn share">↗</button>' : ''}
                    <button class="action-btn more">•••</button>
                </div>
                <div class="transactions">
                    <h3>Latest Transactions</h3>
                    <p class="no-transactions">No transaction history</p>
                </div>
                <button class="done-btn">Done</button>
            </div>
        `;
        
        card.addEventListener('click', handleCardClick);
        return card;
    }
    
    function handleCardClick(e) {
        const card = e.currentTarget;
        const isActive = card.classList.contains('active');
        
        if (!isActive) {
            activateCard(card);
        } else if (e.target.closest('.done-btn')) {
            deactivateCard(card);
        }
    }
    
    function activateCard(card) {
        document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        document.querySelector('header').style.opacity = '0';
    }
    
    function deactivateCard(card) {
        card.classList.remove('active');
        document.querySelector('header').style.opacity = '1';
    }
    
    function setupEventListeners() {
        addBtn.addEventListener('click', showAddCardMenu);
        deleteBtn.addEventListener('click', showDeleteConfirmation);
        
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', e => {
                if (e.target === overlay) hideAllModals();
            });
        });
        
        document.querySelector('.cancel').addEventListener('click', hideAllModals);
        document.querySelector('.delete').addEventListener('click', deleteAllCards);
    }
    
    function showAddCardMenu() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = handleImageUpload;
        input.click();
    }
    
    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = () => {
            const newCard = {
                type: confirm('Is this a loyalty card?') ? 'loyalty' : 'credit',
                image: reader.result,
                transactions: []
            };
            
            cards.push(newCard);
            saveCards();
            renderCards();
        };
        reader.readAsDataURL(file);
    }
    
    function showDeleteConfirmation() {
        document.getElementById('confirmationOverlay').style.display = 'block';
    }
    
    function deleteAllCards() {
        cards = [];
        localStorage.removeItem(STORAGE_KEY);
        hideAllModals();
        renderCards();
    }
    
    function hideAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    function saveCards() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
    
    function showTutorial() {
        document.getElementById('tutorialOverlay').style.display = 'block';
        document.querySelector('.understood').addEventListener('click', () => {
            localStorage.setItem('welcomeShown', 'true');
            hideAllModals();
        });
    }
});

// PWA Installation
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    const installButton = document.createElement('button');
    installButton.textContent = 'Install App';
    installButton.className = 'install-btn';
    document.body.appendChild(installButton);
    
    installButton.addEventListener('click', () => {
        e.prompt();
        installButton.remove();
    });
});
