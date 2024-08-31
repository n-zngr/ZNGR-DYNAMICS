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
        
        if (elementTop < windowHeight * 0.9) { // 90% of viewport
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }
    });
};

//Intiliazes scroll Animation to be used in other scripts
export const initializeScrollAnimation = () => {
    initAnimationStyles(document.querySelectorAll('.animate-on-scroll'));
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
};
