document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.sidebar').forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('open');
            console.log('Sidebar request open');
        });
    });

    document.querySelectorAll('.close-nav').forEach(function(link) {
        link.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.remove('open');
            console.log('Sidebar request close');
        });
    });
});