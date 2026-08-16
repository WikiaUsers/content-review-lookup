window.AddRailModule = ['Template:FanartModule'];

/* ===================================================== */
/* ICON-STORIES AUTOMATIC SLIDESHOW */
/* ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const slideshows = document.querySelectorAll(
        ".icon-stories-slideshow[data-slideshow]"
    );

    slideshows.forEach(function (slideshow) {

        const slides = slideshow.querySelectorAll(
            ".icon-stories-slide"
        );

        const previousButton = slideshow.querySelector(
            ".icon-stories-slide-left"
        );

        const nextButton = slideshow.querySelector(
            ".icon-stories-slide-right"
        );

        if (slides.length <= 1) {
            return;
        }

        let currentSlide = 0;
        let timer;


        /* ============================================= */
        /* SHOW SLIDE */
        /* ============================================= */

        function showSlide(index) {

            slides[currentSlide].classList.remove("active");

            currentSlide =
                (index + slides.length) % slides.length;

            slides[currentSlide].classList.add("active");
        }


        /* ============================================= */
        /* NEXT */
        /* ============================================= */

        function nextSlide() {
            showSlide(currentSlide + 1);
        }


        /* ============================================= */
        /* PREVIOUS */
        /* ============================================= */

        function previousSlide() {
            showSlide(currentSlide - 1);
        }


        /* ============================================= */
        /* AUTOMATIC TIMER */
        /* ============================================= */

        function startTimer() {

            clearInterval(timer);

            timer = setInterval(function () {
                nextSlide();
            }, 5000);

        }


        /* ============================================= */
        /* ARROW CONTROLS */
        /* ============================================= */

        if (nextButton) {

            nextButton.addEventListener("click", function () {

                nextSlide();

                startTimer();

            });

        }


        if (previousButton) {

            previousButton.addEventListener("click", function () {

                previousSlide();

                startTimer();

            });

        }


        /* ============================================= */
        /* START SLIDESHOW */
        /* ============================================= */

        startTimer();

    });

});