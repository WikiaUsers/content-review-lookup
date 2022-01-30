/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
importScript('MediaWiki:Gadget-Popups.js');
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru';
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru';
window.pPreview.RegExp.iclasses = ['.wikitable', '.article-table'];
window.pPreview.RegExp.onlyinclude = ['.myclass', '#myid', '[data-include-me=1]'];
window.pPreview.RegExp.noinclude = ['.mw-parser-output .tright', '.wikitable', '.article-table', '.mw-parser-output .tleft']
window.pPreview.scale = false;
window.pPreview.dock = '#mw-content-text';