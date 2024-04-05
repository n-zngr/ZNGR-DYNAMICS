const thumbnail = document.querySelector('.thumbnail');
const description = document.querySelector('.description');
let clicked = false;

description.addEventListener('click', () => {
    if (!clicked) {
        thumbnail.classList.add('thumbnail_hidden');
        thumbnail.style.left = '-100%';
        thumbnail.style.width = '0%';
        description.style.width = '100%';
        thumbnail.style.margin = '0';
        setTimeout(() => {
            thumbnail.style.padding = '0';
        }, 100)
        description.style.marginLeft = 'auto';
    } else {
        thumbnail.style.padding = '';
        thumbnail.style.margin = '';
        thumbnail.style.width = '';
        description.style.width = '';
        description.style.marginLeft = '';
        thumbnail.style.position = '';
        setTimeout(() => {
            thumbnail.style.left = '';
        }, 100);
    }
    clicked = !clicked;
});