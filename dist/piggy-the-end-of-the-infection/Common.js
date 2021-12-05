/* Any JavaScript here will be loaded for all users on every page load. */

/*Locking Comments*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 15;
window.lockOldComments.addNoteAbove = true;

/*Link Preview*/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = "https://static.wikia.nocookie.net/piggy-the-end-of-the-infection/images/c/c1/Missing_image.png/revision/latest/scale-to-width-down/232?cb=20211022044718";