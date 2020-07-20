/*Auto Focus - by ShermanTheMythran (special thanks to Lunarity)*/
mediaWiki.loader.load('jquery.ui.core', null, true);
mediaWiki.loader.using('jquery.ui.core', function() {
	"use strict";
	$('body').on('keypress.WikiaSearchHack', function(ev) {
		if (ev.ctrlKey || ev.altKey || ev.metaKey || !ev.which || $(ev.target).is(':focusable')) { return; }
		ev.preventDefault();
		var $box = $('#Write textarea').focus();
		$box.val($box.val() + (ev.key || String.fromCharCode(ev.charCode))); }
	); }
);

/*Chat Away Button - by ShermanTheMythran (special thanks to Monchoman45)*/
function toggleAway(msg) {
	if(!msg) {var msg = '';}
	if($('#ChatHeader .User').hasClass('away') == true) {
		mainRoom.setBack();
	}
	else {
		mainRoom.setAway(msg);
	}
}
toggleAway.back = function() { //Force back status
	if($('#ChatHeader .User').hasClass('away') == true) {mainRoom.setBack();}
}
toggleAway.away = function(msg) { //Force away status
	if(!msg) {var msg = '';}
	if($('#ChatHeader .User').hasClass('away') == false) {mainRoom.setAway(msg);}
}
$(window).unbind('mousemove');
$('.Write .message').append('<span id="afk" class="button" style="height: 31px !important; border-radius: 100%/5px; -webkit-border-radius: 100%/5px; width: 41px; padding: 10px 0 0; text-align: center; position: absolute; right: 150px; bottom: -15px;">AFK</span>');
$('#afk').click(toggleAway);

//$('.ChatWindow').css('backgroundImage','url("https://images.wikia.nocookie.net/legouniversestories/images/thumb/2/26/Background.png/' + $(document).width() + 'px-Background.png")');

/*Chat Party - by ShermanTheMythran*/
var partyLink1 =
"https://images.wikia.nocookie.net/legouniversestories/images/6/66/Parov_Stelar_Catgroove_%28album_Coco_Ep%29.ogg"; //link to first song in ogg
 
var partyLinkIE1 =
"http://k007.kiwi6.com/hotlink/360ltc8u27/parov_stelar_catgroove_album_coco_ep_.mp3"; //link to first song in mp3
 
var partyLinkText1 =
"Catgroove - Parov Stelar"; //text for first song
 
var partyLink2 =
"https://images.wikia.nocookie.net/legouniversestories/images/a/a5/Song_of_time_-_Dance_Remix.ogg"; //link to second song in ogg
 
var partyLinkIE2 =
"http://k007.kiwi6.com/hotlink/3osgiw3sk6/song_of_time_-_dance_remix.mp3"; //link to second song in mp3
 
var partyLinkText2 =
"Song of Time (Dance Remix)"; //text for second song
 
var partyLink3 =
"https://images.wikia.nocookie.net/legouniversestories/images/4/46/Alex_Clare_-_Too_Close_%28OFFICIAL_VIDEO%29.ogg"; //link to third song in ogg
 
var partyLinkIE3 =
"http://k007.kiwi6.com/hotlink/00s8g96z89/alex_clare_-_too_close_official_video_.mp3"; //link to third song in ogg
 
var partyLinkText3 =
"Too Close - Alex Clare"; //text for third song

importScriptPage('MediaWiki:ChatParty.js','lustories');