WebFontConfig = {
		google: { families: [ 'Exo:500,800,500italic,800italic:latin' ] }
	};
	(function() {
		var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
			'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
	})();

/*WikiaSearch Placeholder - by ShermanTheMythran*/
$('.Search .WikiaSearch input[name="search"]').attr("placeholder", "Search this wiki");

/*External Links - by ShermanTheMythran*/
$('.links a, .wikis a, a.external, .WikiNav > ul > li:last-child > .subnav-2 > li:first-child > .subnav-2a, .WikiNav > ul > li:last-child > .subnav-2 > li > .subnav-3 > li > .subnav-3a').attr('target', '_blank');

/*Button Hub - by ShermanTheMythran*/
$('.WikiaHeader').append('<span id="button-hub" style="position: fixed; top: 0; margin-top: -14px; right: 20px; transition: margin .5s; -moz-transition: margin .5s; -webkit-transition: margin .5s; -o-transition: margin .5s;"><span class="button" id="scroll-top" title="Scroll to top" style="border-radius: 0 0 0 100% / 0 0 0 10px; -moz-border-radius: 0 0 0 100% / 0 0 0 10px; -webkit-border-radius: 0 0 0 100% / 0 0 0 10px;">▲</span>' + '<span class="button" id="scroll-bottom" title="Scroll to bottom" style="border-radius: 0 0 100% 0 / 0 0 10px 0; -moz-border-radius: 0 0 100% 0 / 0 0 10px 0; -webkit-border-radius: 0 0 100% 0 / 0 0 10px 0;">▼</span>');

$('#scroll-top, .scroll-top').click(function() { $('html, body').animate({scrollTop:0}, 'slow') });

$('#scroll-bottom, .scroll-bottom').click(function() { $('html, body').animate({scrollTop:$(document).height()}, 'slow') });

/*Fix Domain Namespace - by ShermanTheMythran*/
$('.ns-4 .WikiaPageHeader > h1').html(wgTitle);
$('.ns-4 .WikiaPageHeader > .tally').after('<h2>' + wgSiteName + ' page</h2>');

/*Easy Dropdown Buttons - by ShermanTheMythran (special thanks to Mathmagician)*/
$('.drop-button').click(function(){
	var buttonToggle = $(this).children();
	buttonToggle.toggle();
	$(this).toggleClass('active');
});

/*Spoilers - by ShermanTheMythran*/
$('#spoiler-button').click(function(){
	$('#spoiler-text').slideToggle('slow');
});
$('#spoiler-button').toggle(function(){
	$('#spoiler-button').html('Hide spoiler');},
	function(){
	$('#spoiler-button').html('Show spoiler');}
);

/*Various Fixes - by ShermanTheMythran*/
$('#my-tools-menu').addClass('WikiaMenuElement');
$('#info').append('<a href="/wiki/Template:Info/doc" target="_blank" id="info-help" title="click for help" style="border: 1px solid #D4AF37; color: #D4AF37; border-radius: 8px; font-size: 6pt; text-align: center; width: 10px; height: 10px; line-height: 12px; padding: 1px; position: absolute; right: 5px; margin-top: -22px; cursor: help; transition: border-color .5s, color .5s; -moz-transition: border-color .5s, color .5s; -webkit-transition: border-color .5s, color .5s; -o-transition: border-color .5s, color .5s; opacity: 1; filter: alpha(opacity=100);">?</a>');
$('.ns-0 figure.thumb').remove();
$('.mediawiki').addClass(wgUserName);
$('.shortcut > a').attr('title','shortcut');
$('.mediawiki .WikiNav').width('-=73px');
$('.WikiNav .subnav-3').parent().addClass('parent');