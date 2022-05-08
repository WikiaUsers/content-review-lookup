/* Articles are interwiki links so that other wikis can use them. */
importArticles({
    type: 'script',
    articles: [
        'w:c:clashofclans:MediaWiki:Common.js/Sliders.js'
    ]
});

window.pPreview = $.extend(true, window.pPreview, {
  RegExp: (window.pPreview || {}).RegExp || {}
});

window.pPreview.tlen = 200;
window.pPreview.apid = true;
window.pPreview.RegExp.iclasses = ["msgbox", "mbox", "reference"];