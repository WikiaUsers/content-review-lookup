/* Any JavaScript here will be loaded for all users on every page load. */

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });  //for LinkPreview
window.pPreview.tlen = 250; // Limits text length in the preview
window.pPreview.wholepage = true;
window.pPreview.pibox = true; // Includes portable infoboxes in the preview
window.pPreview.piboxkeepprev = true; // Keeps elements preceding the infobox
window.pPreview.delay = 250;
window.pPreview.RegExp.onlyinclude = [
  '.mw-parser-output > p'     // Main paragraph content only
];