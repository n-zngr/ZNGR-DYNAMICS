document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.nav-header-button');
    
    menuButton.addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('expanded');
    })

    const mouseMove = e => {
        const { currentTarget: target } = e;
        
        const rect = target.getBoundingClientRect(), 
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        target.style.setProperty("--mouseX", `${x}px`);
        target.style.setProperty("--mouseY", `${y}px`);
    }

    for(const navItem of document.querySelectorAll('.nav-main-item, .nav-main-holder-item, .nav-main-item-button-item')) {
        navItem.onmousemove = e => mouseMove(e);
    }

    const overlay = document.querySelector('.overlay');

    window.addEventListener('click', (event) => {
        const nav = document.querySelector('.nav');
        if (event.target === overlay) {
            nav.classList.remove('expanded');
        }
    });
});