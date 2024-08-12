import { loadCompetenceData, createCompetenceModal } from '/src/script/competence.js';

export function competenceModal() {
    const modalOverlay = document.querySelector('.competence-modal');
    const modalContent = document.querySelector('.competence-modal-content');
    const competenceCards = document.querySelectorAll('.competence-card');
    const overlay = document.querySelector('.overlay');

    const competenceModalTop = document.querySelector('.competence-modal-top');
    const competenceMain = document.querySelector('.competence-modal-main');
    const competenceHeaderImage = document.querySelector('.competence-modal-header-image');
    const competenceModalTitle = document.querySelector('.competence-modal-title');

    const close = document.querySelector('.close');

    let initialRect = null;

    loadCompetenceData().then(competences => {
        competenceCards.forEach(competenceCard => {
            competenceCard.addEventListener('click', () => {
                const competenceCardId = competenceCard.getAttribute('data-competence-id');
                console.log(competenceCardId);
                /*const competence = competences.find(c => c.id === competenceCardId);*/
                const competence = competenceCardId;
                if (competence) {
                    createCompetenceModal(competence);
                    openModal(card);
                }
            })
        })
    })


    function openModal(card) {
        const cardRect = card.getBoundingClientRect();
        initialRect = cardRect;

        const modalContent = document.querySelector('.competence-modal-content');
        modalContent.style.position = 'absolute';
        modalContent.style.top = `${cardRect.top}px`;
        modalContent.style.left = `${cardRect.left}px`;
        modalContent.style.width = `${cardRect.width}px`;
        modalContent.style.height = `${cardRect.height}px`;

        modalOverlay.style.display = 'flex';

        modalContent.getBoundingClientRect();

        requestAnimationFrame(() => {
            modalContent.style.top = '128px';
            modalContent.style.left = '32px';
            modalContent.style.width = 'calc(100% - 64px)';
            modalContent.style.height = 'calc(100% - 128px)';
        });
    }

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay && initialRect) {
            const modalContent = document.querySelector('.competence-modal-content');

            modalContent.style.top = `${initialRect.top}px`;
            modalContent.style.left = `${initialRect.left}px`;
            modalContent.style.width = `${initialRect.width}px`;
            modalContent.style.height = `${initialRect.height}px`;

            modalContent.style.overflowY = 'scroll';
            competenceModalTop.opacity = '1';
            competenceMain.style.opacity = '1';
            competenceModalTitle.style.fontSize = '36px';

            requestAnimationFrame(() => {
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
            })

            
        }
    })





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
};
