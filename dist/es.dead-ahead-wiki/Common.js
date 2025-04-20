// Wait for the page to load
$(document).ready(function() {
  // Initialize book gallery
  function initBookGallery() {
    var $bookContainer = $('.book-gallery');
    if (!$bookContainer.length) return; // Exit if no gallery exists

    var currentPage = 0;
    var totalPages = $bookContainer.find('.page').length;
    var $pages = $bookContainer.find('.book-pages');
    var $prevBtn = $bookContainer.find('.prev-btn');
    var $nextBtn = $bookContainer.find('.next-btn');
    var $currentPage = $bookContainer.find('.current-page');

    function updateButtons() {
      $prevBtn.prop('disabled', currentPage === 0);
      $nextBtn.prop('disabled', currentPage === totalPages - 1);
      $currentPage.text(currentPage + 1);
    }

    $nextBtn.on('click', function() {
      if (currentPage < totalPages - 1) {
        currentPage++;
        $pages.css('transform', 'translateX(-' + (currentPage * 100) + '%)');
        updateButtons();
      }
    });

    $prevBtn.on('click', function() {
      if (currentPage > 0) {
        currentPage--;
        $pages.css('transform', 'translateX(-' + (currentPage * 100) + '%)');
        updateButtons();
      }
    });

    updateButtons();
  }

  // Initialize all book galleries on the page
  initBookGallery();
});