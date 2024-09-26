import { loadSvgFiles } from "./svgLoader.js";
import { highlightEffect } from "../components/highlightButton.js";
import { competenceModal } from "../competence/modalController.js";
import { techIcons, techNames } from "../techIcons/techIconsLoader.js";

document.addEventListener('DOMContentLoaded', function() {
    fetch('/src/data/data.json')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.querySelector('.zngr-projects');
        const modal = document.getElementById('modal');
        const modalContainer = document.querySelector('.modal-container');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.querySelector('.about-description');
        const modalInfoContainer = document.querySelector('.about-info');
        const modalListContainer = document.querySelector('.about-list');
        const modalFooter = document.querySelector('.about-footer');
        const closeBtn = document.querySelector('.close');
        const modalImageContainer = document.querySelector('.modal-main-showcase');


        const animationDurationSlow = '800';
        let canCloseModal = false;
        let canOpenModal = true;

        competenceModal();

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
        });

        function openModal(content, svgElements) {
            if (content) {
                modalListContainer.innerHTML = '';
                modalImageContainer.innerHTML = '';
                modalInfoContainer.innerHTML = '';
                modalDescription.innerHTML = '';
                modalFooter.innerHTML = '';

                modalTitle.textContent = content.title.toUpperCase();

                if (content.description) {
                    content.description.forEach((description, index) => {
                        const descriptionElement = document.createElement('p');
                        descriptionElement.textContent = description;
                        if (index === 0) {
                            descriptionElement.className = 'about-description-header';
                        } else {
                            descriptionElement.className = 'about-description-main';
                        }
                        modalDescription.appendChild(descriptionElement);
                    });
                }

                if (content.link) {
                    const linkDiv = document.createElement('a');
                    linkDiv.className = 'about-info-link';
                    linkDiv.target = '_blank';
                    linkDiv.href = content.link;

                    const linkItem = document.createElement('p');
                    linkItem.className = 'about-info-link-text';
                    linkItem.textContent = 'Visit';

                    const linkSvg = svgElements['IconRight.svg'].cloneNode(true);
                    linkSvg.classList.add('about-info-link-svg');

                    linkDiv.appendChild(linkItem);
                    linkDiv.appendChild(linkSvg);
                    modalInfoContainer.appendChild(linkDiv);
                }

                if (content.business) {
                    const businessDiv = document.createElement('div');
                    businessDiv.className = 'about-info-business';
                    businessDiv.textContent = content.business;

                    modalInfoContainer.appendChild(businessDiv);
                }

                if (content.images) {
                    content.images.forEach(image => {
                        const imageItem = document.createElement('div');
                        imageItem.className = 'showcase-card';

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
                        listItem.className = 'about-list-item';

                        const listItemText = document.createElement('p');
                        listItemText.textContent = item;
                        listItemText.className = 'about-list-item-text';
                        
                        const listItemIcon = svgElements[svgFiles[index % svgFiles.length]].cloneNode(true);
                        listItemIcon.classList.add('about-list-item-svg');

                        listItem.appendChild(listItemIcon);
                        listItem.appendChild(listItemText);
                        modalListContainer.appendChild(listItem);
                    });
                }
                
                if (content.tech) {
                    content.tech.forEach(tech => {
                        const techName = tech.trim().toLowerCase();
                        if (techIcons[techName]) {
                            const techItem = document.createElement('div');
                            techItem.classList.add('about-footer-item');
                            techItem.setAttribute('data-tooltip', techNames[techName]);
                            techItem.innerHTML = `
                                <img src="${techIcons[techName]}" alt="${techNames[techName]}" height="24" width="24">
                            `;
                            modalFooter.appendChild(techItem);
                        }
                    });
                }

                highlightEffect();

                /*competenceModal();*/

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

