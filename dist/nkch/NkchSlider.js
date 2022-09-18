var nkch = window.nkch ? window.nkch : {};
window.nkch = nkch;

nkch.sld = nkch.sld ? nkch.sld : {};

if (!nkch.sld.isActive) {
    nkch.sld.isActive = true;
    
    const sliderBases = document.querySelectorAll(".nkch-slider-base"),
        sliders = [];

    if (sliderBases.length > 0) {
        sliderBases.forEach(function(el, i) {
            sliders[i] = generateSlider(el, i);
        });

        importArticle({
            type: "style",
            article: "u:nkch:MediaWiki:nkchSlider.css"
        });

        sliders.forEach(function(el, i) {
            sliderBases[i].after(el.slider);
        })
    }

    /** @function
     * @param {Element} data
     * @param {number} i
     * @returns {SliderData}
     */
    function generateSlider(data, i) {
        const slider = document.createElement("div");
        slider.classList.add("nkch-slider");

        /** @type {SliderData} */
        const result = {
            slider: slider,
            slideList: Array.from(sliderBases[i].querySelectorAll(".nkch-slider-base__image-list-item")),
            lists: {},
            currentSlide: 0,
            timeout: 5000,
            isMouseOver: false,
            setInterval: function (timeout) {
                result.intervalId = setInterval(function() {
                    actions.nextSlide(result);
                }, timeout);
            }
        };

        const slider_list = document.createElement("div");
        slider_list.classList.add("nkch-slider__list");

        slider.append(slider_list);


        result.lists.slides = [];
        for (var a = 0; a < result.slideList.length; a++) {
            var slideinList = result.slideList[a]
            var src = slideinList.querySelector("img").dataset.src ? slideinList.querySelector("img").dataset.src : slideinList.querySelector("img").src;


            var slider_slide = document.createElement("div");
            slider_slide.classList.add("nkch-slider__list-item", "nkch-slider__list-item--" + a);
            
            slider_slide.style.backgroundImage = "url(" + src + ")";

            slider_list.append(slider_slide);
            result.lists.slides[a] = slider_slide;


            var slider_slideBlur = document.createElement("div");
            slider_slideBlur.classList.add("nkch-slider__list-blur", "nkch-slider__list-blur--" + a);

            slider_slide.append(slider_slideBlur);


            var slider_slideImage = document.createElement("div");
            slider_slideImage.classList.add("nkch-slider__list-image", "nkch-slider__list-image--" + a);

            slider_slide.append(slider_slideImage);


            var slider_slideImageLink = document.createElement("a");
            slider_slideImageLink.classList.add("nkch-slider__list-image-link", "nkch-slider__list-image-link--" + a);

            var slideLink = slideinList.querySelector(".nkch-slider-base__image-list-item-link > a");
            if (slideLink) slider_slideImageLink.href = slideLink.href;

            slider_slideImage.append(slider_slideImageLink);


            var slider_slideImageSrc = document.createElement("div");
            slider_slideImageSrc.classList.add("nkch-slider__list-image-src", "nkch-slider__list-image-src--" + a);
            
            slider_slideImageSrc.style.backgroundImage = "url(" + src + ")";

            slider_slideImageLink.append(slider_slideImageSrc);


            var slider_slideData = document.createElement("div");
            slider_slideData.classList.add("nkch-slider__list-image-data", "nkch-slider__list-image-data--" + a);

            slider_slideImageLink.append(slider_slideData);


            var slider_slideTitle = document.createElement("div");
            slider_slideTitle.classList.add("nkch-slider__list-image-title", "nkch-slider__list-image-title--" + a);

            var slideTitle = slideinList.querySelector(".nkch-slider-base__image-list-item-title");
            if (slideTitle) slider_slideTitle.innerHTML = slideTitle.innerHTML;

            slider_slideData.append(slider_slideTitle);


            var slider_slideDescription = document.createElement("div");
            slider_slideDescription.classList.add("nkch-slider__list-image-desc", "nkch-slider__list-image-desc--" + a);

            var slideDescription = slideinList.querySelector(".nkch-slider-base__image-list-item-desc");
            if (slideDescription) slider_slideDescription.innerHTML = slideDescription.innerHTML;

            slider_slideData.append(slider_slideDescription);
        }


        const slider_indicators = document.createElement("div");
        slider_indicators.classList.add("nkch-slider__indicators");

        slider.append(slider_indicators);

        
        result.lists.indicators = [];
        for (var a = 0; a < result.slideList.length + 1; a++) {
            var slider_indicator = document.createElement("div");
            slider_indicator.classList.add("nkch-slider__indicator", "nkch-slider__indicator--" + a);
    
            result.lists.indicators[a] = slider_indicator;
            slider_indicators.append(slider_indicator);
        }


        const slider_indicatorCurrent = document.createElement("div");
        slider_indicatorCurrent.classList.add("nkch-slider__indicator-current");

        slider_indicators.append(slider_indicatorCurrent);


        const slider_indicatorProgress = document.createElement("div");
        slider_indicatorProgress.classList.add("nkch-slider__indicator-current-progress");

        slider_indicatorCurrent.append(slider_indicatorProgress);

        result.progressAnimation = slider_indicatorProgress.animate([{
            width: 0
        }, {
            width: "100%"
        }], result.timeout);

        result.setInterval(5000);

        result.slider.addEventListener("mouseenter", function (ev) {
            clearTimeout(result.intervalId);
            result.progressAnimation.cancel();
            result.isMouseOver = true;
        });

        result.slider.addEventListener("mouseleave", function (ev) {
            result.setInterval(result.timeout);
            result.progressAnimation.play();
            result.isMouseOver = false;
        });


        const slider_arrowLeft = document.createElement("button");
        slider_arrowLeft.classList.add("nkch-slider__arrow", "nkch-slider__arrow--left");

        slider_arrowLeft.addEventListener("click", function () {
            actions.slideLeft(result);
        });

        slider.append(slider_arrowLeft);


        const slider_arrowLeftIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        slider_arrowLeftIcon.classList.add("wds-icon");
        slider_arrowLeftIcon.setAttributeNS(null, "viewbox", "0 0 24 24");

        slider_arrowLeft.append(slider_arrowLeftIcon);


        const slider_arrowLeftIconSrc = document.createElementNS("http://www.w3.org/2000/svg", "use");
        slider_arrowLeftIconSrc.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-menu-control");

        slider_arrowLeftIcon.append(slider_arrowLeftIconSrc);


        const slider_arrowRight = document.createElement("button");
        slider_arrowRight.classList.add("nkch-slider__arrow", "nkch-slider__arrow--right");

        slider_arrowRight.addEventListener("click", function () {
            actions.slideRight(result);
        });

        slider.append(slider_arrowRight);


        const slider_arrowRightIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        slider_arrowRightIcon.classList.add("wds-icon");
        slider_arrowRightIcon.setAttributeNS(null, "viewbox", "0 0 24 24");

        slider_arrowRight.append(slider_arrowRightIcon);


        const slider_arrowRightIconSrc = document.createElementNS("http://www.w3.org/2000/svg", "use");
        slider_arrowRightIconSrc.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-menu-control");

        slider_arrowRightIcon.append(slider_arrowRightIconSrc);


        return result;
    }

    /** @type {SliderActions} */
    const actions = {
        /**
         * @function
         * @param {SliderData} slider
         * @param {Direction} [direction]
         * @returns {null}
         */
        nextSlide: function (slider, direction) {
            direction = direction ? direction : Direction.Right;

            /** @type {number} */ 
            var slideTo,
            /** @type {string} */ 
                translateFrom;
            
            switch (direction) {
                default:
                case Direction.Right:
                    slideTo = slider.currentSlide + 1;
                    translateFrom = "30px";
                    break;
                case Direction.Left:
                    slideTo = slider.currentSlide - 1;
                    translateFrom = "-30px";

                    if (slideTo < 0) slideTo = slider.lists.slides.length - 1;
                    break;
            }

            slider.progressAnimation.cancel();
            if (!slider.isMouseOver) slider.progressAnimation.play();

            slider.currentSlide = slideTo % slider.lists.slides.length;

            slider.slider.querySelector(".nkch-slider__list").style.insetBlockStart = -(414 * (slider.currentSlide)) + "px";
            slider.slider.querySelector(".nkch-slider__indicator-current").style.insetInlineStart = (15 * slider.currentSlide) + "px";
            slider.slider.querySelector(".nkch-slider__list-image--" + slider.currentSlide).animate([{
                transform: "translateX(" + translateFrom + ")",
                opacity: .5
            }, {
                transform: "translateX(0)",
                opacity: 1
            }], {
                duration: 300,
                easing: "ease"
            });
        },
        /**
         * @function
         * @param {SliderData} slider
         * @returns {null}
         */
        slideLeft: function (slider) {
            actions.nextSlide(slider, Direction.Left);
        },
        /**
         * @function
         * @param {SliderData} slider
         * @returns {null}
         */
        slideRight: function (slider) {
            actions.nextSlide(slider, Direction.Right);
        }
    }

    /**
     * @typedef {string} Direction
     * @enum {Direction}
     */
    const Direction = {
        Right: "right",
        Left: "left"
    }

    /**
     * @typedef {Object} SliderData
     * @property {HTMLDivElement} slider
     * @property {Element[]} slideList
     * @property {number} timeout
     */

    /** @typedef {Object} SliderActions */
}