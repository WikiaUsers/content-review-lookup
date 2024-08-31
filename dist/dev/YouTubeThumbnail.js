(function (window, $, mw) {
  "use strict";

  // Double-run protection
  window.dev = window.dev || {};
  window.dev.youtubeThumbnail = {};

  // Only run on article pages
  // @ts-expect-error
  if (mw.config.get("wgNamespaceNumber") === 0) {
    mw.hook('wikipage.content').add(function () {
      if (window.dev.youtubeThumbnail.hasRan === true) {
        console.log("YouTubeThumbnail already ran!");
        window.dev.youtubeThumbnail.hasRan = true;
        return;
      }
      
      var thumbPlaceholders = document.getElementsByClassName("youtube-thumbnail");

      for (var i = 0; i < thumbPlaceholders.length; i++) {
        var imgElem = document.createElement("img");
        imgElem.src = "https://i.ytimg.com/vi/".concat(thumbPlaceholders[i].dataset.ytThumbId, "/hq720.jpg");
        thumbPlaceholders[i].appendChild(imgElem);
      }
    });
  }
})(this, jQuery, mediaWiki);