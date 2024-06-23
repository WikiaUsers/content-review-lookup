document.addEventListener('DOMContentLoaded', function() {
    var headers = document.querySelectorAll('.collapsible-header');

    headers.forEach(function(header) {
        header.addEventListener('click', function() {
            var content = this.nextElementSibling;

            // Toggle display of the content
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }

            // Collapse all other sections
            var allContents = document.querySelectorAll('.collapsible-content');
            allContents.forEach(function(item) {
                if (item !== content && item.style.display === 'block') {
                    item.style.display = 'none';
                }
            });
        });

        // Prevent clicking on content from collapsing the section
        var content = header.nextElementSibling;
        if (content) {
            content.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    var headers = document.querySelectorAll('.collapsible-header2');

    headers.forEach(function(header) {
        header.addEventListener('click', function() {
            var content = this.nextElementSibling;

            // Toggle display of the content
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }

            // Collapse all other sections
            var allContents = document.querySelectorAll('.collapsible-content2');
            allContents.forEach(function(item) {
                if (item !== content && item.style.display === 'block') {
                    item.style.display = 'none';
                }
            });
        });

        // Prevent clicking on content from collapsing the section
        var content = header.nextElementSibling;
        if (content) {
            content.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        }
    });
});