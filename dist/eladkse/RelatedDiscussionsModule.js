$('#WikiaRail').bind('DOMNodeInserted', function(event) {
	if((mw.config.get('skin') !== 'oasis') || !$('#mw-content-text > #RelatedForumDiscussion').length) {
		return;
	}
 
	var userconfig = (window.RelatedDiscussionsConfig) ? window.RelatedDiscussionsConfig : {};
	var config = $.extend(true, {
		'en': "Related Discussions",
		'es': "Hilos relacionados",
		'hu': "Kapcsolódó beszélgetések",
		'pl': "Podobne Dyskusje"
	}, userconfig);
	var title = ((mw.config.get('wgContentLanguage')) in config) ? config[mw.config.get('wgContentLanguage')] : config.en;
 
	$('#WikiaRail > .LatestPhotosModule').after($('#mw-content-text > #RelatedForumDiscussion').addClass('module'));
	$('#RelatedForumDiscussion > h2').replaceWith($('#WikiaRail > #RelatedForumDiscussion > h2').html().split('</a>')[0] + '</a><h1>' + title + '</h1>');
});