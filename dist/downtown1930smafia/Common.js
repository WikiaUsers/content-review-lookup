/********** 
THE MAIN CSS OF THE FANDOM WIKI LIES IN HERE. THIS NOTE IS FOR EVERYONE EXCEPT THE WIKI BUREAUCRATS AND OWNER.
CHANGING THE CODE WITHOUT ANY PERMISSION OR APPROVAL FROM THE WIKI'S CURRENT BUREAUCRAT WILL RESULT IN A TEMPORARY BAN OF 2 DAYS. PLEASE DO NOT GIVE EXCUSES OF EDITING THE CODE ACCIDENTALLY OR TAMPERING / MESSING WITH THE FONT FILES.
PROCEED AT YOUR OWN RISK. 
**********/

importArticles({
	type: 'script',
	articles: [
	    'u:dev:MediaWiki:AutoDesktop.js',
	    'u:dev:MediaWiki:PatrolPanel.js',
	]
});

/********* UTC Clock Format Starts HERE **********/
(function () {
	const now = new Date();

	const localTime = now.toLocaleTimeString([], {
		hour: "2-digit",
	    minute: "2-digit",
	    second: "2-digit",
	    hour12: false
	});

	const weekday = now.toLocaleDateString(undefined, {
    	weekday: "long"
	});

	const localDate = now.toLocaleDateString(undefined, {
	    day: "2-digit",
	    month: "short",
	    year: "numeric"
	});

	window.DisplayClockJS = {
		format: `%2H : %2M : %2S | ${weekday} | %B %2d, %Y`,
	    hoverText:
	      `In this town, timing is everything. Miss it, and you’re yesterday’s news. ` +
	      `Local time: ${localTime} | ${weekday}, ${localDate}`
	};
})();
/********* UTC Clock Format Ends HERE **********/

