/* Any JavaScript here will be loaded for all users on every page load. */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.noimage = 'https://static.wikia.nocookie.net/medalisttest/images/6/60/No_Image_Available.png/revision/latest';
window.pPreview.delay = 20;
window.pPreview.RegExp.iclasses = ['info-icon', 'image'];
window.pPreview.RegExp.iparents = ['.mw-changeslist', '.custom-tabs', '.portal'];
window.pPreview.RegExp.noinclude = ['.pull-quote', '.mbox', '.custom-tabs'];