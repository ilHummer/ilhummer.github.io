document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'walletCards';
    let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    const cardStack = document.querySelector('.card-stack');
    const addBtn = document.getElementById('addBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const cardTypeModal = document.querySelector('.card-type-modal');

    initApp();

    function initApp() {
        checkFirstVisit();
        renderCards();
        setupEventListeners();
    }

    function checkFirstVisit() {
        if (!localStorage.getItem('welcomeShown')) {
            document.getElementById('tutorialOverlay').style.display = 'block';
        }
    }

    function renderCards() {
        const creditSection = document.querySelector('.credit-section');
        const loyaltySection = document.querySelector('.loyalty-section');
        
        creditSection.innerHTML = '<div class="section-title">Payment Cards</div>';
        loyaltySection.innerHTML = '<div class="section-title">Loyalty Cards</div>';

        cards.forEach((card) => {
            const cardElement = createCardElement(card);
            card.type === 'loyalty' 
                ? loyaltySection.appendChild(cardElement)
                : creditSection.appendChild(cardElement);
        });
    }

    function createCardElement(cardData) {
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
        if (!card.classList.contains('active')) {
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
        deleteBtn.addEventListener('click', () => {
            document.getElementById('confirmationOverlay').style.display = 'block';
        });

        document.querySelector('.cancel').addEventListener('click', hideAllModals);
        document.querySelector('.delete').addEventListener('click', deleteAllCards);
        document.querySelector('.understood').addEventListener('click', () => {
            localStorage.setItem('welcomeShown', 'true');
            hideAllModals();
        });

        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) hideAllModals();
            });
        });
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
            cardTypeModal.classList.add('visible');
            
            document.querySelectorAll('.card-type-btn').forEach(btn => {
                btn.onclick = () => {
                    const type = btn.dataset.type;
                    addNewCard(reader.result, type);
                    cardTypeModal.classList.remove('visible');
                };
            });
        };
        reader.readAsDataURL(file);
    }

    function addNewCard(imageSrc, type) {
        cards.push({
            type: type,
            image: imageSrc,
            transactions: []
        });
        saveCards();
        renderCards();
    }

    function deleteAllCards() {
        cards = [];
        localStorage.removeItem(STORAGE_KEY);
        hideAllModals();
        renderCards();
    }

    function hideAllModals() {
        document.querySelectorAll('.modal-overlay, .card-type-modal').forEach(el => {
            el.style.display = 'none';
            el.classList.remove('visible');
        });
    }

    function saveCards() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
});

// PWA Installation
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    const installBtn = document.createElement('button');
    installBtn.className = 'btn install-btn';
    installBtn.textContent = 'Install App';
    document.body.appendChild(installBtn);

    installBtn.addEventListener('click', () => {
        e.prompt();
        installBtn.remove();
    });
});
