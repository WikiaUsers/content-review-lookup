/* created by Curiouscrab */
var ommittedNamespaces = [1, 2, 3, 5, 7, 9, 11, 13, 15, 111, 113, 115, 501, 503, 829, 1200, 1201, 1202, 2000, 2001, 2002];
var lang;
var i = 0;
var filetype = mw.config.get('wgPageName').split('.')[mw.config.get('wgPageName').split('.').length-1];
if(filetype == 'js') {
	if($('.jquery').length) {
		lang = 'jquery';
	} else {
		lang = 'javascript';
	}
} else if(filetype == 'css') {
	lang = 'css';
} else if(wgNamespaceNumber == 828) {
	lang = 'lua';
}
if(wgAction == 'view' && !$('.diff-article-content').length && !$('.noarticletext').length && ommittedNamespaces.indexOf(wgNamespaceNumber) === -1 && !$('#mw-clearyourcache') && lang !== undefined) {
	if(!$('.'+lang).length) {
		$('#mw-content-text').html('<pre class="' + lang + ' source-' + lang + '" id="theme-solarized-light">' + $('#mw-content-text').html().replace(/<\/pre\>/g,'').replace(/<pre\>/g,'').replace(/<span class\=\"co1\"\>\/\* \*\/<\/span\>/g,'').replace(/\<span class\=\"sy0\"\>\*\<\/span\>/g,'') + '</pre>');
	} else {
		$('.'+lang).html($('.'+lang).html().replace(/<span class\=\"co1\"\>\/\* \*\/<\/span\>/g,'').replace(/<span class\=\"co1\"\>\/\/<\/span\>/g,'').replace(/\<span class\=\"coMULTI\"\>\/\*\<\/span\>/g,'').replace(/\/\*/g,'<slashasterisk>').replace(/\*\//g,'<asteriskslash>').replace(/\/\//g,'<slashslash>'));
		$('#mw-content-text').html($('#mw-content-text').html().replace(/\:\/\//g,'<colonslashslash>').replace(/\/\//g,'').replace(/\/\*/g,'').replace(/\*\//g,'').replace(/\<slashasterisk\>/g,'/*').replace(/\<asteriskslash\>/g,'*/').replace(/\<slashslash\>/g,'//').replace(/\/\* \*\//g,'').replace(/\<span class\=\"sy0\"\>\*\/\<\/span\>/g,'').replace(/\<span class\=\"sy0\"\>\*\<\/span\>\//g,'').replace(/\<colonslashslash\>/g,'://'));
	}
} else if($('.diff-article-content').length && lang !== undefined) {
	if(!$('.'+lang).length) {
		$('.diff-article-content').html('<pre class="' + lang + ' source-' + lang + '" id="theme-solarized-light">' + $('.diff-article-content').html().replace(/<\/pre\>/g,'').replace(/<pre\>/g,'').replace(/<span class\=\"co1\"\>\/\* \*\/<\/span\>\//g,'') + '</pre>');
	} else {
		for(var i in $('.'+lang)) {
			$('.diff-article-content').html('<pre class="' + lang + ' source-' + lang + '" id="theme-solarized-light">' + document.getElementsByClassName(lang)[i].innerHTML.replace(/<span class\=\"co1\"\>\/\/<\/span\>/g,'').replace(/<pre class\=\"de1\"\>/g,'').replace(/<\/pre\>/g,'').replace(/<span class\=\"co1\"\>\/\* \*\/<\/span\>/g,'') + '</pre>');
		}
	}
}