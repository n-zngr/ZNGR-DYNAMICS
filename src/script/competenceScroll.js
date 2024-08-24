export function resetScrollPosition() {
    const containerMain = document.querySelector('.zngr-competence-container-main');
    if (containerMain) {
        setTimeout(() => {
            const maxScrollLeft = containerMain.scrollWidth - containerMain.clientWidth;
            containerMain.style.scrollBehavior = 'auto';
            containerMain.scrollLeft = maxScrollLeft;
        }, 0)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const containerMain = document.querySelector('.zngr-competence-container-main');
    const slideLeftBtn = document.getElementById('slideLeft');
    const slideRightBtn = document.getElementById('slideRight');

    const cardWidth = 360;
    const gap = 16;
    const scrollAmount = cardWidth + gap;


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