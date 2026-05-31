importArticles({
	type: "script",
	articles: [
		"u:nkch:MediaWiki:ExploreMenuIcons.js",
		"u:nkch:MediaWiki:nkchSlider.js",
		"u:nkch:MediaWiki:Snippet/ExternalLinksInNewWindow.js",
		"u:nkch:MediaWiki:Snippet/SpecificLinksInNewWindow.js"
	]
});

importArticles({
	type: "script",
	articles: [
		"MediaWiki:TabberTiles.js",
		"MediaWiki:ExpansiveInteractionTable.js",
		"MediaWiki:ImgSize.js",
		"MediaWiki:HideRowsTable.js"
	]
});

$(function() {
	importArticles({
		type: "script",
		articles: [
			"dev:Countdown.js"
		]
	});
});

/* === Слайдер ивентов на главной === */
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

    resetAutoplay();
}

$(function() {
    initDayrSlider();

    var observer = new MutationObserver(function() {
        initDayrSlider();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Slider.js"
    ]
});