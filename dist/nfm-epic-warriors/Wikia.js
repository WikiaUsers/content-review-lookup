/*Exo Font*/
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

/*Search Enhancements - by ShermanTheMythran (special thanks to Lunarity)*/
$('.Search .WikiaSearch input[name="search"]').attr('placeholder','Search this wiki');
mediaWiki.loader.load('jquery.ui.core', null, true);
mediaWiki.loader.using('jquery.ui.core', function() {
	"use strict";
	$('body').on('keypress.WikiaSearchHack', function(ev) {
		if (ev.ctrlKey || ev.altKey || ev.metaKey || !ev.which || $(ev.target).is(':focusable')) { return; }
		ev.preventDefault();
		var $box = $('#WikiaSearch > input[type="text"]').focus();
		$box.val($box.val() + (ev.key || String.fromCharCode(ev.charCode))); }
	); }
);

/*External Links - by ShermanTheMythran*/
$('.links a, .wikis a, a.external, .WikiNav > ul > li:last-child > .subnav-2 > li:first-child > .subnav-2a, .WikiNav > ul > li:last-child > .subnav-2 > li > .subnav-3 > li > .subnav-3a').attr('target', '_blank');

/*Magic Spells - by ShermanTheMythran*/
$('.WikiaBarWrapper .tools').append('<li id="MagicSpells"><span id="trigger">»</span><span class="scroll-top spell" title="Scroll to top" style="display: none;">▲</span><span class="spell" id="toggle-ads" title="Hide ads" style="display: none;">●</span><span class="spell" id="hide-rail" title="Hide rail" style="display: none;">►</span><span class="scroll-bottom spell" title="Scroll to bottom" style="display: none;">▼</span><style type="text/css">#trigger{font-size:16px;color:white !important;display:inline-block;cursor:default;transition:transform .5s;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s}.spell{display:inline-block;color:white !important;margin:0 3px;vertical-align:top;cursor:pointer;transition:transform .5s,text-shadow .5s;-moz-transition:-moz-transform .5s,text-shadow .5s;-webkit-transition:-webkit-transform .5s,text-shadow .5s;-o-transition:-o-transform .5s,text-shadow .5s}.spell:hover{text-shadow:0 0 4px silver}</style></li>');
$('#MagicSpells').mouseenter(function() {
	$('.spell').toggle('slow');
	$('#trigger').css({'transform':'rotateY(180deg)','-moz-transform':'rotateY(180deg)','-webkit-transform':'rotateY(180deg)','-ms-transform':'scaleX(-1)','-o-transform':'scaleX(-1)'}); }
);
$('#MagicSpells').mouseleave(function() {
	$('.spell').toggle('slow');
	$('#trigger').css({'transform':'rotateY(0deg)','-moz-transform':'rotateY(0deg)','-webkit-transform':'rotateY(0deg)','-ms-transform':'scaleX(1)','-o-transform':'scaleX(1)'}); }
);
$('.scroll-top').click(function() {
	$(this).parents('html, body').animate({scrollTop:0}, 'slow'); }
);
$('#toggle-ads').toggle(function() {
	$('#toggle-ads').attr('title','Show ads');
	$('.wikia-ad, .SelfServeUrl, .home-top-right-ads').hide('slow'); },
	function() {
		$('#toggle-ads').attr('title','Hide ads');
		$('.wikia-ad, .SelfServeUrl, .home-top-right-ads').show('slow');
	}
);
$('#hide-rail').toggle(function() {
	$('#hide-rail').css({'transform':'rotateY(180deg)','-moz-transform':'rotateY(180deg)','-webkit-transform':'rotateY(180deg)','-ms-transform':'scaleX(-1)','-o-transform':'scaleX(-1)'});
	$('#hide-rail').attr('title', 'Show rail');
	$('.WikiaRail').hide('slow');
	$('.WikiaMainContent').animate({width:'1010'}, 'slow'); },
	function() {
		$('#hide-rail').css({'transform':'rotateY(0deg)','-moz-transform':'rotateY(0deg)','-webkit-transform':'rotateY(0deg)','-ms-transform':'scaleX(1)','-o-transform':'scaleX(1)'});
		$('#hide-rail').attr('title', 'Hide rail');
		$('.WikiaRail').show('slow');
		$('.WikiaMainContent').animate({width:'670'}, 'slow');
	}
);
$('.scroll-bottom').click(function() {
	$(this).parents('html, body').animate({scrollTop: $(document).height()}, 'slow'); }
);

