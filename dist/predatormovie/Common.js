/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
  const container = document.getElementById('custom-carousel');
  const scrollAmount = 710;

  $('.carousel-arrow.left').on('click', function() {
    container.scrollLeft -= scrollAmount;
  });

  $('.carousel-arrow.right').on('click', function() {
    container.scrollLeft += scrollAmount;
  });
});