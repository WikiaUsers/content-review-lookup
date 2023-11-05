/* Any JavaScript here will be loaded for all users on every page load. */

/* Making Steam videos embeddable - for game trailers, etc. */

$(function () {
  mw.hook('wikipage.content').add(function($content) {
    var steamVideoElements = $content.find('div[data-type="steamvideo"]');
    if (steamVideoElements.length == 0) return;

    steamVideoElements.each(function(i) {
      var element = $(this),
          videoUrl = element.data('url'),
          iframe = document.createElement('iframe');

      // Check if the URL is from Steam before embedding
      if (isSteamVideoUrl(videoUrl)) {
        iframe.src = videoUrl;
        var width = element.data('width') || '640px';

        // Calculate the height based on a 16:9 aspect ratio
        var aspectRatioHeight = calculateAspectRatioHeight(width, 16 / 9);
        iframe.width = width;
        iframe.height = aspectRatioHeight + 'px';

        element.after(iframe);
        element.remove();
      } else {
        // Handle the case where the URL is not from Steam
        element.html('This video source is not allowed.');
      }
    });
  });

  // Function to check if a URL is from Steam
function isSteamVideoUrl(url) {
  // Check if the URL contains "steam" and is hosted on a known Steam domain
  return /steam/.test(url) && (url.includes("store.steampowered.com") || url.includes("cdn.akamai.steamstatic.com"));
}

  // Function to calculate height based on aspect ratio
  function calculateAspectRatioHeight(width, aspectRatio) {
    var numericWidth = parseInt(width, 10);
    return Math.round(numericWidth / aspectRatio);
  }
});