/*Fix Domain Namespace - by ShermanTheMythran*/
$('.ns-4 .WikiaPageHeader > h1').html(wgTitle);
$('.ns-4 .WikiaPageHeader > .tally').after('<h2>' + wgSiteName + ' page</h2>');

/*Easy Dropdown Buttons - by ShermanTheMythran (special thanks to Mathmagician)*/
$('.drop-button').click(function() {
	var buttonToggle = $(this).children();
	buttonToggle.toggle();
	$(this).toggleClass('active'); }
);

/*Spoilers - by ShermanTheMythran*/
$('.spoiler > .spoilerTrigger').toggle(function() {
	$(this).parent().children('.spoilerTrigger').html('Hide spoiler');
	$(this).parent().children('.spoilerText').toggle();},
	function() {
		$(this).parent().children('.spoilerTrigger').html('Show spoiler');
		$(this).parent().children('.spoilerText').toggle();
	}
);

/*Various Fixes - by ShermanTheMythran*/
$('#my-tools-menu').addClass('WikiaMenuElement');
$('html.client-js').addClass(wgUserName);
$('.subnav-2a[data-canonical="newfiles"]').html('New Files');
$('.WikiNav .subnav-3').parent().addClass('parent');
$('#wpSave').click(function() {
	$(this).attr('value','Publishing...'); }
);

/*LUSW-only Fixes*/
$('#mainpage-slider a:not(.wikia-button)').removeAttr('href');
$('#info').append('<a href="/wiki/Template:Info/doc" target="_blank" id="info-help" title="click for help" style="border: 1px solid silver; color: silver; border-radius: 8px; font-size: 6pt; text-align: center; width: 10px; height: 10px; line-height: 12px; padding: 1px; position: absolute; right: 5px; margin-top: -22px; cursor: help; transition: border-color .5s, color .5s; -moz-transition: border-color .5s, color .5s; -webkit-transition: border-color .5s, color .5s; -o-transition: border-color .5s, color .5s; opacity: 1; filter: alpha(opacity=100);">?</a>');
$('.ns-0 figure.thumb').remove();
$('.shortcut > a').attr('title','shortcut');
$('#toc').addClass('GlobalModule');
$('.WikiNav .nav-item').mouseover(function() {
	$('.nav-item').removeClass('active');
	$(this).addClass('active'); }
);
$('.WikiNav .nav-item:first-child').addClass('active');

/*Alternate Tab Function - by ShermanTheMythran*/
//relies on Template:Tabs
$('.tabBox').append('<style type="text/css">.tabTitle{display:inline-block;background:rgba(192,192,192,.1) !important;background:silver;padding:5px 5px 0;margin:-5px 5px 0;border-radius:100% 100% 0 0/10px 10px 0 0;-webkit-border-radius: 100% 100% 0 0/10px 10px 0 0;cursor:pointer;transition:background .5s;-moz-transition:background .5s;-webkit-transition:background .5s;-o-transition:background .5s}.tabTitle.active{background:rgba(192,192,192,.3) !important;font-weight:bold}.tabTitle:hover{background:rgba(192,192,192,.5) !important}</style>');
$('.tabTitle').click(function(){$('.tabTitle').removeClass('active');$(this).addClass('active');});
$('#tab-1').click(function(){$('.tabContent').hide();$('#tab-1-content').show();});
$('#tab-2').click(function(){$('.tabContent').hide();$('#tab-2-content').show();});
$('#tab-3').click(function(){$('.tabContent').hide();$('#tab-3-content').show();});
$('#tab-4').click(function(){$('.tabContent').hide();$('#tab-4-content').show();});
$('#tab-5').click(function(){$('.tabContent').hide();$('#tab-5-content').show();});
$('#tab-6').click(function(){$('.tabContent').hide();$('#tab-6-content').show();});
$('#tab-7').click(function(){$('.tabContent').hide();$('#tab-7-content').show();});
$('#tab-8').click(function(){$('.tabContent').hide();$('#tab-8-content').show();});
$('#tab-9').click(function(){$('.tabContent').hide();$('#tab-9-content').show();});
$('#tab-10').click(function(){$('.tabContent').hide();$('#tab-10-content').show();});

