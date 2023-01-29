var slides = document.getElementsByClassName('thumbimage');
while (slides.length > 0) {
    slides[0].classList.add('image', 'lightbox');
    slides[0].classList.remove('thumbimage');
  }