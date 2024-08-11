<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    var imageContainer = document.querySelector('.image-container');
    var images = document.querySelectorAll('.book-image');
    var nextPageButton = document.querySelector('.next-page');
    var prevPageButton = document.querySelector('.prev-page');
    var currentPage = 0;

    function updateGallery() {
      var offset = -(currentPage * 2 * 300); // 2 images per page, each 300px wide
      imageContainer.style.transform = 'translateX(' + offset + 'px)';
    }

    nextPageButton.addEventListener('click', function() {
      if (currentPage < (images.length / 2) - 1) {
        currentPage++;
        updateGallery();
      }
    });

    prevPageButton.addEventListener('click', function() {
      if (currentPage > 0) {
        currentPage--;
        updateGallery();
      }
    });

    updateGallery(); // Initialize position
  });
</script>