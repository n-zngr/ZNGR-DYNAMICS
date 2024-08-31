document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelectorAll('.nav-header-button, .nav-main-item');

    navToggle.forEach(navToggleElement => {
        navToggleElement.addEventListener('click', () => {
            const nav = document.querySelector('.nav');
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

    for(const hoverItem of document.querySelectorAll('.nav-main-item, .nav-main-holder-item, .nav-main-item-button-item, .footer-logo-item')) {
        hoverItem.onmousemove = e => mouseMove(e);
    }

    const overlay = document.querySelector('.overlay');

    window.addEventListener('click', (event) => {
        const nav = document.querySelector('.nav');
        if (event.target === overlay) {
            nav.classList.remove('expanded');
        }
    });
    /* Attempt to create hover for header-background-item, due to absolute position, this needs to be worked out.
    for(const hoverItem of document.querySelectorAll('.zngr-header-background-item')) {
        hoverItem.onmousemove = e => mouseMove(e);
    }*/
});