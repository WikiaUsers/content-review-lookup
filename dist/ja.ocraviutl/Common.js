/* ここにあるすべてのJavaScriptは、すべての利用者のどのページに対しても読み込まれます */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/ocraviutl/images/6/62/%E3%83%8A%E3%82%A4%E3%83%87%E3%82%B9.png/revision/latest/scale-to-width-down/200?cb=20191025140950&path-prefix=ja';
window.pPreview.RegExp.iparents = ['.noprev'];
window.pPreview.RegExp.iclasses = ['noprev']
window.pPreview.RegExp.onlyinclude = ['.prev', '[uselprev=1]'];

importArticles({
    type:"script",
    articles:[
        "MediaWiki:Fa5.js"
        ]
    })