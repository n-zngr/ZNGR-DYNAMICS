const thumbnail = document.querySelector('.thumbnail');
const description = document.querySelector('.description');

description.addEventListener('mouseenter', () => {
    thumbnail.style.width = '40%';
    description.style.width = '60%';
});

description.addEventListener('mouseleave', () => {
    thumbnail.style.width = '';
    description.style.width = '';
});