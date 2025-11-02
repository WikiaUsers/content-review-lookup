document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.popular-content-slider');
  if (!slider) return;

  const scrollAmount = slider.offsetWidth; // Scroll amount equals one full container width
  let scrollPosition = 0;

  function slide() {
    scrollPosition += scrollAmount;
    if (scrollPosition >= slider.scrollWidth) {
      scrollPosition = 0; // Loop back
    }
    slider.scrollTo({left: scrollPosition, behavior: 'smooth'});
  }

  setInterval(slide, 5000); // Slide every 5 seconds
});