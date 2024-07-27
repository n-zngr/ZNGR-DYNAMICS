document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-button').forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelector('.zngr-menu').classList.add('open')
        })
    })

    document.querySelectorAll('.menu-close').forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelector('.zngr-menu').classList.remove('open')
        })
    })
})