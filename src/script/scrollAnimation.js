export const initAnimationStyles = (elements) => {
    elements.forEach(element => {
        element.style.transform = 'translateY(128px)';
        element.style.opacity = '0';
        element.style.transition = 'transform var(--anim_duration-slow), opacity var(--anim_duration-slow)';
    });
};

export const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.95) { // Element is 90% in view
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }
    });
};

//Intiliazes scroll Animation to be used in other scripts
export const initializeScrollAnimation = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    initAnimationStyles(elements);
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    window.addEventListener('load', animateOnScroll);
};