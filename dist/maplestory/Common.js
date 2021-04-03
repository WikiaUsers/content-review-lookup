//INACTIVETAG
InactiveUsers = { 
    months: 1
};

// See Template:ResourceLoader
$('.resourceLoader').each(function() {
	var $x = $(this);
	var text = $.trim($x.text());
	
	if (!text) return;
	
	if ($x.data('isModule') == true) 
		return mw.loader.load(text);	
	
	var ns = text.match('^.*?:');
	if (!ns) text = 'MediaWiki:' + text;
	
	var mime = ($x.data('mime') || "text/javascript").toLowerCase();
	if (mime == "text/css") {
		if (text.slice(-4).toLowerCase() !== '.css') text = text + '.css';
		return importArticles({
           type: 'style',
           articles: [text]
        });
	}
	
	if (ns && ns[0].toLowerCase() !== 'mediawiki:') {
		return console.log('ResourceLoader: It is not allowed to load js scripts other than MediaWiki');
	}
	if (text.slice(-3).toLowerCase() !== '.js') text = text + '.js';
	return importArticles({
       type: 'script',
       articles: [text]
    });
});