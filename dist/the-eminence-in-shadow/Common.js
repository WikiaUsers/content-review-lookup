/* Any JavaScript here will be loaded for all users on every page load. */
/* Reference Popup */
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false, hoverDelay: 150 };

/* Link Preview */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = '';
window.pPreview.delay = 200;
window.pPreview.noimage = 'https://static.wikia.nocookie.net/to-be-a-power-in-the-shadows/images/6/6e/No-image-available-Claire.jpg';
window.pPreview.RegExp.iparents = ['[id^=flytabs]', 'div#gallery-0'];