mw.loader.using("mediawiki.util").then(function () {
	jQuery(function ($) {

    // Text Sequence Animation STARTS HERE

    function advanceFrame(){
    	const $sequence = $(this);
    	const $currentFrame = $sequence.children(".is-visible");
    	const $nextFrame = $currentFrame.next();

    	if ($nextFrame.length === 0) {
    		clearInterval($sequence.data("intervalId"));
        	return;
    	}

		$currentFrame.removeClass("is-visible");
    	$nextFrame.addClass("is-visible");
    }
    
    $(".text-sequence").each(function(){
    	const $sequence = $(this);
    	const delayMs =	parseInt($sequence.data("delay-ms"), 10) || 2000;
    	$sequence.on("advanceFrame", advanceFrame);
    	
    	const intervalId = setInterval(function(){
    		$sequence.trigger("advanceFrame");
    	}, delayMs);
    	
    	$sequence.data("intervalId", intervalId);
    });

    // Text Sequence Animation ENDS HERE

    // Random Letter Reveal STARTS HERE
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+`-=";

    const element = document.getElementById("scramble");

    if (element){
    	const targetText = element.textContent.trim();

    	let revealIndex = 0;
    	let frame = 0;

    	const scramblePerChar = 10;
    	const frameDelay = 30;

    	let hasAnimated = false;

    	function scrambleFrame(){
    		let display = "";
    		
    		for (let i = 0; i < targetText.length; i++){
    			if (i < revealIndex){
    				display += targetText[i];
        		} 
        		else if (targetText[i] === " "){
        			display += " ";
        		} 
        		else {
        			const randChar =
		            chars[Math.floor(Math.random() * chars.length)];
		            display += randChar;
        		}
        	}

        element.textContent = display;
        frame++;

        if (frame % scramblePerChar === 0){
        	revealIndex++;
        }

        if (revealIndex <= targetText.length){
        	setTimeout(scrambleFrame, frameDelay);
        }
      }

      const observer = new IntersectionObserver((entries, observer) => {entries.forEach((entry) => {
      	if (entry.isIntersecting && !hasAnimated) {
      		hasAnimated = true;
        	scrambleFrame();
            observer.unobserve(entry.target);
      	}
      });
    },
    {
    	root: null,
        threshold: 0.5
	}
    );
    observer.observe(element);
    }

    // Random Letter Reveal ENDS HERE

    // Statistics Counter STARTS HERE
    function animateCounter(element, end, duration) {
    	const start = 0;
    	const range = end - start;
    	const startTime = performance.now();

    	function easeOutCubic(t) {
    		return 1 - Math.pow(1 - t, 3);
    	}

    	function updateCounter(currentTime) {
    		const elapsed = currentTime - startTime;
        	const progress = Math.min(elapsed / duration, 1);

        	const easedProgress = easeOutCubic(progress);
        	const currentValue = Math.floor(start + easedProgress * range);

        	element.textContent = currentValue.toLocaleString("en-US");

        	if (progress < 1) {
        		requestAnimationFrame(updateCounter);
        	}
      }
      
      requestAnimationFrame(updateCounter);
    }

    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver((entries, observer) => {entries.forEach((entry) => {
    	if (entry.isIntersecting) {
    		const element = entry.target;

            const endValue = parseInt(element.getAttribute("data-target").replace(/,/g, ""), 10);

            animateCounter(element, endValue, 4000);
            observer.unobserve(element);
    	}
    });
    },
	{
		threshold: 0.5
	}
    );

    counters.forEach((counter) => {
      counter.textContent = "0";
      observer.observe(counter);
    });

    // Statistics Counter ENDS HERE

    // Custom Gallery Slider STARTS HERE

    document.querySelectorAll(".slider-container").forEach((container) => {
    	
    	const slider = container.querySelector(".slider");
        const slides = slider.querySelectorAll(".slide");
        const thumbnails = container.querySelectorAll(".thumb-wrapper");
        const leftArrow = container.querySelector(".leftArrow");

        const rightArrow = container.querySelector(".rightArrow");

        let currentIndex = 0;

        function updateSlider(){
        	slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        	thumbnails.forEach((thumb, i) => {
        		thumb.querySelector(".thumbnail").classList.toggle("active", i === currentIndex);
        	});
        }

        function goToSlide(index){
        	currentIndex = index;
        	updateSlider();
        }

        function nextSlide(){
        	currentIndex = (currentIndex + 1) % slides.length;
        	updateSlider();
        }

        function prevSlide() {
        	currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        	updateSlider();
        }

        thumbnails.forEach((thumb, index) => {thumb.addEventListener("click", () => {
        	goToSlide(index);
        });
	});
        
        rightArrow.addEventListener("click", nextSlide);
        leftArrow.addEventListener("click", prevSlide);

        setInterval(nextSlide, 5000);
	});

    // Custom Gallery Slider ENDS HERE

	//HALL OF FAME LOGIC STARTS HERE
	(function () {
		function initialiseHallOfFame(container) {
	        var slider = container.querySelector('.hof-slider');
	        var slides = container.querySelectorAll('.hof-slide');
	        var previousButton = container.querySelector('.hof-prev');
	        var nextButton = container.querySelector('.hof-next');
	        var smallPreviousButton = container.querySelector('.hof-small-prev');
	        var smallNextButton = container.querySelector('.hof-small-next');
	        var currentLabel = container.querySelector('.hof-current');
	        var totalLabel = container.querySelector('.hof-total');
	        var progress = container.querySelector('.hof-progress');
	        var progressFill = container.querySelector('.hof-progress-fill');
	        var currentIndex = 0;
	
	        if (!slider || !slides.length) {
	            return;
	        }
	
	        container.classList.toggle('hof-single-slide', slides.length === 1);
	
	        function updateSlider() {
	            slider.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
	
	            if (currentLabel) {
	                currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
	            }
	
	            if (totalLabel) {
	                totalLabel.textContent = String(slides.length).padStart(2, '0');
	            }
	
	            if (progressFill) {
	                progressFill.style.width = (((currentIndex + 1) / slides.length) * 100) + '%';
	            }
	        }
	
	        function goNext() {
	            currentIndex = (currentIndex + 1) % slides.length;
	            updateSlider();
	        }
	
	        function goPrevious() {
	            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	            updateSlider();
	        }
	
	        var touchStartX = null;
	        var touchStartY = null;
	        var touchStartTime = 0;
	        var minimumSwipeDistance = 50;
	        var maximumSwipeDuration = 900;
	
	        function resetTouch() {
	            touchStartX = null;
	            touchStartY = null;
	            touchStartTime = 0;
	        }
	
	        container.addEventListener('touchstart', function (event) {
	            if (slides.length < 2 || event.touches.length !== 1) {
	                resetTouch();
	                return;
	            }
	
	            touchStartX = event.touches[0].clientX;
	            touchStartY = event.touches[0].clientY;
	            touchStartTime = Date.now();
	        }, { passive: true });
	
	        container.addEventListener('touchend', function (event) {
	            if (
	                slides.length < 2 ||
	                touchStartX === null ||
	                touchStartY === null ||
	                !event.changedTouches.length
	            ) {
	                resetTouch();
	                return;
	            }
	
	            var touchEndX = event.changedTouches[0].clientX;
	            var touchEndY = event.changedTouches[0].clientY;
	            var horizontalDistance = touchEndX - touchStartX;
	            var verticalDistance = touchEndY - touchStartY;
	            var swipeDuration = Date.now() - touchStartTime;
	            var isHorizontalSwipe =
	                Math.abs(horizontalDistance) >= minimumSwipeDistance &&
	                Math.abs(horizontalDistance) > Math.abs(verticalDistance) * 1.2;
	
	            resetTouch();
	
	            if (!isHorizontalSwipe || swipeDuration > maximumSwipeDuration) {
	                return;
	            }
	
	            if (horizontalDistance < 0) {
	                goNext();
	            } else {
	                goPrevious();
	            }
	        }, { passive: true });
	
	        container.addEventListener('touchcancel', resetTouch, { passive: true });
	
	        function activateOnKeyboard(element, action) {
	            if (!element) {
	                return;
	            }
	
	            element.addEventListener('keydown', function (event) {
	                if (event.key === 'Enter' || event.key === ' ') {
	                    event.preventDefault();
	                    action();
	                }
	            });
	        }
	
	        if (nextButton) {
	            nextButton.addEventListener('click', goNext);
	        }
	        
	        if (previousButton) {
	            previousButton.addEventListener('click', goPrevious);
	        }
	        
	        if (smallNextButton) {
	            smallNextButton.addEventListener('click', goNext);
	        }
	        
	        if (smallPreviousButton) {
	            smallPreviousButton.addEventListener('click', goPrevious);
	        }
	
	        activateOnKeyboard(nextButton, goNext);
	        activateOnKeyboard(previousButton, goPrevious);
	        activateOnKeyboard(smallNextButton, goNext);
	        activateOnKeyboard(smallPreviousButton, goPrevious);
	
	        if (progress) {
	            progress.addEventListener('click', function (event) {
	                var bounds = progress.getBoundingClientRect();
	                var percentage = (event.clientX - bounds.left) / bounds.width;
	                currentIndex = Math.max(0, Math.min(Math.floor(percentage * slides.length), slides.length - 1));
	                updateSlider();
	            });
	        }
	
	        container.setAttribute('tabindex', '0');
	        container.addEventListener('keydown', function (event) {
	            if (event.key === 'ArrowRight') {
	                goNext();
	            } else if (event.key === 'ArrowLeft') {
	                goPrevious();
	            }
	        });
	
	        updateSlider();
	    }
	
	    function initialiseAll() {
	        document.querySelectorAll('.hof-container').forEach(initialiseHallOfFame);
	    }
	
	    if (document.readyState === 'loading') {
	        document.addEventListener('DOMContentLoaded', initialiseAll);
	    } else {
	        initialiseAll();
	    }
	}());
	//HALL OF FAME LOGIC ENDS HERE

  });
});