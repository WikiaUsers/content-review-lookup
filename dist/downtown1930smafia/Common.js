//-------Custom Timed Slider STARTS HERE-------//

function downtownAnimate(event) {
    var $container = $(event.target);
    var $slides = $container.children();
    var $current = $slides.filter('.downtown-active');
    var currentIndex = $slides.index($current);
    var nextIndex = (currentIndex + 1) % $slides.length;

    $current.removeClass('downtown-active');
    $current.find('.cursor').remove();
    $slides.eq(nextIndex).addClass('downtown-active').append('<span class="cursor"></span>');
}


function startTSAnimation($container, onComplete) {
      var $slides = $container.children();
      var delayms = parseInt($container.attr('data-delay-ms')) || 200;

      if ($slides.length > 1) {
        $container.data('delayms', delayms);
        $container.on('downtownAnimate', downtownAnimate);

        let currentIndex = 0;
        let interval = window.setInterval(function () {
          if (currentIndex < $slides.length - 1) {
            $container.trigger('downtownAnimate');
            currentIndex++;
          } 
          else {
            clearInterval(interval);
            $slides.find('.cursor').remove();
            $slides.removeClass('downtown-active');
            let $final = $slides.last();
            $final.addClass('downtown-active');
            $final.append('<span class="cursor"></span>');

            if (typeof onComplete === 'function') {
              onComplete(); 
            }
          }
        }, delayms);
      }
    }

jQuery(function ($) {
  const $typing = $('#typing-stage');
  const $fontTransition = $('#font-stage'); 
  const $underline = $('#underline-stage'); 
  const $neon = $('#neon-stage'); 

  startTSAnimation($typing, function () {
    $typing.hide();     
    $fontTransition.show();      
    startTSAnimation($fontTransition, function() {
      $fontTransition.hide();
      $underline.show();
      startTSAnimation($underline, function() { 
        $underline.hide();
        $neon.show();
        startTSAnimation($neon, function() {
          $neon.find('.cursor').remove(); 
        });
      });
    });
  });
});

//-------Custom Timed Slider ENDS HERE-------//

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
    element.textContent = currentValue.toLocaleString('en-IN');

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
  counter.textContent = "0"; // Set initial display
  observer.observe(counter);
});

//-------Statistics Counter ENDS HERE-------//