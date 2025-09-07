// Custom fullscreen video player script
mw.hook('wikipage.content').add(function($content) {
    // Only run this script for a specific element on the page
    // For example, an element with the ID 'autoplay-fullscreen-video'
    if (!$content.find('#autoplay-fullscreen-video').length) {
        return;
    }

    // Define the path to your video file
    var videoFileName = 'YOUR-VIDEO-FILE-NAME.mp4';
    var videoSourceUrl = 'https://static.fandom.com/media/YOUR-WIKI-NAME/e/' + videoFileName; // Adjust path as necessary
    
    // Create the overlay container
    var overlay = $('<div>').addClass('fullscreen-video-overlay');

    // Create the video element
    var video = $('<video>').attr({
        'src': videoSourceUrl,
        'autoplay': true, // Auto-plays the video
        'muted': true, // Videos must be muted to autoplay in modern browsers
        'playsinline': true // Required for autoplay on iOS
    });

    // Append video to the overlay, and overlay to the body
    overlay.append(video);
    $('body').append(overlay);

    // Fade in the overlay
    setTimeout(function() {
        overlay.addClass('show');
    }, 100); // Give a small delay to ensure the overlay is in place

    // When the video ends, fade out and remove the overlay
    video.on('ended', function() {
        overlay.removeClass('show');
        setTimeout(function() {
            overlay.remove();
        }, 1000); // Wait for the fade-out transition to finish
    });
});