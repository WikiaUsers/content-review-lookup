/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
    setInterval(function() {
        var nextButton = $('.mw-gallery-slideshow-buttons .oo-ui-buttonElement-button[title*="Next"]');
        if (nextButton.length > 0) {
            nextButton.click();
        }
    }, 5000);
});