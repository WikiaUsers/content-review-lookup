interlanguage = $('.WikiaArticleInterlang > ul > li > a').map(function() {
	_res = {};
	_res.lang 	= $(this).attr('data-tracking');
	_res.href 	= $(this).attr('href');
	_res.url 	= new mw.Uri(_res.href);
	_res.val 	= $(this).text().trim();
	_res.title 	= new mw.Title(decodeURIComponent(_res.url.path.replace(wgArticlePath.replace('$1',''),'')));
	_res.name 	= _res.title.getNameText();
	return _res;
}).get();