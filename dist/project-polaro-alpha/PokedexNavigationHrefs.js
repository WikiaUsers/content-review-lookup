function initializeNavigationLinks() {
    // Select all instances of the .pokemon-navigation-wrapper
    document.querySelectorAll('.pokemon-navigation-wrapper').forEach(function(wrapper) {
        // Select left and right navigation containers within this wrapper
        var leftContainer = wrapper.querySelector('.pokemon-navigation-left');
        var rightContainer = wrapper.querySelector('.pokemon-navigation-right');
        
        // Extract `prev` and `next` values from elements inside the current wrapper
        var prevNameElement = leftContainer ? leftContainer.querySelector('.pokemon-name-left') : null;
        var nextNameElement = rightContainer ? rightContainer.querySelector('.pokemon-name-right') : null;

        var prev = prevNameElement ? prevNameElement.textContent.trim() : null;
        var next = nextNameElement ? nextNameElement.textContent.trim() : null;

        // Construct navigation links based on `prev` and `next` values
        var baseUrl = 'https://project-polaro-alpha.fandom.com/wiki/';
        var prevLink = prev ? baseUrl + encodeURIComponent(prev) : null;
        var nextLink = next ? baseUrl + encodeURIComponent(next) : null;

        // Apply navigation functionality to left and right containers within this wrapper
        [leftContainer, rightContainer].forEach(function(container) {
            if (!container) return; // Skip if container is null

            var isHoldingLeft = false;
            var isHoldingMiddle = false;
            
            // Determine the link based on the container's class
            var link = container.classList.contains('pokemon-navigation-left') ? prevLink : nextLink;

            if (link) {
                container.style.cursor = 'pointer';

                // Track mousedown to detect if left or middle mouse button is held
                container.addEventListener('mousedown', function(event) {
                    if (event.button === 0) { // Left click
                        isHoldingLeft = true;
                    } else if (event.button === 1) { // Middle click
                        event.preventDefault();
                        isHoldingMiddle = true;
                    }
                });

                // Navigate on mouseup if button is released within the container
                container.addEventListener('mouseup', function(event) {
                    if (isHoldingLeft && event.button === 0) {
                        window.location.href = link;
                    } else if (isHoldingMiddle && event.button === 1) {
                        window.open(link, '_blank');
                    }
                    isHoldingLeft = false;
                    isHoldingMiddle = false;
                });

                // Reset if the mouse leaves the container before release
                container.addEventListener('mouseleave', function() {
                    isHoldingLeft = false;
                    isHoldingMiddle = false;
                });
            }
        });
    });
}

// Initialize script when Fandom page content loads
mw.hook('wikipage.content').add(initializeNavigationLinks);