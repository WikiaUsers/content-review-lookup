/*Search Enhancements - by ShermanTheMythran (special thanks to Lunarity)*/
mediaWiki.loader.load('jquery.ui.core', null, true);
mediaWiki.loader.using('jquery.ui.core', function() {
"use strict";
$('body').on('keypress.WikiaSearchHack', function(ev) {
    if (ev.ctrlKey || ev.altKey || ev.metaKey || !ev.which || $(ev.target).is(':focusable')) { return; }
    ev.preventDefault();
    var $box = $('#WikiaSearch > input[type="text"]').focus();
    $box.val($box.val() + (ev.key || String.fromCharCode(ev.charCode)));
});
});
 
/*Hide Header Toolbar - by ShermanTheMythran*/
$('.wikia-header-mask').before('<div id="HeaderCollapse" class="expanded"><span>▲</span><style type="text/css">#HeaderCollapse{position:fixed;z-index:-1;right:10px;width:30px;margin:34px 0 0;background:#CFD2DA;color:#305599;text-align:center;border-radius:0 0 5px 5px;-webkit-border-radius:0 0 5px 5px;cursor:pointer;border-width:0 2px 2px;border-style:solid;border-color:#91aacf;transition:margin .5s;-moz-transition:margin .5s;-webkit-transition:margin .5s;-o-transition:margin .5s}#HeaderCollapse span{display:block;transition:transform .5s;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s}.WikiaTopAds{top:34px;padding:20px 0 !important;z-index:-1;transition:top .5s;-moz-transition:top .5s;-webkit-transition:top .5s;-o-transition:top .5s}.WikiaPage{transition:top .5s;-moz-transition:top .5s;-webkit-transition:top .5s;-o-transition:top .5s}#HeaderCollapse.expanded span{transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-ms-transform:scaleX(1);-o-transform:scaleX(1)}#HeaderCollapse.collapsed span{transform:rotateX(180deg);-moz-transform:rotateX(180deg);-webkit-transform:rotateX(180deg);-ms-transform:scaleY(-1);-o-transform:scaleY(-1)}</style></div>');
var collapseHeader = function() {
	$('#HeaderCollapse').removeClass('expanded').addClass('collapsed').unbind().bind('click',expandHeader);
	$('.WikiaHeader').css('marginTop','-=34px');
	$.cookie('headerCollapse','collapsed',{expires: 365});
};
var expandHeader = function() {
	$('#HeaderCollapse').removeClass('collapsed').addClass('expanded').unbind().bind('click',collapseHeader);
	$('.WikiaHeader').css('marginTop','+=34px');
	$.cookie('headerCollapse',null);
};
$('#HeaderCollapse').click(collapseHeader);
var hcCookie = $.cookie('headerCollapse');
if(hcCookie == "collapsed") {
	$(collapseHeader);
}

/*Hide Footer Toolbar - by ShermanTheMythran*/
$('.wikia-bar').before('<div id="FooterCollapse" class="expanded"><span>▼</span><style type="text/css">#FooterCollapse{position:absolute;z-index:-1;right:10px;width:30px;bottom:25px;background:#FDFDFD;color:#305599;text-align:center;border-radius:5px 5px 0 0;-webkit-border-radius:5px 5px 0 0;cursor:pointer;border-width:2px 2px 0;border-style:solid;border-color:#91aacf;transition:bottom .5s;-moz-transition:bottom .5s;-webkit-transition:bottom .5s;-o-transition:bottom .5s}#FooterCollapse span{display:block;transition:transform .5s;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s}#FooterCollapse.expanded span{transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-ms-transform:scaleX(1);-o-transform:scaleX(1)}#FooterCollapse.collapsed span{transform:rotateX(180deg);-moz-transform:rotateX(180deg);-webkit-transform:rotateX(180deg);-ms-transform:scaleY(-1);-o-transform:scaleY(-1)}</style></div>');
var collapseFooter = function() {
	$('#FooterCollapse').removeClass('expanded').addClass('collapsed').unbind().bind('click',expandFooter);
	$('.WikiaBarWrapper').css('bottom','-25px');
	$.cookie('footerCollapse','collapsed',{expires: 365});
};
var expandFooter = function() {
	$('#FooterCollapse').removeClass('collapsed').addClass('expanded').unbind().bind('click',collapseFooter);
	$('.WikiaBarWrapper').css('bottom','0px');
	$.cookie('footerCollapse',null);
};
$('#FooterCollapse').click(collapseFooter);
$('.WikiaBarWrapper').css('bottom','0px');
var fcCookie = $.cookie('footerCollapse');
if(fcCookie == "collapsed") {
	$(collapseFooter);
}
 
