var codeInject = {
	// Default values:
	suffixJS: '/Page.js',
	suffixCSS: '/Page.css',
	init: function() {
		for(var i in pageScripts.pagesJS) {
			if(wgPageName == pageScripts.pagesJS[i]) {
				$.getScript(wgScript + '?title=' + encodeURIComponent(wgPageName + pageScripts.suffixJS) + '&ctype=text/javascript&action=raw');
			}
		}
		for(var i in pageScripts.pagesCSS) {
			if(wgPageName == pageScripts.pagesCSS[i]) {
				$('head').append($('<link rel="stylesheet" type="text/css" media="screen" />').attr('href', wgScript + '?title=' + encodeURIComponent(wgPageName + pageScripts.suffixCSS) + '&ctype=text/css&action=raw'));
			}
		}
	}
};
$(codeInject.init);