$(document).ready(function () {
    var slides = document.getElementById('slideshow-0').getElementsByClassName('thumbimage');
    while (slides.length > 0) {
        slides[0].classList.add('image', 'lightbox');
        slides[0].classList.remove('thumbimage');
      }
});