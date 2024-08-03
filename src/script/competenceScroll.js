document.addEventListener('DOMContentLoaded', function () {
    const containerMain = document.querySelector('.zngr-competence-container-main');
    const slideLeftBtn = document.getElementById('slideLeft');
    const slideRightBtn = document.getElementById('slideRight');

    const scrollAmount = 360;

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