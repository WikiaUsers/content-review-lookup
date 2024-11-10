var zoomContainers = document.querySelectorAll('.zoom-container'); 
var mapImages = document.querySelectorAll('.map-image'); 

var zoomLevels = [];
var offsets = [];
var markersInitialPositions = [];

var originalWidth = 4096;  
var originalHeight = 4096;

zoomContainers.forEach(function(container, index) {
    // Determine initial zoom level
    var initialZoomLevel = Math.min(300 / originalWidth, 300 / originalHeight);
    
    // Check for mobile devices
    var isMobile = window.innerWidth <= 768; // Adjust the breakpoint if needed
    if (isMobile) {
        initialZoomLevel = Math.max(initialZoomLevel, 1); // Set minimum zoom level to 1
    }

    zoomLevels[index] = initialZoomLevel;
    offsets[index] = { x: 0, y: 0 };
    markersInitialPositions[index] = [];

    // Apply the initial zoom level to the image
    mapImages[index].style.transform = 'scale(' + zoomLevels[index] + ')';
    mapImages[index].style.transformOrigin = 'top left';

    var markersContainer = container.parentElement.querySelector('.map-markers');
    var markers = markersContainer.querySelectorAll('.map-marker');

    // Calculate and store the initial positions of markers
    markers.forEach(function(marker, markerIndex) {
        // Store original position without scaling for later use
        markersInitialPositions[index][markerIndex] = {
            left: parseFloat(marker.style.left) * (originalWidth / 300), // Original positions converted
            top: parseFloat(marker.style.top) * (originalHeight / 300)
        };

        // Update marker positions immediately after the initial setup
        updateMarkerPosition(marker, markersInitialPositions[index][markerIndex], index);
    });

    // Zoom event listener for this specific map
    container.addEventListener('wheel', function(event) {
        event.preventDefault();
        
        var rect = container.getBoundingClientRect();
        var mouseX = event.clientX - rect.left; 
        var mouseY = event.clientY - rect.top;

        var prevZoomLevel = zoomLevels[index];
        if (event.deltaY < 0) {
            zoomLevels[index] += 0.1; // Zoom in
        } else if (event.deltaY > 0) {
            zoomLevels[index] = Math.max(initialZoomLevel, zoomLevels[index] - 0.1); // Zoom out
        }

        var scaleChange = zoomLevels[index] / prevZoomLevel;
        offsets[index].x = mouseX - scaleChange * (mouseX - offsets[index].x);
        offsets[index].y = mouseY - scaleChange * (mouseY - offsets[index].y);

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const imageWidth = originalWidth * zoomLevels[index];
        const imageHeight = originalHeight * zoomLevels[index];

        // Boundary checks for the image
        offsets[index].x = Math.max(containerWidth - imageWidth, Math.min(0, offsets[index].x));
        offsets[index].y = Math.max(containerHeight - imageHeight, Math.min(0, offsets[index].y));

        // Update map image transform for zoom and position
        mapImages[index].style.transform = 'scale(' + zoomLevels[index] + ') translate(' + (offsets[index].x / zoomLevels[index]) + 'px, ' + (offsets[index].y / zoomLevels[index]) + 'px)';
        mapImages[index].style.transformOrigin = "top left";

        // Update marker positions after zoom
        markers.forEach(function(marker, markerIndex) {
            updateMarkerPosition(marker, markersInitialPositions[index][markerIndex], index);
        });
    });

    // Simulate a zoom-out action after a short delay
    setTimeout(function() {
        // Trigger zoom out
        container.dispatchEvent(new WheelEvent('wheel', { deltaY: 1 }));
    }, 500); // 0.5 second delay to allow for initial render
});

