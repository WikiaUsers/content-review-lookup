mw.loader.using('mediawiki.util').then(function () {
  jQuery(function ($) {
    //-------Statistics Counter STARTS HERE-------//

    function animateCounter(element, end, duration) {
      const start = 0;
      const range = end - start;
      const startTime = performance.now();

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 5);
      }

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentValue = Math.floor(start + easedProgress * range);
        element.textContent = currentValue.toLocaleString('en-US');

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    }

    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const endValue = parseInt(element.getAttribute('data-target').replace(/,/g, ''), 10);
          animateCounter(element, endValue, 4000);
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.5,
    });

    counters.forEach(counter => {
      counter.textContent = "0";
      observer.observe(counter);
    });

    //-------Statistics Counter ENDS HERE-------//

    //-------Custom Gallery Slider STARTS HERE-------//

    document.querySelectorAll(".slider-container").forEach((container) => {
      const slider = container.querySelector(".slider");
      const slides = slider.querySelectorAll(".slide");
      const thumbnails = container.querySelectorAll(".thumb-wrapper");

      let currentIndex = 0;

      function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        thumbnails.forEach((thumb, i) => {
       thumb.querySelector(".thumbnail").classList.toggle("active", i === currentIndex);
      });
     }

     function goToSlide(index) {
       currentIndex = index;
       updateSlider();
     }

     function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
     }

     thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
        goToSlide(index);
     });
   });

  setInterval(nextSlide, 5000);
});

    //-------Custom Gallery Slider ENDS HERE-------//
  });
});