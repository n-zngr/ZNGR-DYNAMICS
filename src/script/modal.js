document.addEventListener('DOMContentLoaded', function() {
    fetch('/src/script/projects.json')
    .then(response => response.json())
    .then(data => {
        const projectCards = document.querySelectorAll('.project-card');
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeBtn = document.querySelector('.close');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project-id');
                const project = data.projects.find(p => p.id === projectId);
                
                if (project) {
                    modalTitle.textContent = project.title;
                    modalDescription.textContent = project.description;
                    modal.classList.add('open');
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('open');
            }
        });
    });
})