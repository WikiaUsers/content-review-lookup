window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru';
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru';
window.pPreview.RegExp.iclasses = ['.wikitable', '.article-table'];
window.pPreview.RegExp.onlyinclude = ['.myclass', '#myid', '[data-include-me=1]'];
window.pPreview.RegExp.noinclude = ['.thumb .thumbcaption p', '.page-content dl', '.wikitable', '.article-table', 'blockquote']
window.pPreview.scale = false;
window.pPreview.dock = '#mw-content-text';