$(document).ready(function() {
    // Create overlay div for the page background
    var overlay = $('<div></div>').css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 0,
        pointerEvents: 'none'
    });
    $('body').prepend(overlay);

    // Darken all images slightly
    $('img').css({
        position: 'relative',
        zIndex: 1,
        filter: 'brightness(50%)'
    });
});