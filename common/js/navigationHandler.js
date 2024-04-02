document.querySelectorAll('.open-nav').forEach(function(button) {
    button.addEventListener('click', function() {
        document.querySelector('.nav').classList.toggle('open');
    });
});

document.querySelectorAll('.close-nav').forEach(function(link) {
    link.addEventListener('click', function() {
        document.querySelector('.nav').classList.remove('open');
    })
})