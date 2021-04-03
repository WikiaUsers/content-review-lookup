importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LinkPreview/code.js',
    ]
});

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });


setTimeout(function() {
	console.log(window.pPreview.f);
	window.pPreview.f.chkimagesrc = function() { return true; }
	window.pPreview.RegExp.iimages = ["Coin.png"];
	window.pPreview.noimage = '';
	
	window['pPreview']['def' + 'image']= '';
}, 500)