document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelectorAll('.nav-header-button, .nav-main-item');
    const overlay = document.querySelector('.overlay');
    const nav = document.querySelector('.nav');
    const navMain = document.querySelector('.nav-main');

    navToggle.forEach(navToggleElement => {
        navToggleElement.addEventListener('click', () => {
            document.body.classList.toggle('body-modal-open');
            nav.classList.toggle('expanded');
        });
    });

    const mouseMove = e => {
        const { currentTarget: target } = e;
        
        const rect = target.getBoundingClientRect(), 
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        target.style.setProperty("--mouseX", `${x}px`);
        target.style.setProperty("--mouseY", `${y}px`);
    }

    for(const hoverItem of document.querySelectorAll('.nav-main-item, .nav-main-holder-item, .nav-main-item-button-item, .footer-logo-item, .zngr-contact-button')) {
        hoverItem.onmousemove = e => mouseMove(e);
    }

    window.addEventListener('click', (event) => {
        if (event.target === overlay) {
            nav.classList.remove('expanded');
            document.body.classList.remove('body-modal-open');
        }
    });
    /* Attempt to create hover for header-background-item, due to absolute position, this needs to be worked out.
    for(const hoverItem of document.querySelectorAll('.zngr-header-background-item')) {
        hoverItem.onmousemove = e => mouseMove(e);
    }*/
});

//!!! Fix nav by setting height to auto on open, on close set it to 0px. 