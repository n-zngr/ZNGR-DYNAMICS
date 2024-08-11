export function competenceModal() {
    const modalOverlay = document.querySelector('.competence-modal');
    const modalContent = document.querySelector('.competence-modal-content');
    const competenceCards = document.querySelectorAll('.competence-card');

    competenceCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardRect = card.getBoundingClientRect();
            modalContent.style.top = `${cardRect.top}px`;
            modalContent.style.left = `${cardRect.left}px`;
            modalContent.style.width = `${cardRect.width}px`;
            modalContent.style.height = `${cardRect.height}px`;
            modalContent.classList.add('initial-modal-state');

            modalOverlay.style.display = 'flex';
            
            requestAnimationFrame(() => {
                modalContent.classList.remove('initial-modal-state');
                modalContent.classList.add('expanded-modal-state');
            });
        });
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            modalContent.classList.remove('expanded-modal-state');
            modalContent.classList.add('closing-modal-state');

            setTimeout(() => {
                modalOverlay.style.display = 'none';
                modalContent.classList.remove('closing-modal-state');
            }, 500);
        }
    });
}