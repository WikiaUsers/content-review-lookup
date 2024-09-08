window.BackToTopModern = true;

/* Configure LinkPreview */
window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);
window.pPreview.defimage = 'https://static.wikia.nocookie.net/sakamichi-series/images/3/3b/Sakamichiwikinoimage.png/revision/latest?cb=20240903205442';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/sakamichi-series/images/3/3b/Sakamichiwikinoimage.png/revision/latest?cb=20240903205442';