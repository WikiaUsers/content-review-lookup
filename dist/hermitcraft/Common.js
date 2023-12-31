/* Articles are interwiki links so that other wikis can use them. */
importArticles({
    type: 'script',
    articles: [
        'w:c:clashofclans:MediaWiki:Common.js/Sliders.js'
    ]
});

/* Config for [[w:c:dev:PreloadFileDescription]] */
PFD_templates = '{'+'{Information\n| description = \n| source = \n| date = \n| author = \n| permission = \n| other versions = \n}}';
PFD_license = 'License';
PFD_discourageEditorFileUpload = true

window.pPreview = $.extend(true, window.pPreview, {
  RegExp: (window.pPreview || {}).RegExp || {}
});

window.pPreview.tlen = 200;
window.pPreview.apid = true;
window.pPreview.RegExp.iclasses = ["msgbox", "mbox", "reference"];