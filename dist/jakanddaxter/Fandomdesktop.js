/* <nowiki> */
mw.hook('wikipage.content').add(function() {

    /* --- Global variable used for referencing current page URL --- */
    const siteURL = location.protocol + "//" + location.host + location.pathname;

    /* --- Removes the need for adding a surfeit amount of <gallery> attributes --- */
    /* --- by making the desirable ones the default.                            --- */
    const wikiaGallery = document.querySelector(".wikia-gallery");
    if (wikiaGallery) {
        wikiaGallery.className = "wikia-gallery wikia-gallery-caption-below wikia-gallery-position-center wikia-gallery-spacing-small wikia-gallery-border-none wikia-gallery-captions-center wikia-gallery-caption-size-medium";
    }

    /* --- Special:Upload template preload --- */
    if (
        mw.config.values.wgCanonicalSpecialPageName === 'Upload' &&
        !window.location.href.includes('wpForReUpload')
    ) {
        // Hide licenses
        mw.util.addCSS('.mw-htmlform-field-Licenses{display:none !important;}');
        const preload = '{{infobox file\n|description = \n|source      = \n}}\n\n[[Category:]]';
        const loadPreload = function () {
            const textareas = document.querySelectorAll('.mw-htmlform-field-HTMLTextAreaField .mw-input > textarea');
            textareas.forEach(el => {
                if (el.value.length === 0) {
                    el.value = preload;
                }
            });
        };
        // Initial run
        loadPreload();

        // Set up the mutation observer
        const uploadForm = document.querySelector('#mw-upload-form');
        if (uploadForm) {
            const observer = new MutationObserver(loadPreload);
            observer.observe(uploadForm, {
                childList: true,
                subtree: true
            });
        }
    }

    /* --- Unchecks "leave redirect behind" by default. --- */
    const wpLeaveRedirectCheckbox = document.querySelector("input[name=wpLeaveRedirect]");
    if (wpLeaveRedirectCheckbox) {
        wpLeaveRedirectCheckbox.checked = false;
    }

    /* --- Template:Portal/Contents slider --- */

    // Store all possible slide IDs (for game pages, not hub) for background management.
    const gameSlideIds = [
        "The_Precursor_Legacy",
        "Daxter",
        "Jak_II",
        "Jak_3",
        "Jak_X_Combat_Racing",
        "The_Lost_Frontier"
    ]; 

    // Helper function to update the slide and navigation elements
    function updateSlide(newSlide) {
        // Ensure newSlide is a valid DOM element with the correct class
        if (!newSlide || !newSlide.classList.contains("portal__content__slide")) {
            return;
        }

        const currentActiveSlide = document.querySelector(".portal__content__slide.active");
        if (currentActiveSlide) {
            currentActiveSlide.classList.remove("active");
        }
        newSlide.classList.add("active");

        const newId = newSlide.id;
        const portalNavigation = document.querySelector(".portal.navigation");
        const navigatorIndex = document.querySelector(".portal__content__navigator .index");

        // Remove ALL possible game background classes from portalNavigation
        if (portalNavigation) {
            portalNavigation.classList.remove(...gameSlideIds); 
        }
        
        // Add the new background class ONLY if it's a game slide, not the hub
        if (newId !== "hub" && portalNavigation) {
            portalNavigation.classList.add(newId);
        }

        // Keep the navigator index text as "menu" regardless of the current slide
        if (navigatorIndex) {
            navigatorIndex.textContent = "menu";
        }
    }

    // --- Handler for clicking a game icon from the hub (prevents default link) ---
    const hubGameIconLinks = document.querySelectorAll("#hub .portal__content__aux a");

    hubGameIconLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); 
            
            const parentAuxDiv = this.closest(".portal__content__aux");
            
            if (parentAuxDiv) {
                const newId = parentAuxDiv.id;
                
                // Explicitly find the target portal__content__slide
                const newSlide = document.querySelector(`.portal__content__slide[id="${newId}"]`);

                if (newSlide) {
                    updateSlide(newSlide);
                }
            }
        });
    });

    // --- Get all slides for consistent navigation logic ---
    const allSlides = Array.from(document.querySelectorAll(".portal__content__slide"));
    if (allSlides.length === 0) {
        return;
    }

    // --- Handler for the 'next' (right arrow) navigator ---
    document.querySelector(".portal__content__navigator .next").addEventListener("click", function() {
        const activeSlide = document.querySelector(".portal__content__slide.active");
        if (!activeSlide) {
            return;
        }

        const currentIndex = allSlides.indexOf(activeSlide);
        if (currentIndex === -1) {
            return;
        }

        let newSlide;
        // If current slide is the last one, loop to the first (hub)
        if (currentIndex === allSlides.length - 1) {
            newSlide = allSlides[0]; // The hub is the first slide
        } else {
            newSlide = allSlides[currentIndex + 1];
        }
        
        if (newSlide) {
            updateSlide(newSlide);
        }
    });

    // --- Handler for the 'previous' (left arrow) navigator ---
    document.querySelector(".portal__content__navigator .previous").addEventListener("click", function() {
        const activeSlide = document.querySelector(".portal__content__slide.active");
        if (!activeSlide) {
            return;
        }

        const currentIndex = allSlides.indexOf(activeSlide);
        if (currentIndex === -1) {
            return;
        }

        let newSlide;
        // If current slide is the first one (hub), loop to the last slide
        if (currentIndex === 0) {
            newSlide = allSlides[allSlides.length - 1];
        } else {
            newSlide = allSlides[currentIndex - 1];
        }
        
        if (newSlide) {
            updateSlide(newSlide);
        }
    });

    // --- Handler for clicking the middle "menu" text ---
    document.querySelector(".portal__content__navigator .index").addEventListener("click", function() {
        const hubSlide = document.getElementById("hub");
        if (hubSlide) {
            updateSlide(hubSlide);
        }
    });
});
/* </nowiki> */