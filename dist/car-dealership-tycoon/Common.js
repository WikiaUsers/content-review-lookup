/* Any JavaScript here will be loaded for all users on every page load. */

/* Necroposting blocker. */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 20;

/* Link Preview */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/car-dealership-tycoon/images/4/47/Placeholder.png/revision/latest?cb=20220815221949';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/car-dealership-tycoon/images/4/47/Placeholder.png/revision/latest?cb=20220815221949';