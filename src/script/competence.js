document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.querySelector('.competence-modal');
    const modalContent = document.querySelector('.competence-modal-content');
    const competenceCards = document.querySelectorAll('.competence-card');

    competenceCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardRect = card.getBoundingClientRect();
            modalContent.style.position = 'absolute';
            modalContent.style.top = `${cardRect.top}px`;
            modalContent.style.left = `${cardRect.left}px`;
            modalContent.style.width = `${cardRect.width}px`;
            modalContent.style.height = `${cardRect.height}px`;

            modalOverlay.style.display = 'flex';
            
            modalContent.getBoundingClientRect();

            requestAnimationFrame(() => {
                modalContent.style.transition = 'all 0.5s ease';
                modalContent.style.top = '128px';
                modalContent.style.left = '32px';
                modalContent.style.width = 'calc(100% - 64px)';
                modalContent.style.height = 'calc(100% - 128px)';
            });
        });
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            modalContent.style.transition = 'all 0.5s ease';
            const expandedRect = modalContent.getBoundingClientRect();
            modalContent.style.top = `${expandedRect.top}px`;
            modalContent.style.left = `${expandedRect.left}px`;
            modalContent.style.width = `${expandedRect.width}px`;
            modalContent.style.height = `${expandedRect.height}px`;
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                modalContent.style.transition = '';
                modalContent.style.top = '';
                modalContent.style.left = '';
                modalContent.style.width = '';
                modalContent.style.height = '';
            }, 500);
        }
    });
});