/*Jammers - by ShermanTheMythran*/
//couples with Template:Jammers
$(document).ready(function() {
	var wgUserNamee = wgUserName.split(' ').join('_');
	var $jammers = $('.jammers.' + wgUserNamee);
	var $jammersX = $('.jammers:not(.' + wgUserNamee + ')');
	$($jammers).show();
	$($jammersX).remove(); }
);

/*Reader Mode - by ShermanTheMythran
$('body').append('<a href="/wiki/' + wgPageName + '" id="reader" class="button" style="position:absolute;border-radius:0 0 100% 0/0 0 5px 0 !important;top:0;z-index:20000001;">Reader Mode</a>');
$('#reader').one('click',function(event) {
	event.preventDefault();
	$(this).addClass('active');
	$('body').children(':not(#reader)').remove();
	$('html,body').css('overflow','hidden');
	$('body').append('<iframe frameborder="0" id="PageFrame" src="/wiki/' + wgPageName + '?noexternals=1" style="width:100%;"></iframe>');
	$('#PageFrame').height( $(window).height() );
	$('#PageFrame').load(function() {
		reader = document.getElementById('PageFrame').contentDocument.location.href;
		$('#reader').attr('href',reader);
		$('#PageFrame').contents().find('#WikiaHeader,#WikiaBarWrapper,#WikiaFooter,#WikiaRail,#WikiaPageHeader>*:not(h1,h2),.contribute').hide('slow');
		$('#PageFrame').contents().find('#WikiaMainContent').animate({width:'1010px'}, 'slow');
		$('#PageFrame').contents().find('#WikiaPageHeader').append( $('#PageFrame').contents().find('#WikiaRail #WikiaSearch') );
		$('#PageFrame').contents().find('#WikiaSearch').css({'position':'absolute','right':'0','top':'0'}); }
	); }
);*/

/*Holiday Codes - by ShermanTheMythran
$('.skin-oasis').css('backgroundImage','url("https://images.wikia.nocookie.net/legouniversestories/images/thumb/2/26/Background.png/' + $(document).width() + 'px-Background.png")');
importScriptPage('MediaWiki:Snow.js','c');
window.snowStorm = {
	flakeWidth: 16,			// Max pixel width reserved for snow element
	flakeHeight: 16,			// Max pixel height reserved for snow element
};
$('#WikiaBarWrapper').append('<span id="playerSwitch" class="button" title="turn off music player" style="border-radius:0 100% 100% 0/0 10px 10px 0;bottom:30px;left:0;position:fixed">&nbsp;</span>');
var playerCookie = $.cookie('frostivusPlayer');
if(playerCookie == "removed") {
	removePlayer();
	$('#playerSwitch').click(function() {
		createPlayer();
		$(this).attr('title','turn off music player');
		$.removeCookie('frostivusPlayer');
		$(this).unbind();
		togglePlayer(); }
	);
}
else {
	createPlayer();
	togglePlayer();
}
function removePlayer() {
	$('#playerSwitch').attr('title','turn on music player');
}
function createPlayer() {
	$('#WikiaBarWrapper').append('<audio controls autoplay loop id="frostivusPlayer" style="position:fixed;bottom:0;left:-270px;transition: left .5s;-moz-transition: left .5s;-webkit-transition: left .5s;-o-transition: left .5s"><source src="https://images.wikia.nocookie.net/legouniversestories/images/6/6b/LUMX_Winter_Property.ogg" type="audio/ogg"></audio><style type="text/css">#frostivusPlayer:hover{left:0 !important}</style>');
}
function togglePlayer() {
	$('#playerSwitch').toggle(function() {
		removePlayer();
		$('#frostivusPlayer').remove();
		$.cookie('frostivusPlayer','removed',{expires: 30}); },
		function() {
			createPlayer();
			$(this).attr('title','turn off music player');
			$.removeCookie('frostivusPlayer');
		}
	);
} */

/*jQuery Plugins*/
importScriptPage('MediaWiki:Cookies.js','lustories');