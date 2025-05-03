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
        
        const img = new Image(); // Use Image constructor for better handling
        img.src = cardData.image;
        img.alt = `${cardData.type} card`;
        img.onload = () => {
            card.style.height = `${img.naturalHeight}px`; // Set card height based on image
        };
        img.onerror = () => {
            console.error('Failed to load image:', cardData.image);
            card.remove();
        };
        
        card.appendChild(img);
        
        card.addEventListener('click', () => {
            card.classList.toggle('active');
            document.querySelector('header').style.opacity = card.classList.contains('active') ? 0 : 1;
        });

        return card;
    }

    // ... rest of the script.js remains the same ...

    function handleImageUpload(e, type) {
        const file = e.target.files[0];
        if (!file) return;

        // Validate image file
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            // Verify the data URL
            if (!reader.result.startsWith('data:image')) {
                console.error('Invalid image data:', reader.result);
                return;
            }

            cards.push({ type: type, image: reader.result });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
            renderCards();
        };
        reader.onerror = (error) => {
            console.error('File reading error:', error);
        };
        reader.readAsDataURL(file);
    }
});
