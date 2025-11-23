$(function(){
	let slideIndex = 0;
    function showSlides() {
        const slides = document.querySelectorAll('.gallery_list li');
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slides[slideIndex].style.display = "block";  
		updateDots();
    }
    function plusSlides(n) {
        slideIndex += n;
        showSlides();
    }
	function createDots() {
		const dotsContainer = document.getElementById('dots');
		const slides = document.querySelectorAll('.gallery_list li');
		
		var buttons = document.querySelector('.buttons')
        button1 = document.createElement('button');
        button2 = document.createElement('button');
        button1.innerHTML = "&#10094;";
        button2.innerHTML = "&#10095;";
        button1.onclick = function(){plusSlides(-1);};
        button2.onclick = function(){plusSlides(1);};
        buttons.appendChild(button1);
        buttons.appendChild(button2);
		
		slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('data-index', index);
        dotsContainer.appendChild(dot);
    });
	}
	function updateDots() {
		const dots = document.querySelectorAll('.dot');
		dots.forEach(dot => dot.classList.remove('active-dot'));
		dots[slideIndex].classList.add('active-dot');
	}

	function startCycling() {
		interval = setInterval(() => {
			slideIndex++;
			showSlides();
		}, 3500);
	}
	const gallery = document.querySelector('.gallery_list');
	gallery.addEventListener('mouseenter', () => {
		clearInterval(interval);
	});

	gallery.addEventListener('mouseleave', startCycling); 

createDots();
showSlides();
startCycling();
});