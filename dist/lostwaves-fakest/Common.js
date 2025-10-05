/* Any JavaScript here will be loaded for all users on every page load. */

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/lostwaves-fakest/images/8/85/Noimagehelper.png/revision/latest?cb=20251003184442';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/lostwaves-fakest/images/8/85/Noimagehelper.png/revision/latest?cb=20251003184442';
window.pPreview.tlen = 1000;
window.pPreview.RegExp.iparents = ['.myclass', '#myid', 'div[data-ignore-me=1]'];