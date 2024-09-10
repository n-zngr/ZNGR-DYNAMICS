export function resetScrollPosition() {
    const containerMain = document.querySelector('.zngr-competence-container-main');
    if (containerMain) {
        setTimeout(() => {
            const scroll = 17;
            const maxScrollLeft = containerMain.scrollWidth - containerMain.clientWidth;
            const isAtRightEnd = Math.ceil(containerMain.scrollLeft) >= maxScrollLeft - scroll;
            containerMain.style.scrollBehavior = 'auto';
            /*containerMain.scrollLeft = maxScrollLeft;
            console.log(`At right end: ${isAtRightEnd}`);*/
            
            if (isAtRightEnd) {
                containerMain.scrollBy({
                    left: scroll, 
                    behavior: 'auto'
                });
            };
        }, 0)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const containerMain = document.querySelector('.zngr-competence-container-main');
    const slideLeftBtn = document.getElementById('slideLeft');
    const slideRightBtn = document.getElementById('slideRight');

    const cardWidth = 300;
    const scrollAmount = cardWidth;

    slideLeftBtn.addEventListener('click', () => {
        containerMain.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    slideRightBtn.addEventListener('click', () => {
        containerMain.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});