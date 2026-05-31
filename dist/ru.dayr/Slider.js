/* === Слайдер ивентов на главной === */
function initDayrTimer() {
    var timerEl = document.querySelector('.dayr-event-slider__timer');
    if (!timerEl || timerEl.dataset.timerStarted) return;
    timerEl.dataset.timerStarted = 'true';

    var deadline = new Date(timerEl.getAttribute('data-deadline')).getTime();

    function updateTimer() {
        var diff = deadline - Date.now();
        if (diff <= 0) {
            timerEl.textContent = 'Событие завершено';
            return;
        }
        var d = Math.floor(diff / 86400000);
        var h = Math.floor((diff % 86400000) / 3600000);
        var m = Math.floor((diff % 3600000) / 60000);
        var s = Math.floor((diff % 60000) / 1000);
        timerEl.textContent = d + 'д. ' + h + 'ч. ' + m + 'м. ' + s + 'с.';
    }
    updateTimer();
    setInterval(updateTimer, 1000);
}

function initDayrSlider() {
    var slider = document.getElementById('dayr-event-slider');
    if (!slider || slider.dataset.initialized) return;
    slider.dataset.initialized = 'true';

    var slides = slider.querySelectorAll('.dayr-event-slider__slide');
    var dotsContainer = document.getElementById('dayr-event-slider-dots');
    if (!slides.length || !dotsContainer) return;

    var current = 0;
    var total = slides.length;
    var autoplayTimer;

    slides.forEach(function(_, i) {
        var dot = document.createElement('div');
        dot.className = 'dayr-event-slider__dot' + (i === 0 ? ' dayr-event-slider__dot--active' : '');
        dot.addEventListener('click', function() { goTo(i); resetAutoplay(); });
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        slides[current].classList.remove('dayr-event-slider__slide--active');
        dotsContainer.children[current].classList.remove('dayr-event-slider__dot--active');
        current = (index + total) % total;
        slides[current].classList.add('dayr-event-slider__slide--active');
        dotsContainer.children[current].classList.add('dayr-event-slider__dot--active');
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(function() { goTo(current + 1); }, 5000);
    }

    slider.querySelector('.dayr-event-slider__btn--prev').addEventListener('click', function(e) {
        e.stopPropagation();
        goTo(current - 1);
        resetAutoplay();
    });

    slider.querySelector('.dayr-event-slider__btn--next').addEventListener('click', function(e) {
        e.stopPropagation();
        goTo(current + 1);
        resetAutoplay();
    });

    slides.forEach(function(slide) {
        slide.addEventListener('click', function(e) {
            if (!e.target.closest('.dayr-event-slider__btn') && !e.target.closest('.dayr-event-slider__dot')) {
                var href = slide.getAttribute('data-href');
                if (href) window.location.href = href;
            }
        });
    });

    initDayrTimer();
    resetAutoplay();
}

$(function() {
    initDayrSlider();
    initDayrTimer();
    setTimeout(initDayrSlider, 500);
    setTimeout(initDayrTimer, 500);
    setTimeout(initDayrSlider, 1500);
    setTimeout(initDayrTimer, 1500);

    var observer = new MutationObserver(function() {
        initDayrSlider();
        initDayrTimer();
    });
    observer.observe(document.body, { childList: true, subtree: true });
});