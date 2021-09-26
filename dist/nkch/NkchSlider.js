if (typeof window.nkch === "undefined") {
    const nkch = {};
    window.nkch = nkch;
};

if (typeof nkch.sld === "undefined") nkch.sld = {};

if (!nkch.sld.isActive) {
    nkch.sld.isActive = true;

    nkch.sld.el = {
        base: {
            $e: document.querySelectorAll(".nkch-slider-base"),
            sliders: []
        }
    }

    function addClasses(element) {
        element.$classes.forEach(function (c) {
            element.$e.classList.add(c);
        });
    }

    nkch.sld.el.base.$e.forEach(function (el, i) {
        nkch.sld.el.base.sliders[i] = {
            $e: document.createElement("div"),
            $classes: ["nkch-slider"],
            list: {
                $e: document.createElement("div"),
                $classes: ["nkch-slider__list"],
                items: []
            },
            indicators: {
                $e: document.createElement("div"),
                $classes: ["nkch-slider__indicators"],
                items: [],
                current: {
                    $e: document.createElement("div"),
                    $classes: ["nkch-slider__indicator-current"],
                    progress: {
                        $e: document.createElement("div"),
                        $classes: ["nkch-slider__indicator-current-progress"]
                    }
                }
            },
            arrows: {
                left: {
                    $e: document.createElement("button"),
                    $classes: ["nkch-slider__arrow", "nkch-slider__arrow--left"],
                    svg: {
                        $e: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                        $classes: ["wds-icon"],
                        use: {
                            $e: document.createElementNS("http://www.w3.org/2000/svg", "use")
                        }
                    }
                },
                right: {
                    $e: document.createElement("button"),
                    $classes: ["nkch-slider__arrow", "nkch-slider__arrow--right"],
                    svg: {
                        $e: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                        $classes: ["wds-icon"],
                        use: {
                            $e: document.createElementNS("http://www.w3.org/2000/svg", "use")
                        }
                    }
                }
            },
            slidesList: Array.from(nkch.sld.el.base.$e[i].querySelectorAll(".nkch-slider-base__image-list-item")),
            currentSlide: 0,
            timeout: 5000,
            isMouseOver: false,
            setInterval: function (timeout) {
                nkch.sld.el.base.sliders[i].intervalId = setInterval(function () {
                    nkch.sld.actions.nextSlide(nkch.sld.el.base.sliders[i]);
                }, nkch.sld.el.base.sliders[i].timeout);
            }
        }

        nkch.sld.el.base.sliders[i].progressAnim = nkch.sld.el.base.sliders[i].indicators.current.progress.$e.animate([{
            width: 0
        }, {
            width: "100%"
        }], nkch.sld.el.base.sliders[i].timeout);

        /* ~ slider ~ */
        addClasses(nkch.sld.el.base.sliders[i]);

        el.after(nkch.sld.el.base.sliders[i].$e);

        /* ~ slider : list ~ */
        addClasses(nkch.sld.el.base.sliders[i].list);

        nkch.sld.el.base.sliders[i].$e.appendChild(nkch.sld.el.base.sliders[i].list.$e);

        /* ~ slider : indicators ~ */
        addClasses(nkch.sld.el.base.sliders[i].indicators);

        nkch.sld.el.base.sliders[i].$e.appendChild(nkch.sld.el.base.sliders[i].indicators.$e);

        /* ~ slider : indicators : indicator ~ */
        for (var a = 0; a < nkch.sld.el.base.sliders[i].slidesList.length + 1; a++) {
            nkch.sld.el.base.sliders[i].indicators.items[a] = {
                $e: document.createElement("div"),
                $classes: ["nkch-slider__indicator", "nkch-slider__indicator--" + a]
            }

            addClasses(nkch.sld.el.base.sliders[i].indicators.items[a]);

            nkch.sld.el.base.sliders[i].indicators.$e.appendChild(nkch.sld.el.base.sliders[i].indicators.items[a].$e);
        }

        /* ~ slider : indicators : indicatorCurrent ~ */
        addClasses(nkch.sld.el.base.sliders[i].indicators.current);

        nkch.sld.el.base.sliders[i].indicators.$e.appendChild(nkch.sld.el.base.sliders[i].indicators.current.$e);

        /* ~ slider : indicators : indicatorCurrent : progress ~ */
        addClasses(nkch.sld.el.base.sliders[i].indicators.current.progress);

        nkch.sld.el.base.sliders[i].indicators.current.$e.appendChild(nkch.sld.el.base.sliders[i].indicators.current.progress.$e);

        /* ~ slider : arrows : left ~ */
        addClasses(nkch.sld.el.base.sliders[i].arrows.left);

        nkch.sld.el.base.sliders[i].arrows.left.$e.addEventListener("click", function () {
            nkch.sld.actions.slideLeft(nkch.sld.el.base.sliders[i]);
        });

        addClasses(nkch.sld.el.base.sliders[i].arrows.left.svg);
        nkch.sld.el.base.sliders[i].arrows.left.svg.$e.setAttributeNS(null, "viewbox", "0 0 24 24");

        nkch.sld.el.base.sliders[i].arrows.left.svg.use.$e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-menu-control");

        nkch.sld.el.base.sliders[i].arrows.left.svg.$e.appendChild(nkch.sld.el.base.sliders[i].arrows.left.svg.use.$e);
        nkch.sld.el.base.sliders[i].arrows.left.$e.appendChild(nkch.sld.el.base.sliders[i].arrows.left.svg.$e);

        nkch.sld.el.base.sliders[i].$e.appendChild(nkch.sld.el.base.sliders[i].arrows.left.$e);

        /* ~ slider : arrows : right ~ */
        addClasses(nkch.sld.el.base.sliders[i].arrows.right);

        nkch.sld.el.base.sliders[i].arrows.right.$e.addEventListener("click", function () {
            nkch.sld.actions.slideRight(nkch.sld.el.base.sliders[i]);
        });

        addClasses(nkch.sld.el.base.sliders[i].arrows.right.svg);
        nkch.sld.el.base.sliders[i].arrows.right.svg.$e.setAttributeNS(null, "viewbox", "0 0 24 24");

        nkch.sld.el.base.sliders[i].arrows.right.svg.use.$e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-menu-control");

        nkch.sld.el.base.sliders[i].arrows.right.svg.$e.appendChild(nkch.sld.el.base.sliders[i].arrows.right.svg.use.$e);
        nkch.sld.el.base.sliders[i].arrows.right.$e.appendChild(nkch.sld.el.base.sliders[i].arrows.right.svg.$e);

        nkch.sld.el.base.sliders[i].$e.appendChild(nkch.sld.el.base.sliders[i].arrows.right.$e);

        /* ~ creating slides ~ */
        nkch.sld.el.base.sliders[i].slidesList.forEach(function (item, s) {
            nkch.sld.el.base.sliders[i].list.items[s] = {
                $e: document.createElement("div"),
                $classes: ["nkch-slider__list-item", "nkch-slider__list-item--" + s],
                blur: {
                    $e: document.createElement("div"),
                    $classes: ["nkch-slider__list-blur", "nkch-slider__list-blur--" + s]
                },
                image: {
                    $e: document.createElement("div"),
                    $classes: ["nkch-slider__list-image", "nkch-slider__list-image--" + s],
                    link: {
                        $e: document.createElement("a"),
                        $classes: ["nkch-slider__list-image-link", "nkch-slider__list-image-link--" + s],
                        src: {
                            $e: document.createElement("div"),
                            $classes: ["nkch-slider__list-image-src", "nkch-slider__list-image-src--" + s]
                        },
                        data: {
                            $e: document.createElement("div"),
                            $classes: ["nkch-slider__list-image-data", "nkch-slider__list-image-data--" + s],
                            title: {
                                $e: document.createElement("div"),
                                $classes: ["nkch-slider__list-image-title", "nkch-slider__list-image-title--" + s],
                            },
                            desc: {
                                $e: document.createElement("div"),
                                $classes: ["nkch-slider__list-image-desc", "nkch-slider__list-image-desc--" + s],
                            }
                        }
                    }
                }
            }

            var src;
            switch (typeof item.querySelector("img").dataset.src !== "undefined") {
                case true:
                    src = item.querySelector("img").dataset.src;
                    break;
                case false:
                    src = item.querySelector("img").src;
                    break;
            }

            /* ~ slide ~ */
            addClasses(nkch.sld.el.base.sliders[i].list.items[s]);

            nkch.sld.el.base.sliders[i].list.items[s].$e.style.backgroundImage = "url(" + src + ")";

            nkch.sld.el.base.sliders[i].list.$e.appendChild(nkch.sld.el.base.sliders[i].list.items[s].$e);

            /* ~ slide : blur ~ */
            addClasses(nkch.sld.el.base.sliders[i].list.items[s].blur);

            nkch.sld.el.base.sliders[i].list.items[s].$e.appendChild(nkch.sld.el.base.sliders[i].list.items[s].blur.$e);

            /* ~ slide : image ~ */
            addClasses(nkch.sld.el.base.sliders[i].list.items[s].image);

            nkch.sld.el.base.sliders[i].list.items[s].$e.appendChild(nkch.sld.el.base.sliders[i].list.items[s].image.$e);

            /* ~ slide : image : link ~ */
            addClasses(nkch.sld.el.base.sliders[i].list.items[s].image.link);

            var slideLink = nkch.sld.el.base.sliders[i].slidesList[s].querySelector(".nkch-slider-base__image-list-item-link > a");

            if (slideLink != null) {
                nkch.sld.el.base.sliders[i].list.items[s].image.link.$e.href = slideLink.href;
            }

            nkch.sld.el.base.sliders[i].list.items[s].image.$e.appendChild(nkch.sld.el.base.sliders[i].list.items[s].image.link.$e);

            /* ~ slide : image : link : src ~ */
            addClasses(nkch.sld.el.base.sliders[i].list.items[s].image.link.src);


            nkch.sld.el.base.sliders[i].list.items[s].image.link.src.$e.style.backgroundImage = "url(" + src + ")";

            nkch.sld.el.base.sliders[i].list.items[s].image.link.$e.appendChild(nkch.sld.el.base.sliders[i].list.items[s].image.link.src.$e);

            /* ~ slide : image : link : data ~ */
            addClasses(nkch.sld.el.base.sliders[i].list.items[s].image.link.data);

            nkch.sld.el.base.sliders[i].list.items[s].image.link.$e.appendChild(nkch.sld.el.base.sliders[i].list.items[s].image.link.data.$e);

            /* ~ slide : image : link : data : title ~ */
            addClasses(nkch.sld.el.base.sliders[i].list.items[s].image.link.data.title);

            nkch.sld.el.base.sliders[i].list.items[s].image.link.data.title.$e.innerHTML = item.querySelector(".nkch-slider-base__image-list-item-title").innerHTML;

            nkch.sld.el.base.sliders[i].list.items[s].image.link.data.$e.appendChild(nkch.sld.el.base.sliders[i].list.items[s].image.link.data.title.$e);

            /* ~ slide : image : link : data : desc ~ */
            addClasses(nkch.sld.el.base.sliders[i].list.items[s].image.link.data.desc);

            nkch.sld.el.base.sliders[i].list.items[s].image.link.data.desc.$e.innerHTML = item.querySelector(".nkch-slider-base__image-list-item-desc").innerHTML;

            nkch.sld.el.base.sliders[i].list.items[s].image.link.data.$e.appendChild(nkch.sld.el.base.sliders[i].list.items[s].image.link.data.desc.$e);
        });

        nkch.sld.el.base.sliders[i].setInterval(3000);

        nkch.sld.el.base.sliders[i].$e.addEventListener("mouseenter", function (ev) {
            clearTimeout(nkch.sld.el.base.sliders[i].intervalId);
            nkch.sld.el.base.sliders[i].progressAnim.cancel();
            nkch.sld.el.base.sliders[i].isMouseOver = true;
        });

        nkch.sld.el.base.sliders[i].$e.addEventListener("mouseleave", function (ev) {
            nkch.sld.el.base.sliders[i].setInterval(nkch.sld.el.base.sliders[i].timeout);
            nkch.sld.el.base.sliders[i].progressAnim.play();
            nkch.sld.el.base.sliders[i].isMouseOver = false;
        });
    });

    nkch.sld.actions = {
        nextSlide: function (slider, dir) {
            if (typeof dir === "undefined") {
                dir = "right";
            }

            var slideTo, translateFrom;
            switch (dir) {
                case "right":
                    slideTo = slider.currentSlide + 1;
                    translateFrom = "30px";
                    break;
                case "left":
                    slideTo = slider.currentSlide - 1;
                    translateFrom = "-30px";

                    if (slideTo < 0) {
                        slideTo = slider.slidesList.length - 1;
                    }
                    break;
            }

            slider.progressAnim.cancel();
            if (slider.isMouseOver == false) {
                slider.progressAnim.play();
            }

            slider.currentSlide = (slideTo) % slider.slidesList.length;

            slider.list.$e.style.insetBlockStart = -(414 * (slider.currentSlide)) + "px";

            slider.indicators.current.$e.style.insetInlineStart = (15 * (slider.currentSlide)) + "px";

            slider.list.$e.querySelector(".nkch-slider__list-image--" + slider.currentSlide).animate([{
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
        slideLeft: function (slider) {
            nkch.sld.actions.nextSlide(slider, "left");
        },
        slideRight: function (slider) {
            nkch.sld.actions.nextSlide(slider, "right");
        }
    }

    /* ~ import stuff ~ */
    importArticle({
        type: "style",
        article: "u:nkch:MediaWiki:nkchSlider.css"
    });
}