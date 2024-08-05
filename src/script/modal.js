document.addEventListener('DOMContentLoaded', function() {
    fetch('/src/script/data.json')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.querySelector('.zngr-projects');
        const modal = document.getElementById('modal');
        const modalContainer = document.querySelector('.modal-container');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalListContainer = document.querySelector('.modal-main-about-list');
        const closeBtn = document.querySelector('.close');
        const modalImageContainer = document.querySelector('.modal-main-showcase');

        const animationDurationSlow = '800';
        let canCloseModal = false;
        let canOpenModal = true;


        data.projects.forEach((project, index) => {
            const projectCard = document.createElement('button');
            projectCard.className = index % 3 === 2 ? 'project-card-big' : 'project-card';
            projectCard.setAttribute('data-project-id', project.id);

            // <img src="${project.thumbnail}" alt="${project.title}">

            projectCard.innerHTML = `
                <div class="project-card-container">
                    <img src="${project.thumbnail}" alt="${project.title}">
                </div>
                <div class="project-card-info">
                    <h2>${project.title}</h2>
                    <div class="button-small">
                        <svg class="button-icon" width="10" height="10" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 19V29C13 30.6569 14.3431 32 16 32C17.6569 32 19 30.6569 19 29V19H29C30.6569 19 32 17.6569 32 16C32 14.3431 30.6569 13 29 13H19V3C19 1.34315 17.6569 0 16 0C14.3431 0 13 1.34315 13 3V13H3C1.34315 13 0 14.3431 0 16C0 17.6569 1.34315 19 3 19H13Z"/>
                        </svg>
                    </div>
                </div>
            `;

            projectCard.addEventListener('click', () => {
                if (canOpenModal) {
                    canOpenModal = false;
                    canCloseModal = false;
                    const projectId = projectCard.getAttribute('data-project-id');
                    const project = data.projects.find(p => p.id === projectId);
                    
                    if (project) {
                        modalTitle.textContent = project.title;
                        modalDescription.textContent = project.description;
                        
                        modalListContainer.innerHTML = '';
                        modalImageContainer.innerHTML = '';

                        project.images.forEach(image => {
                            const imageItem = document.createElement('div')
                            imageItem.className = 'modal-main-showcase-card';
                            
                            const imgElement = document.createElement('img');
                            imgElement.src = image.src;
                            imgElement.alt = image.alt;

                            imageItem.appendChild(imgElement);
                            modalImageContainer.appendChild(imageItem);
                        });

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

                        setTimeout(() => {
                            canOpenModal = true;
                        }, animationDurationSlow);
                    }
                }
            });

            projectsContainer.appendChild(projectCard);
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
                    document.body.classList.remove('body-modal-open');
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

