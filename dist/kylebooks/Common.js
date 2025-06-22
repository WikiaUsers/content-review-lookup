$(function () {
  var slides = $('.image-slider .slide');
  var current = 0;

  function showSlide(index) {
    slides.removeClass('active');
    slides.eq(index).addClass('active');
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  if (slides.length > 1) {
    showSlide(current);
    setInterval(nextSlide, 3000); // Change image every 3 seconds
  }
});