//Zombipedia
document.addEventListener('DOMContentLoaded', function() {
    var currentPage = 1;
    var pages = document.querySelectorAll('.book-page');
    var totalPages = pages.length;

    function showPage(pageNumber) {
        // Hide all pages
        pages.forEach(function(page) {
            page.classList.remove('active-page');
        });

        // Show the specified page
        var pageToShow = document.getElementById('page' + pageNumber);
        if (pageToShow) {
            pageToShow.classList.add('active-page');
        }
    }

    // Show the first page initially
    showPage(currentPage);

    // Event listeners for buttons
    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });
});