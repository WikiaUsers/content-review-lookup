/* Minor Fix */

$('#my-tools-menu').addClass('WikiaMenuElement');
$('.mediawiki').addClass(wgUserName);
$('.shortcut > a').attr('title','shortcut');
$('.WikiNav > ul > li:first-child').addClass('liActive');
$('.WikiNav > ul > li').mouseenter(function() {
	$('.WikiNav > ul > li').removeClass('liActive');
	$(this).addClass('liActive'); }
);