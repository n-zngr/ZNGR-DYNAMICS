document.addEventListener('DOMContentLoaded', function() {
    fetch('/src/data/data.json')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.querySelector('.zngr-projects');
        const projectCards = document.querySelectorAll('.project-card, .project-card-big');
        const competenceContainer = document.querySelector('.zngr-competence-container-main');
        const modal = document.getElementById('modal');
        const modalContainer = document.querySelector('.modal-container');
        const modalTitle = document.getElementById('modal-title');
        const modalInfoContainer = document.querySelector('modal-main-about-info');
        const modalDescription = document.getElementById('modal-description');
        const modalListContainer = document.querySelector('.modal-main-about-list');
        const closeBtn = document.querySelector('.close');
        const modalImageContainer = document.querySelector('.modal-main-showcase');

        const animationDurationSlow = '800';
        let canCloseModal = false;
        let canOpenModal = true;

        function openModal(content) {
            if (content) {
                modalTitle.textContent = content.title;
                modalDescription.textContent = content.description; 

                modalInfoContainer.innerHTML = '';
                modalListContainer.innerHTML = '';
                modalImageContainer.innerHTML = '';

                if (content.images) {
                    content.images.forEach(image => {
                        const imageItem = document.createElement('div');
                        imageItem.className = 'modal-main-showcase-card';

                        const imgElement = document.createElement('img');
                        imgElement.src = image.src;
                        imgElement.alt = image.alt;

                        imageItem.appendChild(imgElement);
                        modalImageContainer.appendChild(imageItem);
                    });
                }
                
                if (content.list) {
                    content.list.forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.className = 'modal-main-about-list-item';
                        listItem.textContent = item;

                        modalListContainer.appendChild(listItem);
                    })
                    
                }
                
                modal.removeAttribute('style');
                document.body.classList.add('body-modal-open');
                modalContainer.classList.add('modal-open');
                modal.classList.add('modal-open');
                
                setTimeout(() => {
                    canCloseModal = true;
                }, animationDurationSlow);

                setTimeout(() => {
                    canOpenModal = true;
                }, animationDurationSlow);
            }
        }

        const closeModal = () => {
            if (canCloseModal) {
                modalContainer.classList.remove('modal-open');
                modal.style.overflow = 'hidden';
                document.body.classList.remove('body-modal-open');
                setTimeout(function () {
                    modal.classList.remove('modal-open');
                    modal.removeAttribute('style');
                    modalContainer.classList.remove('modal-open');
                    document.body.classList.remove('body-modal-open');
                    canCloseModal = false;
                    canOpenModal = true;
                }, animationDurationSlow);
            }
        }

        document.querySelector('.zngr-projects').addEventListener('click', function(event) {
            if (event.target.closest('.project-card, .project-card-big')) {
                const projectCard = event.target.closest('.project-card, .project-card-big');
                if (canOpenModal) {
                    canOpenModal = false;
                    canCloseModal = false;
                    const projectId = projectCard.getAttribute('data-project-id');
                    const project = data.projects.find(p => p.id === projectId);
                    openModal(project);
                }
            }
        });

        document.querySelector('.zngr-competence-container-main').addEventListener('click', function(event) {
            if (event.target.closest('.competence-card')) {
                const competenceCard = event.target.closest('.competence-card');
                if (canOpenModal) {
                    canOpenModal = false;
                    canCloseModal = false;
                    const competenceId = competenceCard.getAttribute('data-competence-id');
                    const competence = data.competences.find(c => c.id === competenceId);
                    openModal(competence);
                }
            }
        })

        // Close modal through button
        closeBtn.addEventListener('click', closeModal);

        // Close modal through clicking outside of container
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    })
    .catch(error => console.error('Error loading projects:', error));
});

