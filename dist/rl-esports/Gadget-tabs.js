/* Dynamic Tabs - Adapted from Liquipedia - http://wiki.teamliquid.net/dota2/MediaWiki:Common.js */
/* Tabs by FO-nTTaX */
mw.hook('wikipage.content').add(function() {
	$('div.tabs-dynamic ul.tabs > li').click(
		function () {
			var i = $(this).index() + 1;
			$(this).parent().children('li').removeClass('active');
			$(this).addClass('active');
			$(this).parent().parent().children('div.tabs-content').children('div').removeClass('active');
			$(this).parent().parent().children('div.tabs-content').children('div.content' + i).addClass('active');
		}
	);
	$('div.tabs-dynamic').each(function(index) {
		var h = $(this).children('ul.tabs').children('li.active').index() + 1;
		$(this).children('div.tabs-content').children('div.content' + h).addClass('active');
	});
	var hash = location.hash.slice(1);
	if (hash.substring(0, 4) == 'tab-') {
		var hasharr = hash.split('-scrollto-');
		var tabno = hasharr[0].replace('tab-', '');
    		$('div.tabs-dynamic ul.tabs > li').removeClass('active');
		$('div.tabs-dynamic ul.tabs > li.tab' + tabno).addClass('active');
		$('div.tabs-dynamic div.tabs-content div').removeClass('active');
		$('div.tabs-dynamic div.tabs-content div.content' + tabno).addClass('active');
		if (hasharr.length == 2) {
			var scrollto = '#' + hasharr[1];
			setTimeout(function(){$(window).scrollTop($(scrollto).offset().top)}, 500);
		}
	}
});
/* Dynamic Tabs - END */