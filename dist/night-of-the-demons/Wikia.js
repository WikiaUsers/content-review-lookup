
$('.WikiNav > ul > li:first-child').addClass('liActive');
$('.WikiNav > ul > li').mouseenter(function() {
	$('.WikiNav > ul > li').removeClass('liActive');
	$(this).addClass('liActive'); }
);


if (mw.config.get('wgCanonicalSpecialPageName') == 'WikiActivity') mw.loader.load('ext.TwitterTag');