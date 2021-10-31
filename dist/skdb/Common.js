/* Any JavaScript here will be loaded for all users on every page load. */

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/skdb/images/5/5a/Collage-final.png/revision/latest/scale-to-width-down/700?cb=20211014183756';
window.pPreview.tlen = 1000;
window.pPreview.RegExp.iparents = ['.myclass', '#myid', 'div[data-ignore-me=1]'];