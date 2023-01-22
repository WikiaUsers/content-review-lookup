const slides = Array.from(document.getElementsByClassName('thumbimage'));
slides.forEach((element) => {
  element.classList.add('image', 'lightbox');
  element.classList.remove('thumbimage');
});