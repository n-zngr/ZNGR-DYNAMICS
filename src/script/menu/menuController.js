document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelectorAll('.nav-header-button, .nav-main-item');
    const overlay = document.querySelector('.overlay');
    const nav = document.querySelector('.nav');

    navToggle.forEach(navToggleElement => {
        navToggleElement.addEventListener('click', () => {
            document.body.classList.toggle('body-modal-open');
            nav.classList.toggle('expanded');
        });
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === overlay) {
            nav.classList.remove('expanded');
            document.body.classList.remove('body-modal-open');
        }
    });
});