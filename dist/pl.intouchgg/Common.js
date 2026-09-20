/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* LinkPreview */
window.pPreview = $.extend(true, window.pPreview, {	RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.ilinks = [new RegExp('^[A-Za-z_ ]*:[^\/\/][^\n]*$')];
window.pPreview.RegExp.iclasses = ['no-link-preview'];


/* ReadProgressBar */
window.enableReadProgressBarOnArticles = true;


/* Ripple */
/*window.ripplesConfig = {
	'normalRipples': document.querySelectorAll(''),
	'recenteredRipples': document.querySelectorAll(''),
	'unboundedRipples': document.querySelectorAll('')
};*/

/* =========================================================
   INTOUCH - DIRECTORY SLIDERS
   ========================================================= */

(function () {

    function initIntouchSlider(slider) {

        if (!slider || slider.dataset.initialized === "true") {
            return;
        }

        slider.dataset.initialized = "true";

        const slides = slider.querySelectorAll(".intouch-slide");
        const dots = slider.querySelectorAll(".intouch-slider-dot");

        if (!slides.length || !dots.length) {
            return;
        }

        let current = 0;

        function showSlide(index) {

            if (index < 0) {
                index = slides.length - 1;
            }

            if (index >= slides.length) {
                index = 0;
            }

            current = index;

            slides.forEach(function (slide, i) {

                slide.classList.toggle(
                    "active",
                    i === current
                );

            });

            dots.forEach(function (dot, i) {

                dot.classList.toggle(
                    "active",
                    i === current
                );

            });
        }


        dots.forEach(function (dot, index) {

            dot.addEventListener("click", function () {

                showSlide(index);

            });

        });


        /* =================================================
           START
           ================================================= */

        showSlide(0);


        /* =================================================
           AUTO SLIDE
           0 = wyłączone
           ================================================= */

        let autoSlide = 0;

        if (autoSlide > 0) {

            setInterval(function () {

                showSlide(current + 1);

            }, autoSlide);

        }

    }


    function initAllIntouchSliders() {

        document
            .querySelectorAll(".intouch-slider")
            .forEach(initIntouchSlider);

    }


    /* =====================================================
       MEDIAWIKI
       ===================================================== */

    if (typeof mw !== "undefined" && mw.hook) {

        mw.hook("wikipage.content").add(function () {

            initAllIntouchSliders();

        });

    } else {

        document.addEventListener(
            "DOMContentLoaded",
            initAllIntouchSliders
        );

    }

})();