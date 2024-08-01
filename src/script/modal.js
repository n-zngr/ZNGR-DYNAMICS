document.addEventListener('DOMContentLoaded', function() {
    fetch('/src/script/projects.json')
    .then(response => response.json())
    .then(data => {
        const projectCards = document.querySelectorAll('.project-card, .project-card-big');
        const modal = document.getElementById('modal');
        const modalContainer = document.querySelector('.modal-container');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalListContainer = document.querySelector('.modal-main-about-list');
        const closeBtn = document.querySelector('.close');

        const animationDurationSlow = '800';
        const animationDurationShort = '400';
        let canCloseModal = false;
        let canOpenModal = true;

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                if (canOpenModal) {
                    canOpenModal = false;
                    canCloseModal = false;
                    const projectId = card.getAttribute('data-project-id');
                    const project = data.projects.find(p => p.id === projectId);
                    
                    if (project) {
                        modalTitle.textContent = project.title;
                        modalDescription.textContent = project.description;
                        
                        modalListContainer.innerHTML = '';
    
                        project.list.forEach(item => {
                            const listItem = document.createElement('li');
                            listItem.className = 'modal-main-about-list-item';
                            listItem.textContent = item;
                            modalListContainer.appendChild(listItem);
                        });
                        
                        modal.removeAttribute('style');
                        document.body.classList.add('body-modal-open');
                        modalContainer.classList.add('modal-open');
                        modal.classList.add('modal-open');
                        
                        setTimeout(() => {
                            canCloseModal = true;
                        }, animationDurationSlow);

                        /*setTimeout(() => {
                            canOpenModal = true;
                        }, animationDurationSlow);*/
                    }
                }              
            });
        });

        const closeModal = () => {
            if (canCloseModal) {
                modalContainer.classList.remove('modal-open');
                modal.style.overflow = 'hidden';
                document.body.classList.remove('body-modal-open');
                setTimeout(function () {
                    modal.classList.remove('modal-open');
                    modal.removeAttribute('style');
                    modalContainer.classList.remove('modal-open');
                    canCloseModal = false;
                    canOpenModal = true;
                }, animationDurationSlow);
            }
        }

        // Close modal through button
        closeBtn.addEventListener('click', closeModal);

        // Close modal through clicking outside of container
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    });
})

