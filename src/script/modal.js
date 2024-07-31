document.addEventListener('DOMContentLoaded', function() {
    fetch('/src/script/projects.json')
    .then(response => response.json())
    .then(data => {
        const projectCards = document.querySelectorAll('.project-card, .project-card-big');
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalListContainer = document.querySelector('.modal-main-about-list');
        const closeBtn = document.querySelector('.close');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project-id');
                const project = data.projects.find(p => p.id === projectId);
                
                if (project) {
                    modalTitle.textContent = project.title;
                    modalDescription.textContent = project.description;
                    
                    //Clearing initial list items
                    modalListContainer.innerHTML = '';

                    project.list.forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.className = 'modal-main-about-list-item';
                        listItem.textContent = item;
                        modalListContainer.appendChild(listItem);
                    });
                    
                    document.body.classList.add('modal-open'); //Disables body scrolling
                    modal.removeAttribute('style');
                    modal.classList.add('open');
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open'); //Allows body scrolling
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('open');
                document.body.classList.remove('modal-open'); //Allows body scrolling
            }
        });
    });
})

