/* Any JavaScript here will be loaded for all users on every page load. */
// window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
// window.pPreview.defimage = '<full URL image to be added for full URL image>';
// window.pPreview.noimage = '<full URL image to be added if no image is available for page>';
// window.pPreview.tlen = 1000;

/* Configure LinkPreview */
window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);
window.pPreview.defimage = 'https://static.wikia.nocookie.net/boyfriendpedia/images/e/e3/No_Image.png';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/boyfriendpedia/images/e/e3/No_Image.png';
window.pPreview.tlen = 1000;