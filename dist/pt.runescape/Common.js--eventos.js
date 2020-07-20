var url_base = "https://teamup.com/ks40ea143800780931?showLogo=0&showTitle=0";

$('div.eventos-embed').each(function() {
	var url = url_base;
	if($(this).hasClass("mini")) url += "&view=l&sidepanel=c";

    $(this).html('<iframe src="' + url + '" frameborder="0"></iframe>');
});