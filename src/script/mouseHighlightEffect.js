document.addEventListener('DOMContentLoaded', () => {
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
});