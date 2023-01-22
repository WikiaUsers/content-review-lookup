window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.tlen = 100;
window.pPreview.RegExp.iimages = ['Disambig_gray.svg','China_road_sign_警_35.svg','Essay.svg'];
window.pPreview.RegExp.ilinks = [/(File|Template):/];
window.pPreview.RegExp.noinclude = ['.dab-hat', '.hatnote', '.ambox'];
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LinkPreview/code.js',
    ]
});