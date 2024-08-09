document.addEventListener('DOMContentLoaded', () => {
    fetch('/src/data/data.json')
    .then(response => response.json())
    .then(data => {
        const competenceContainer = document.querySelector('.zngr-competence-container-main');
        const modal = document.getElementById('modal');
        const modalContainer = document.querySelector('.modal-container');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalListContainer = document.querySelector('.modal-main-about-list');
        const closeBtn = document.querySelector('.close');
        const modalImageContainer = document.querySelector('.modal-main-showcase');

        const animationDurationSlow = 800;
        let canCloseModal = false;
        let canOpenModal = true;

        data.competences.forEach((competence) => {
            const competenceCard = document.createElement('button');
            competenceCard.className = 'competence-card';
            competenceCard.setAttribute('data-competence-id', competence.id);

            competenceCard.innerHTML = `
                <div class="competence-card-thumbnail">
                    <img src="${competence.thumbnail}" alt="">
                </div>
                <div class="competence-card-text">
                    <div class="competence-card-text-container">
                        <p class="competence-card-text-container-description">${competence.description}</p>
                        <h3 class="competence-card-text-container-title">${competence.title}</h3>
                    </div>
                    <div class="competence-card-text-button">
                        <div class="button-small">
                            <svg class="button-icon" width="10" height="10" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 19V29C13 30.6569 14.3431 32 16 32C17.6569 32 19 30.6569 19 29V19H29C30.6569 19 32 17.6569 32 16C32 14.3431 30.6569 13 29 13H19V3C19 1.34315 17.6569 0 16 0C14.3431 0 13 1.34315 13 3V13H3C1.34315 13 0 14.3431 0 16C0 17.6569 1.34315 19 3 19H13Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            `;

            competenceContainer.appendChild(competenceCard);
        });
    })
});