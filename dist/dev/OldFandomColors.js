if ($('body:is(.wiki-wikia, .wiki-dev, .wiki-vstf)').length || $('link[rel="shortcut icon"]').attr('href') === '/skins-ucp/common/favicon.ico') {
	$('link[rel="shortcut icon"]').attr('href', getComputedStyle(document.body).getPropertyValue('--site-favicon').replace(/"/g, ''));
}