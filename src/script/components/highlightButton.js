export function highlightEffect() {
    const highlightButtons = document.querySelectorAll('.about-info-link');
    
    highlightButtons.forEach((highlightButton) => {
        let cooldown = false;
        let hoverInterval;

        function activateEffect() {
            if (!cooldown) {
                highlightButton.classList.add('hover');
                cooldown = true;
                setTimeout(() => {
                    highlightButton.classList.remove('hover');
                    setTimeout(() => {
                        cooldown = false;
                        if (hoverInterval) {
                            activateEffect();
                        }
                    }, 2000);
                }, 500);
            }
        }

        highlightButton.addEventListener('mouseenter', () => {
            hoverInterval = setInterval(activateEffect, 500);
            activateEffect(); 
        });

        highlightButton.addEventListener('mouseleave', () => {
            clearInterval(hoverInterval);
            hoverInterval = null;
        });
    });
}

document.addEventListener('DOMContentLoaded', highlightEffect);