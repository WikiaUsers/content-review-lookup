/* Any JavaScript here will be loaded for all users on every page load. */


/* ========== Banner Carousel ========== */

mw.hook('wikipage.content').add(function ($content) {
	if ($content.data('bannerCarouselInitialized')) return;
	$content.data('bannerCarouselInitialized', true);
	
	var $carousels = $content.find('.banner-carousel');
	if (!$carousels.length) return;
	
	$carousels.each(function () {
		var $this = $(this);
		var track = $this.find('.banner-carousel__track')[0];
		var slides = $this.find('.banner-carousel__wrapper').toArray();
		var contents = $this.find('.banner-carousel__content-wrapper').toArray();
		var dots = $this.find('.banner-carousel__dot').toArray();
		var prev = $this.find('.banner-carousel__arrow-left')[0];
		var next = $this.find('.banner-carousel__arrow-right')[0];
		var container = $this.find('.banner-carousel__container')[0];
		
		if (!track || slides.length === 0) return;
		
		var total = slides.length;
		var slideWidth = 100; // percent
		var index = 0;
		var timer = null;
		var isPaused = false;
		
		// Clone all slides for continuous scroll
		var clones = slides.map(function (s) {
			return s.cloneNode(true);
		});
		clones.forEach(function (c) {
			track.appendChild(c);
		});
		
		var totalSlides = total * 2;
		
		function updateContent(i) {
			for (var j = 0; j < contents.length; j++) {
				contents[j].classList.toggle(
					'active',
					j === (i % total)
				);
			}
		}
		
		function updateDots(i) {
			for (var j = 0; j < dots.length; j++) {
				dots[j].classList.toggle('active', j === (i % total));
			}
		}
		
		function goToSlide(i, smooth) {
			if (smooth === undefined) smooth = true;
			track.style.transition = smooth ? 'transform 0.6s ease' : 'none';
			track.style.transform = 'translateX(-' + (i * slideWidth) + '%)';
			index = i;
			
			updateDots(i);
			updateContent(i);
		}
		
		function nextSlide() {
			index++;
			goToSlide(index);
			
			// When carousel scrolled halfway (through first set), reset to start
			if (index >= total) {
				setTimeout(function () {
					track.style.transition = 'none';
					index = 0;
					track.style.transform = 'translateX(0)';
				}, 600);
			}
		}
		
		function prevSlide() {
			if (index <= 0) {
				track.style.transition = 'none';
				index = total;
				track.style.transform = 'translateX(-' + (index * slideWidth) + '%)';
				requestAnimationFrame(function () {
					index--;
					goToSlide(index);
				});
			} else {
				index--;
				goToSlide(index);
			}
		}
		
		function startAutoPlay() {
			stopAutoPlay();
			timer = setInterval(function () {
				if (!isPaused) nextSlide();
			}, 5000);
		}
		
		function stopAutoPlay() {
			if (timer) clearInterval(timer);
			timer = null;
		}
		
		if (next) next.addEventListener('click', function () {
			nextSlide();
			startAutoPlay();
		});
		if (prev) prev.addEventListener('click', function () {
			prevSlide();
			startAutoPlay();
		});
		for (var i = 0; i < dots.length; i++) {
			(function (i) {
				dots[i].addEventListener('click', function () {
					goToSlide(i);
					startAutoPlay();
				});
			})(i);
		}
		
		if (container) {
			container.addEventListener('mouseenter', function () {
				isPaused = true;
			});
			container.addEventListener('mouseleave', function () {
				isPaused = false;
			});
		}
		
		// Initialize
		goToSlide(0, false);
		startAutoPlay();
	});
});