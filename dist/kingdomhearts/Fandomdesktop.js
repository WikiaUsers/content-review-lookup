/* <nowiki> */
mw.hook('wikipage.content').add(function() {

    /* --- Global variable used for referencing current page URL --- */
    const siteURL = location.protocol + "//" + location.host + location.pathname;

    /* --- Removes the need for adding a surfeit amount of <gallery> attributes --- */
    /* --- by making the desirable ones the default.                            --- */
	const wikiaGalleries = document.querySelectorAll(".wikia-gallery");
	if (wikiaGalleries.length > 0) {
		wikiaGalleries.forEach(gallery => {
			gallery.className = "wikia-gallery wikia-gallery-caption-below wikia-gallery-position-center wikia-gallery-spacing-small wikia	-gallery-border-none wikia-gallery-captions-center wikia-gallery-caption-size-medium";
	    });
	}

    /* --- Special:Upload template preload --- */
    if (
        mw.config.values.wgCanonicalSpecialPageName === 'Upload' && // Special:Upload
        !window.location.href.includes('wpForReUpload') // Only first uploads
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
            // Observe the form for changes in its children (like textarea being added/modified)
            observer.observe(uploadForm, {
                childList: true,
                subtree: true // Important for observing changes deep within the form
            });
        }
    }

    /* --- Unchecks "leave redirect behind" by default. --- */
    const wpLeaveRedirectCheckbox = document.querySelector("input[name=wpLeaveRedirect]");
    if (wpLeaveRedirectCheckbox) {
        wpLeaveRedirectCheckbox.checked = false;
    }

    /* --- Display appearance images on right rail (Template:Appearances) --- */
    // This section was missing from your latest provided JS, so I'm re-adding it
    // from our previous discussions, ensuring it's modernized.
    const appIcons = document.querySelectorAll('.appicon');
    if (appIcons.length > 0) {
        let appRail = document.getElementById("apprail");
        if (!appRail) { // Create if it doesn't exist
            const newSection = document.createElement('section');
            newSection.classList.add('rail-module');
            newSection.id = 'apprail';
            const h2 = document.createElement('h2');
            h2.textContent = 'Appears in:';
            newSection.appendChild(h2);
            
            const wikiaRail = document.getElementById('WikiaRail');
            if (wikiaRail) {
                wikiaRail.appendChild(newSection);
                appRail = newSection; // Reference the newly created element
            }
        }
        
        if (appRail) { // Only proceed if appRail exists or was created
            appIcons.forEach(icon => {
                // To move elements, appendChild will move them from their current position
                appRail.appendChild(icon); 
                icon.style.display = 'block'; // Ensure visibility
            });
        }
    }

    /* --- Template:Portal/Contents slider --- */

    // Store all possible slide IDs (for background management).
    // IMPORTANT: Update this array if you add or remove portal slides that affect the background class.
    const portalSlideIds = [
        "hub", // Assuming "hub" is also a slide ID
        "Kingdom_Hearts",
        "Kingdom_Hearts_II",
        "Kingdom_Hearts_III",
        "Other_titles" // This is a slide, but not a background class directly
        // Add any other actual slide IDs here that correspond to a background change
    ]; 
    // And here are the specific IDs that map to a distinct background class on .portal.navigation
    const backgroundMappingIds = [
        "Kingdom_Hearts",
        "Kingdom_Hearts_II",
        "Kingdom_Hearts_III",
    	"Other_titles"
        // Only include IDs that you expect to be added as a class to .portal.navigation
    ];

    // Helper function to update the slide and navigation elements
    function updateSlide(newSlide) {
        // Ensure newSlide is a valid DOM element with the correct class
        if (!newSlide || !newSlide.classList.contains("portal__content__slide")) {
            console.error("Invalid newSlide element provided to updateSlide:", newSlide);
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

        // Remove ALL possible background classes from portalNavigation
        if (portalNavigation) {
            // Remove classes that are in our backgroundMappingIds list
            backgroundMappingIds.forEach(id => {
                if (portalNavigation.classList.contains(id)) {
                    portalNavigation.classList.remove(id);
                }
            });
        }
        
        // Add the new background class ONLY if it's one of the specified background-changing IDs
        if (backgroundMappingIds.includes(newId) && portalNavigation) {
            portalNavigation.classList.add(newId);
        }

        // Keep the navigator index text as "menu" regardless of the current slide
        if (navigatorIndex) {
            navigatorIndex.textContent = "menu";
        }
    }

    // --- Handler for clicking a game icon from the hub (prevents default link) ---
    // Select all 'a' tags inside elements with class 'portal__content__aux' which are children of '#hub'
    const hubGameIconLinks = document.querySelectorAll("#hub .portal__content__aux a");

    hubGameIconLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Stop the default link behavior
            
            const parentAuxDiv = this.closest(".portal__content__aux");
            
            if (parentAuxDiv) {
                const newId = parentAuxDiv.id;
                
                // Explicitly find the target portal__content__slide
                const newSlide = document.querySelector(`.portal__content__slide[id="${newId}"]`);

                if (newSlide) {
                    updateSlide(newSlide);
                } else {
                    console.warn(`Target slide with ID "${newId}" not found.`);
                }
            }
        });
    });

    // --- Get all slides for consistent navigation logic ---
    // Ensure "hub" is the first element in the NodeList for correct looping logic if it's the default start.
    const allSlides = Array.from(document.querySelectorAll(".portal__content__slide"));
    if (allSlides.length === 0) {
        console.warn("No portal slides found. Slider functionality will not activate.");
        return; // Exit if no slides are found
    }

    // --- Handler for the 'next' (right arrow) navigator ---
    const nextButton = document.querySelector(".portal__content__navigator .next");
    if (nextButton) {
        nextButton.addEventListener("click", function() {
            const activeSlide = document.querySelector(".portal__content__slide.active");
            if (!activeSlide) {
                console.warn("No active slide found when clicking next.");
                return; // No active slide found
            }

            const currentIndex = allSlides.indexOf(activeSlide);
            if (currentIndex === -1) {
                console.warn("Active slide not found in allSlides array for next button.");
                return;
            }

            let newSlide;
            // If current slide is the last one, loop to the first (hub)
            if (currentIndex === allSlides.length - 1) {
                newSlide = allSlides[0]; // Assuming the first slide in `allSlides` is "hub"
            } else {
                newSlide = allSlides[currentIndex + 1];
            }
            
            if (newSlide) {
                updateSlide(newSlide);
            }
        });
    }

    // --- Handler for the 'previous' (left arrow) navigator ---
    const previousButton = document.querySelector(".portal__content__navigator .previous");
    if (previousButton) {
        previousButton.addEventListener("click", function() {
            const activeSlide = document.querySelector(".portal__content__slide.active");
            if (!activeSlide) {
                console.warn("No active slide found when clicking previous.");
                return; // No active slide found
            }

            const currentIndex = allSlides.indexOf(activeSlide);
            if (currentIndex === -1) {
                console.warn("Active slide not found in allSlides array for previous button.");
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
    }

    // --- Handler for clicking the middle "menu" text ---
    const menuIndexButton = document.querySelector(".portal__content__navigator .index");
    if (menuIndexButton) {
        menuIndexButton.addEventListener("click", function() {
            const hubSlide = document.getElementById("hub");
            if (hubSlide) {
                updateSlide(hubSlide);
            } else {
                console.warn("Hub slide (ID 'hub') not found.");
            }
        });
    }
});
/* </nowiki> */