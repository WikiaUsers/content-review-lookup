document.addEventListener('DOMContentLoaded', function() {
    var headers = document.querySelectorAll('.collapsible-header');
    headers.forEach(function(header) {
        header.addEventListener('click', function() {
            var content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var headers = document.querySelectorAll('.collapsible-header2'); // Select all elements with class .collapsible-header2
    headers.forEach(function(header) {
        header.addEventListener('click', function() {
            var content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});