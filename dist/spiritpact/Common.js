/* Any JavaScript here will be loaded for all users on every page load. */

/* Enables preview image for links */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/spiritpact/images/8/89/Wiki-wordmark.png/revision/latest?cb=20170815041433';