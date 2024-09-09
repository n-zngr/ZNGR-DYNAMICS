import { loadCompetenceData, createCompetenceModal } from '/src/script/competence.js';
import { resetScrollPosition } from './competenceScroll.js';

export function competenceModal() {
    const modalOverlay = document.querySelector('.competence-modal');
    const modalContent = document.querySelector('.competence-modal-content');
    const competenceCards = document.querySelectorAll('.competence-card');
    const overlay = document.querySelector('.overlay');

    /*const competenceModalTop = document.querySelector('.competence-modal-top');*/
    /*const competenceMain = document.querySelector('.competence-modal-main');*/
    const competenceHeaderImage = document.querySelector('.competence-modal-header-image');
    /*const competenceModalTitle = document.querySelector('.competence-modal-title');*/

    const close = document.querySelector('.close');

    let initialRect = null;
    let selectedCompetenceId = null;

    loadCompetenceData().then(competences => {
        competenceCards.forEach(competenceCard => {
            competenceCard.addEventListener('click', async () => {
                const competenceCardId = competenceCard.getAttribute('data-competence-id');
                selectedCompetenceId = competenceCardId;
                /*console.log(competenceCardId);*/
                const competence = competences.find(c => c.id === competenceCardId);
                if (competence) {
                    await createCompetenceModal(competence);
                    openCompetenceModal(competenceCard);
                }
            })
        })
    });


    function openCompetenceModal(competenceCard) {
        const cardRect = competenceCard.getBoundingClientRect();
        initialRect = cardRect;

        const competenceMain = document.querySelector('.competence-modal-main');
        const competenceModalTop = document.querySelector('.competence-modal-top');
        const competenceModalTitle = document.querySelector('.competence-modal-title');

        document.body.classList.add('body-modal-open');

        overlay.style.opacity = '1';
        competenceCard.style.opacity = '0';

        if (competenceModalTop) {
            competenceModalTop.style.opacity = '1';
        }
        competenceMain.style.opacity = '1';
        
        const competenceHeaderImage = document.querySelector('.competence-modal-header-image');
        
        competenceHeaderImage.style.maskSize = '100% 200%';

        modalContent.style.position = 'absolute';
        modalContent.style.top = `${cardRect.top}px`;
        modalContent.style.left = `${cardRect.left}px`;
        modalContent.style.width = `${cardRect.width}px`;
        modalContent.style.height = `${cardRect.height}px`;

        modalOverlay.style.display = 'flex';

        modalContent.getBoundingClientRect();

        requestAnimationFrame(() => {
            const screenWidth = window.innerWidth;

            if (screenWidth <= 500) {
                modalContent.style.top = 'calc(56px + 48px)';
                modalContent.style.left = '0';
                modalContent.style.width = '100%';
                modalContent.style.height = 'calc(100% - 56px - 48px)';
            } else if (screenWidth < 768) {
                modalContent.style.top = 'calc(56px + 64px)';
                modalContent.style.left = '64px';
                modalContent.style.width = 'calc(100% - 128px)';
                modalContent.style.height = 'calc(100% - 56px - 64px)';
            } else if (screenWidth < 1280) {
                modalContent.style.top = 'calc(56px + 64px)';
                modalContent.style.left = '15%';
                modalContent.style.width = 'calc(100% - 30%)';
                modalContent.style.height = 'calc(100% - 56px - 64px)';
            } else {
                modalContent.style.top = 'calc(56px + 64px)';
                modalContent.style.left = '25%';
                modalContent.style.width = '50%';
                modalContent.style.height = 'calc(100% - 56px - 64px)';
            }

            modalContent.style.overflowY = 'scroll';
            competenceModalTop.opacity = '1';
            competenceMain.style.opacity = '1';
            competenceModalTitle.style.fontSize = '36px';
            competenceModalTitle.style.fontWeight = 'var(--font_weight-bold)';
        });
    }


    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay || event.target.closest('.close')) {
            closeCompetenceModal();
        }
    })


    function closeCompetenceModal() {
        const competenceHeaderImage = document.querySelector('.competence-modal-header-image');
        const competenceModalTop = document.querySelector('.competence-modal-top');
        const competenceMain = document.querySelector('.competence-modal-main');
        const competenceModalTitle = document.querySelector('.competence-modal-title');

        modalContent.scrollTo(0, 0);
        overlay.removeAttribute('style');

        modalContent.style.top = `${initialRect.top}px`;
        modalContent.style.left = `${initialRect.left}px`;
        modalContent.style.width = `${initialRect.width}px`;
        modalContent.style.height = `${initialRect.height}px`;

        modalContent.style.overflowY = 'hidden';
        competenceModalTop.removeAttribute('style');
        competenceMain.removeAttribute('style');
        competenceModalTitle.removeAttribute('style');
        
        competenceHeaderImage.removeAttribute('style');

        requestAnimationFrame(() => {
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                modalContent.style.transition = '';
                modalContent.style.position = '';
                modalContent.style.top = '';
                modalContent.style.left = '';
                modalContent.style.width = '';
                modalContent.style.height = '';

                modalContent.removeAttribute('style');

                competenceHeaderImage.style.maskSize = '100% 100%';
                /*competenceHeaderImage.removeAttribute('style');*/

                competenceCards.forEach(card => {
                    card.style.opacity = '1';
                });
                
                if (selectedCompetenceId === '6') {
                    resetScrollPosition();
                }

                document.body.classList.remove('body-modal-open');
                modalContent.innerHTML = '';
            }, 800);
        });
    };
};


