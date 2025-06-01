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