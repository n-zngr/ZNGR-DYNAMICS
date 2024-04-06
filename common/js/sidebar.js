document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.sidebar').forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelector('.container-container').classList.add('open');
            console.log('Sidebar request open');
        });
    });

    document.querySelectorAll('.close-nav').forEach(function(link) {
        link.addEventListener('click', function() {
            document.querySelector('.container-container').classList.remove('open');
            console.log('Sidebar request close');
        });
    });
});