/*Magic Spells - by ShermanTheMythran*/
$('.WikiaBarWrapper .tools').append('<li id="MagicSpells"><span id="trigger">»</span><span class="scroll-top spell" title="Scroll to top" style="display: none;">▲</span><span class="spell" id="toggle-ads" title="Hide ads" style="display: none;">●</span><span class="spell" id="hide-rail" title="Hide rail" style="display: none;">►</span><span class="scroll-bottom spell" title="Scroll to bottom" style="display: none;">▼</span><style type="text/css">#MagicSpells{font-family:Helvetica;padding:2px 5px !important}#trigger{font-size:16px;color:#305599 !important;display:inline-block;margin-top:-1px;cursor:default;transition:transform .5s;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s}.spell{display:inline-block;color:#305599 !important;margin:0 3px;vertical-align:top;cursor:pointer;transition:transform .5s,text-shadow .5s;-moz-transition:-moz-transform .5s,text-shadow .5s;-webkit-transition:-webkit-transform .5s,text-shadow .5s;-o-transition:-o-transform .5s,text-shadow .5s}.spell:hover{text-shadow:0 0 4px #305599}</style></li>');
 
$('#MagicSpells').mouseenter(function() {
	$('.spell').toggle('slow');
	$('#trigger').css({'transform':'rotateY(180deg)','-moz-transform':'rotateY(180deg)','-webkit-transform':'rotateY(180deg)','-ms-transform':'scaleX(-1)','-o-transform':'scaleX(-1)'}); }
);
 
$('#MagicSpells').mouseleave(function() {
	$('.spell').toggle('slow');
	$('#trigger').css({'transform':'rotateY(0deg)','-moz-transform':'rotateY(0deg)','-webkit-transform':'rotateY(0deg)','-ms-transform':'scaleX(1)','-o-transform':'scaleX(1)'}); }
);
 
$('.scroll-top').click(function() {
	$('html, body').animate({scrollTop:0}, 'slow'); }
);
 
$('#toggle-ads').toggle(function() {
	$('#toggle-ads').attr('title','Show ads');
	$('.wikia-ad, .SelfServeUrl').hide('slow'); },
	function() {
		$('#toggle-ads').attr('title','Hide ads');
		$('.wikia-ad, .SelfServeUrl').show('slow');
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
	$('html, body').animate({scrollTop: $(document).height()}, 'slow'); }
);

/*Header Toolbar TOC - by ShermanTheMythran*/
if (document.getElementById("toc") == null) {
}
else {
$('.GlobalNavigation').append('<li class="topNav TOC"><a style="cursor: default;">Jump to...<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron" height="0" width="0"></a><div class="subnav" style="width: 200px; left: auto; border-radius: 0 15px 15px 15px; -webkit-border-radius: 0 15px 15px 15px; padding: 5px 0 10px;"></div><style type="text/css">#toctitle{display:none}.tocnumber::before{content:"#"}.tocnumber::after{content:":"}.toc li{width:100% !important}</li>');
$('.topNav.TOC .subnav').append( $('.toc') );
$('.toc ul').addClass('catnav').css('margin','0');
}

/*Various Fixes - by ShermanTheMythran*/
$('.WikiNav > ul > li:first-child').addClass('liActive');
$('.WikiNav > ul > li').mouseenter(function() {
	$('.WikiNav > ul > li').removeClass('liActive');
	$(this).addClass('liActive'); }
);
$('.WikiNav .subnav-3').parent().mouseenter(function() {
	$(this).addClass('liActive-2'); }
);
$('.WikiNav .subnav-2 > li').mouseleave(function() {
	$('.WikiNav .subnav-2 > li').removeClass('liActive-2'); }
);