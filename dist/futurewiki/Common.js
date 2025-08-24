/* Any JavaScript here will be loaded for all users on every page load. */
// Futurewiki - Enable HTML5 audio spans
$(document).ready(function() {
  $('.html5audio').each(function() {
    var $span = $(this);
    var file = $span.data('file');
    var volume = parseFloat($span.data('volume')) || 1.0;
    var options = ($span.data('options') || "").split(",");

    // Create the <audio> element
    var audio = $('<audio>', {
      preload: $span.data('preload') || 'auto',
      controls: true
    }).append($('<source>', {
      src: file,
      type: 'audio/ogg'
    }));

    // Apply options
    if (options.includes('autoplay')) {
      audio.attr('autoplay', true);
    }
    if (options.includes('loop')) {
      audio.attr('loop', true);
    }

    // Set volume
    audio[0].volume = volume;

    // Replace the span with the real audio player
    $span.replaceWith(audio);
  });
});