/* Any JavaScript here will be loaded for all users on every page load. */

//LinkPreview & "Image Not Avaliable" config
window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);

window.pPreview.defimage = 'https://static.wikia.nocookie.net/doodlejump1/images/7/70/Image_Not_Avaliable.png/revision/latest?cb=20220604013856&format=original';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/doodlejump1/images/7/70/Image_Not_Avaliable.png/revision/latest?cb=20220604013856&format=original';