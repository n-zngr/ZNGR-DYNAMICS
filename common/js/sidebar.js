document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.sidebar').forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelector('.nav').classList.add('open');
            document.querySelector('.sidebar').style.display = 'none';
            console.log('Sidebar request open');
        });
    });

    document.querySelectorAll('.close-nav').forEach(function(link) {
        link.addEventListener('click', function() {
            document.querySelector('.nav').classList.remove('open');
            document.querySelector('.sidebar').style.display = '';
            console.log('Sidebar request close');
        });
    });
});