// Function to update marker positions
function updateMarkerPosition(marker, initialPosition, mapIndex) {
    var isMobile = window.innerWidth <= 768; // Check if on mobile

    if (isMobile) {
        // For mobile, keep the marker's original position without scaling
        var originalLeft = initialPosition.left * (300 / originalWidth); // Scale back to original dimensions
        var originalTop = initialPosition.top * (300 / originalHeight);
        
        // Set the position directly based on the original, adjusted for the mobile scale
        marker.style.left = originalLeft + 'px'; 
        marker.style.top = originalTop + 'px'; 
    } else {
        // For desktop, calculate new positions based on zoom level and offsets
        var initialLeft = initialPosition.left + 118; // Adjust as necessary for centering
        var initialTop = initialPosition.top + 207;

        // Calculate new positions based on zoom level and offsets
        var newLeft = initialLeft * zoomLevels[mapIndex] + offsets[mapIndex].x - 8.5; // Adjusted for centering
        var newTop = initialTop * zoomLevels[mapIndex] + offsets[mapIndex].y - 15.5; // Adjusted for centering

        // Update marker positions
        marker.style.left = newLeft + 'px';
        marker.style.top = newTop + 'px';
    }
}

document.querySelectorAll('.map-marker').forEach(function(marker) {
    var hoverContent = marker.querySelector('.hover-content');

    marker.addEventListener('mouseenter', function(event) {
        if (hoverContent) {
            hoverContent.style.position = 'fixed';
            hoverContent.style.left = (event.clientX + 10) + 'px'; // Move right by 100px
            hoverContent.style.top = (event.clientY - 50) + 'px'; // Move up by 200px from pointer
            document.body.appendChild(hoverContent); // Attach to body
            hoverContent.style.display = 'block'; // Show hover content
        }
    });

    marker.addEventListener('mouseleave', function() {
        if (hoverContent) {
            hoverContent.style.display = 'none'; // Hide hover content
            marker.appendChild(hoverContent); // Return it back inside marker
            hoverContent.style.position = 'absolute'; // Reset to relative positioning
            hoverContent.style.left = ''; // Clear custom left position
            hoverContent.style.top = ''; // Clear custom top position
        }
    });

// Prevent page scroll on wheel over markers
    marker.addEventListener('wheel', function(event) {
        event.preventDefault();  // Prevents the default scroll action
        event.stopPropagation(); // Stops the event from bubbling up

        // Trigger the zoom function on the container
        var container = marker.closest('.zoom-container'); // Find the parent container
        if (container) {
            // Dispatch a custom wheel event on the container to handle the zoom
            container.dispatchEvent(new WheelEvent('wheel', { deltaY: event.deltaY }));
        }
    });
});

// Global variable to keep track of currently displayed hover content
var currentHoverContent = null;

// Function to handle mouse enter and leave events to update hover content
function updateHoverContent(marker) {
    var hoverContentElement = marker.querySelector('.hover-content');
    if (hoverContentElement) {
        currentHoverContent = hoverContentElement.innerHTML; // Store the current content
    } else {
        currentHoverContent = null; // Reset if no content
    }
}

// Select all markers and add event listeners
var markers = document.querySelectorAll('.map-marker');
Array.prototype.forEach.call(markers, function(marker) {
    marker.addEventListener('mouseenter', function() {
        updateHoverContent(marker); // Update the current hover content
    });

    marker.addEventListener('mouseleave', function() {
        currentHoverContent = null; // Clear content when mouse leaves
    });

    marker.addEventListener('click', function(event) {
        event.stopPropagation();  // Stop the event from bubbling up
        event.preventDefault();   // Prevent default behavior

        // Check if the current hover content has the hover-link class
        if (currentHoverContent && currentHoverContent.includes("hover-link")) {
            // Create a temporary element to parse the HTML and extract the link
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = currentHoverContent; // Set the inner HTML to the current hover content

            // Find the anchor tag in the hover content
            var link = tempDiv.querySelector('a');
            if (link) {
                var pageTitle = link.getAttribute('href').replace("/wiki/", ""); // Get the page title from href
                var baseURL = "https://theforest.fandom.com//wiki/"; // Your actual wiki base URL
                // Open the link in a new tab
                window.open(baseURL + encodeURIComponent(pageTitle), '_blank');
            } else {
            }
        } else {
        }
    });
});