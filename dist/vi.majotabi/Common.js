/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
/*Back to top button*/
window.BackToTopModern = true;

/*LinkPreview*/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.apid = false;
window.pPreview.delay = 100;
window.pPreview.defimage = 'https://static.wikia.nocookie.net/majo-no-tabitabi/images/2/20/Placeholder-Profile.jpg/revision/latest/scale-to-width-down/147?cb=20200728153140&path-prefix=vi';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/majo-no-tabitabi/images/2/20/Placeholder-Profile.jpg/revision/latest/scale-to-width-down/147?cb=20200728153140&path-prefix=vi';
window.pPreview.tlen = 300;
window.pPreview.RegExp.iparents = ['.thumb', '.no-preview'];
window.pPreview.RegExp.prep = [/<div class="mw-references-wrap">[\s\S]*?<\/div>/igm, /<span class="error mw-ext-cite-error"[\s\S]*?<\/span>/igm, /<sup id="cite_ref[\s\S]*?<\/sup>/igm, /<p class="caption">[\s\S]*?<\/p>/igm];