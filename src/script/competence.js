export function competenceModal() {
    const modalOverlay = document.querySelector('.competence-modal');
    const modalContent = document.querySelector('.competence-modal-content');
    const competenceCards = document.querySelectorAll('.competence-card');
    const overlay = document.querySelector('.overlay');

    let originalRect = null;

    competenceCards.forEach(card => {
        card.addEventListener('click', () => {
            originalRect = card.getBoundingClientRect();

            overlay.style.opacity = '1';

            modalContent.style.position = 'absolute';
            modalContent.style.top = `${originalRect.top}px`;
            modalContent.style.left = `${originalRect.left}px`;
            modalContent.style.width = `${originalRect.width}px`;
            modalContent.style.height = `${originalRect.height}px`;

            modalOverlay.style.display = 'flex';

            document.body.classList.add('body-modal-open');

            modalContent.getBoundingClientRect();

            requestAnimationFrame(() => {
                modalContent.style.transition = 'all 0.8s';
                modalContent.style.top = '96px';
                modalContent.style.left = '25%';
                modalContent.style.width = '50%';
                modalContent.style.height = 'calc(100% - 192px)'; // Adjusted for top and bottom spacing
            });
        });
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {

            overlay.removeAttribute('style');
            
            modalContent.style.top = `${originalRect.top}px`;
            modalContent.style.left = `${originalRect.left}px`;
            modalContent.style.width = `${originalRect.width}px`;
            modalContent.style.height = `${originalRect.height}px`;


            setTimeout(() => {
                modalOverlay.style.display = 'none';
                modalContent.style.transition = '';
                modalContent.style.position = '';
                modalContent.style.top = '';
                modalContent.style.left = '';
                modalContent.style.width = '';
                modalContent.style.height = '';

                document.body.classList.remove('body-modal-open');
            }, 800); // Duration matches the CSS transition
        }
    });
};

