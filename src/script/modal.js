import { loadSvgFiles } from "./loadSvg.js";

document.addEventListener('DOMContentLoaded', function() {
    fetch('/src/data/data.json')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.querySelector('.zngr-projects');
        const competenceContainer = document.querySelector('.zngr-competence-container-main');
        const modal = document.getElementById('modal');
        const modalContainer = document.querySelector('.modal-container');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.querySelector('.modal-main-about-description');
        const modalInfoContainer = document.querySelector('.modal-main-about-info');
        const modalListContainer = document.querySelector('.modal-main-about-list');
        const closeBtn = document.querySelector('.close');
        const modalImageContainer = document.querySelector('.modal-main-showcase');

        const animationDurationSlow = '800';
        let canCloseModal = false;
        let canOpenModal = true;

        loadSvgFiles(svgElements => {
            projectsContainer.addEventListener('click', function(event) {
                if (event.target.closest('.project-card, .project-card-big')) {
                    const projectCard = event.target.closest('.project-card, .project-card-big');
                    if (canOpenModal) {
                        canOpenModal = false;
                        canCloseModal = false;
                        const projectId = projectCard.getAttribute('data-project-id');
                        const project = data.projects.find(p => p.id === projectId);
                        openModal(project, svgElements);
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
                        openModal(competence, svgElements);
                    }
                }
            });
        });

        function openModal(content, svgElements) {
            if (content) {
                modalListContainer.innerHTML = '';
                modalImageContainer.innerHTML = '';
                modalInfoContainer.innerHTML = '';
                modalDescription.innerHTML = '';

                modalTitle.textContent = content.title.toUpperCase();
                content.description.forEach((description, index) => {
                    const descriptionElement = document.createElement('p');
                    descriptionElement.textContent = description;
                    if (index === 0) {
                        descriptionElement.className = 'modal-main-about-description-header';
                    } else {
                        descriptionElement.className = 'modal-main-about-description-main';
                    }
                    modalDescription.appendChild(descriptionElement);
                })

                if (content.link) {
                    const linkDiv = document.createElement('a');
                    linkDiv.className = 'modal-main-about-info-link';
                    linkDiv.href = content.link;

                    const linkItem = document.createElement('p');
                    linkItem.className = 'modal-main-about-info-link-text';
                    linkItem.textContent = 'Visit';

                    const linkSvg = svgElements['IconRight.svg'].cloneNode(true);
                    linkSvg.classList.add('modal-main-about-info-link-svg');

                    linkDiv.appendChild(linkItem);
                    linkDiv.appendChild(linkSvg);
                    modalInfoContainer.appendChild(linkDiv);
                }

                if (content.business) {
                    const businessDiv = document.createElement('div');
                    businessDiv.className = 'modal-main-about-info-business';
                    businessDiv.textContent = content.business;

                    modalInfoContainer.appendChild(businessDiv);
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
                
                const svgFiles = ['IconListDot.svg', 'IconCross.svg', 'IconListArrow.svg', 'IconPlus.svg'];

                if (content.list) {
                    content.list.forEach((item, index) => {
                        const listItem = document.createElement('li');
                        listItem.className = 'modal-main-about-list-item';

                        const text = document.createElement('p');
                        text.textContent = item;
                        text.className = 'modal-main-about-list-item-text';
                        
                        const icon = svgElements[svgFiles[index % svgFiles.length]].cloneNode(true);
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
    
        function closeModal() {
            if (canCloseModal) {
                modalContainer.classList.remove('modal-open');
                modal.style.overflow = 'hidden';
                document.body.classList.remove('body-modal-open');
                setTimeout(() => {
                    modal.classList.remove('modal-open');
                    modal.removeAttribute('style');
                    modalContainer.classList.remove('modal-open');
                    document.body.classList.remove('body-modal-open');
                    canCloseModal = false;
                    canOpenModal = true;
                }, animationDurationSlow);
            }
        }

        closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    });
});

