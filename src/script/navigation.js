document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    document.querySelectorAll('.nav-button').forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelector('.zngr-menu').classList.add('open');
            body.classList.add('body-modal-open');
        })
    })

    document.querySelectorAll('.menu-close').forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelector('.zngr-menu').classList.remove('open');
            body.classList.remove('body-modal-open');
        })
    })
})