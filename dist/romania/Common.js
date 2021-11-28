(function ($) {
	'use strict';
 
	$(function (){
		// remove the access key(s)
		$('[accesskey]').removeAttr('accesskey').each(function (_, e) {
			var
				t = e.getAttribute('title');
 
			if (t) {
				// edit the title to remove the hint text
				e.setAttribute('title', t.replace(/\s*\[.*\]/, ''));
			}
		});
	});
}(jQuery));

/** Administrare afișare diacritice. Vedeți [[Wikipedia:Corectarea diacriticelor]] */

mw.loader.load("http://romania.wikia.com/wiki/MediaWiki:Diacritice-ve.js&ctype=text/javascript");

/** End administrare diacritice *************/