/* OLD BELOW
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay || event.target.closest('.close')) {
            const competenceHeaderImage = document.querySelector('.competence-modal-header-image');
            const competenceModalTop = document.querySelector('.competence-modal-top');
            const competenceMain = document.querySelector('.competence-modal-main');
            const competenceModalTitle = document.querySelector('.competence-modal-title');

            modalContent.scrollTo(0, 0);
            overlay.removeAttribute('style');

            modalContent.style.top = `${initialRect.top}px`;
            modalContent.style.left = `${initialRect.left}px`;
            modalContent.style.width = `${initialRect.width}px`;
            modalContent.style.height = `${initialRect.height}px`;

            modalContent.style.overflowY = 'hidden';
            competenceModalTop.removeAttribute('style');
            competenceMain.removeAttribute('style');
            competenceModalTitle.removeAttribute('style');
            
            competenceHeaderImage.removeAttribute('style');

            requestAnimationFrame(() => {
                setTimeout(() => {
                    modalOverlay.style.display = 'none';
                    modalContent.style.transition = '';
                    modalContent.style.position = '';
                    modalContent.style.top = '';
                    modalContent.style.left = '';
                    modalContent.style.width = '';
                    modalContent.style.height = '';

                    modalContent.removeAttribute('style');
    
                    competenceHeaderImage.style.maskSize = '100% 100%';
                    /*competenceHeaderImage.removeAttribute('style');*/
/*
                    competenceCards.forEach(card => {
                        card.style.opacity = '1';
                    });
                    
                    if (selectedCompetenceId === '6') {
                        resetScrollPosition();
                    }

                    document.body.classList.remove('body-modal-open');
                    modalContent.innerHTML = '';
                }, 800);
            })
            
        }
    });
*/

    /*OLD BELOW*/
    /*
    competenceCards.forEach(card => {
        card.addEventListener('click', () => {
            originalRect = card.getBoundingClientRect();

            overlay.style.opacity = '1';

            card.style.opacity = '0';

            competenceModalTop.style.opacity = '1';
            modalOverlay.style.display = 'flex';

            document.body.classList.add('body-modal-open');

            modalContent.getBoundingClientRect();

            requestAnimationFrame(() => {
                modalContent.style.top = '96px';
                modalContent.style.left = '25%';
                modalContent.style.width = '50%';
                modalContent.style.height = 'calc(100% - 96px)';

                modalContent.style.overflowY = 'scroll';
                competenceModalTop.opacity = '1';
                competenceMain.style.opacity = '1';
                competenceModalTitle.style.fontSize = '36px';
            });
        });
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay || event.target === close) {
            modalContent.scrollTo(0, 0);

            overlay.removeAttribute('style');
            
            modalContent.style.top = `${originalRect.top}px`;
            modalContent.style.left = `${originalRect.left}px`;
            modalContent.style.width = `${originalRect.width}px`;
            modalContent.style.height = `${originalRect.height}px`;

            modalContent.style.overflowY = 'hidden';
            competenceModalTop.removeAttribute('style');
            competenceMain.removeAttribute('style');
            competenceModalTitle.removeAttribute('style');

            

            /*Mask Image Functionality*//*
            competenceHeaderImage.style.maskSize = '100% 100%';
            competenceHeaderImage.style.maskImage = 'linear-gradient(180deg, var(--black) 0%, transparent 90%)';

            setTimeout(() => {
                modalOverlay.style.display = 'none';
                modalContent.style.transition = '';
                modalContent.style.position = '';
                modalContent.style.top = '';
                modalContent.style.left = '';
                modalContent.style.width = '';
                modalContent.style.height = '';

                competenceHeaderImage.style.maskSize = '100% 100%';
                competenceHeaderImage.removeAttribute('style');

                competenceCards.forEach(card => {
                    card.style.opacity = '1';
                });

                document.body.classList.remove('body-modal-open');
            }, 800);
        }
    });*/

