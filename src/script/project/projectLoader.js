import { initializeScrollAnimation } from '../scrollAnimation.js';

document.addEventListener('DOMContentLoaded', function() {
    fetch('/src/data/data.json')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.querySelector('.zngr-projects');
    
        data.projects.forEach((project, index) => {
            const projectCard = document.createElement('button');
            projectCard.className = index % 3 === 2 ? 'project-card-big' : 'project-card';
            projectCard.classList.add('animate-on-scroll')
            projectCard.setAttribute('data-project-id', project.id);

            projectCard.innerHTML = `
            <div class="project-card-container">
                    <img src="${project.thumbnail}" alt="${project.title}">
                </div>
                <div class="project-card-info">
                    <h2 class="project-card-info-title">${project.title}</h2>
                    <div class="button-small">
                        <svg class="button-icon" width="10" height="10" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 19V29C13 30.6569 14.3431 32 16 32C17.6569 32 19 30.6569 19 29V19H29C30.6569 19 32 17.6569 32 16C32 14.3431 30.6569 13 29 13H19V3C19 1.34315 17.6569 0 16 0C14.3431 0 13 1.34315 13 3V13H3C1.34315 13 0 14.3431 0 16C0 17.6569 1.34315 19 3 19H13Z"/>
                        </svg>
                    </div>
                </div>
            `;

            projectsContainer.appendChild(projectCard);
        });
        initializeScrollAnimation();
    })
});