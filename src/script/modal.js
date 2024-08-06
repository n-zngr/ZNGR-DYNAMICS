document.addEventListener('DOMContentLoaded', function() {
    fetch('/src/data/data.json')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.querySelector('.zngr-projects');
        const competenceContainer = document.querySelector('.zngr-competence-container-main');
        const modal = document.getElementById('modal');
        const modalContainer = document.querySelector('.modal-container');
        const modalTitle = document.getElementById('modal-title');
        const modalInfoContainer = document.querySelector('.modal-main-about-info');
        const modalDescription = document.getElementById('modal-description');
        const modalListContainer = document.querySelector('.modal-main-about-list');
        const closeBtn = document.querySelector('.close');
        const modalImageContainer = document.querySelector('.modal-main-showcase');


        const animationDurationSlow = '800';
        let canCloseModal = false;
        let canOpenModal = true;

        const svgFiles = ['IconListDot.svg', 'IconCross.svg', 'IconListArrow.svg', 'IconPlus.svg'];
        const svgElements = [];
        const arrowIcon = 'IconRight.svg';

        svgFiles.forEach(file => {
            fetch(`/src/svg/${file}`)
            .then(response => response.text())
            .then(svgContent => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
                const svgElement = svgDoc.querySelector('svg');

                svgElement.setAttribute('width', '10');
                svgElement.setAttribute('height', '10');
                svgElement.querySelectorAll('path').forEach(path => {
                    path.removeAttribute('fill');
                })

                svgElements.push(svgElement);
            })
        })

        fetch(`/src/svg/${arrowIcon}`)
        .then(response => response.text())
        .then(svgContent => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');

            svgElement.setAttribute('width', '10');
            svgElement.setAttribute('height', '10');
            svgElement.querySelectorAll('path').forEach(path => {
                path.removeAttribute('fill');
            })
        })

        function openModal(content) {
            if (content) {
                modalTitle.textContent = content.title;
                modalDescription.textContent = content.description;

                modalListContainer.innerHTML = '';
                modalImageContainer.innerHTML = '';
                modalInfoContainer.innerHTML = '';

                if (content.link) {
                    const linkItem = document.createElement('a');
                    linkItem.className = 'modal-main-about-info-link';
                    linkItem.href = content.link;
                    linkItem.textContent = 'Visit';
                    modalInfoContainer.appendChild(linkItem);
                }

                if (content.business) {
                    const businessItem = document.createElement('p');
                    businessItem.className = 'modal-main-about-info-business';
                    businessItem.textContent = content.business;
                    modalInfoContainer.appendChild(businessItem);
                }

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
                    content.list.forEach((item, index) => {
                        const listItem = document.createElement('li');
                        listItem.className = 'modal-main-about-list-item';

                        const text = document.createElement('p');
                        text.textContent = item;
                        text.className = 'modal-main-about-list-item-text';
                        
                        const icon = svgElements[index % svgElements.length].cloneNode(true);
                        icon.classList.add('modal-main-about-list-item-svg');

                        listItem.appendChild(icon);
                        listItem.appendChild(text);
                        modalListContainer.appendChild(listItem);
                    });
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

        projectsContainer.addEventListener('click', function(event) {
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

        competenceContainer.addEventListener('click', function(event) {
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

        closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    });
});

