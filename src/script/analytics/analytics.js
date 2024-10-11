document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelectorAll('nav-header-button')
    menuButton.onclick = () => umami.track('Menu Button');

    const menuGithubButton = document.getElementById('menu-github-button');
    menuGithubButton.onclick = () => umami.track('Menu Github Button');

    const menuContactButton = document.getElementById('menu-contact-button');
    menuContactButton.onclick = () => umami.track('Menu Contact Button');

    const projectCard = document.querySelectorAll('project-card');
    projectCard.onclick = () => umami.track('Project Card');

    const competenceCard = document.querySelectorAll('competence-card');
    competenceCard.onclick = () => umami.track('Competence Card');

    const contactButton = document.querySelectorAll('zngr-contact-button');
    contactButton.onclick = () => umami.track('Contact Button');
});