import { techIcons, techNames } from '../techIcons/techIconsLoader.js';

export async function loadCompetenceData() {
    try {
        const response = await fetch('/src/data/data.json');
        const data = await response.json();
        return data.competences;
    } catch (error) {
        console.error('Error loading competence data:', error);
        return [];
    }
}

export function createCompetenceModal(competence) {
    const modalContent = document.querySelector('.competence-modal-content');
    const modalTop = document.createElement('div');
    modalTop.classList.add('competence-modal-top');
    modalTop.innerHTML = `
        <span class="button-small close">
            <svg class="button-icon" width="10" height="10" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6274 16.8701L19.6985 23.9411C20.8701 25.1127 22.7696 25.1127 23.9411 23.9411C25.1127 22.7695 25.1127 20.8701 23.9411 19.6985L16.8701 12.6274L23.9411 5.55634C25.1127 4.38477 25.1127 2.48528 23.9411 1.3137C22.7696 0.142129 20.8701 0.142129 19.6985 1.3137L12.6274 8.38477L5.55635 1.3137C4.38478 0.14213 2.48528 0.142129 1.31371 1.3137C0.142135 2.48528 0.142135 4.38477 1.31371 5.55634L8.38478 12.6274L1.31371 19.6985C0.142135 20.8701 0.142135 22.7695 1.31371 23.9411C2.48528 25.1127 4.38478 25.1127 5.55635 23.9411L12.6274 16.8701Z"/>
            </svg>
        </span>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('competence-modal-container');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('competence-modal-header');
    modalHeader.innerHTML = `
        <div class="competence-modal-header-image">
            <img src="${competence.thumbnail}" alt="">
        </div>
        <div class="competence-modal-header-text">
            <p class="competence-modal-subtitle" id="competence-modal-subtitle">${competence.subtitle}</p>
            <h3 class="competence-modal-title" id="competence-modal-title">${competence.title}</h3>
        </div>
    `;

    const modalMain = document.createElement('div');
    modalMain.classList.add('competence-modal-main');
    competence.description.forEach(description => {
        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('competence-modal-main-description');
        descriptionElement.innerHTML = description;
        modalMain.appendChild(descriptionElement);
    });

    const modalFooter = document.createElement('div');
    modalFooter.classList.add('competence-modal-footer');

    competence.tech.forEach(tech => {
        const techName = tech.trim().toLowerCase();
        if (techIcons[techName]) {
            const techItem = document.createElement('div');
            techItem.classList.add('competence-modal-footer-item');
            techItem.setAttribute('data-tooltip', techNames[techName]);
            techItem.innerHTML = `
                <img src="${techIcons[techName]}" alt="${techNames[techName]}" height="24" width="24">
            `;
            modalFooter.appendChild(techItem);
        }
    })

    modalContainer.appendChild(modalHeader);
    modalContainer.appendChild(modalMain);
    modalContainer.appendChild(modalFooter);

    modalContent.appendChild(modalTop);
    modalContent.appendChild(modalContainer);
}