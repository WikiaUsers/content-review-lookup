/*Maven Pro Font*/
WebFontConfig = {
	google: { families: [ 'Maven+Pro:500,700:latin' ] }
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
 
/*jQuery Cookie Plugin*/
importScriptPage('MediaWiki:Cookies.js','lustories');
 
/*Fixed Collapsible Header Toolbar - by ShermanTheMythran*/
//Code relies on jQuery Cookie Plugin
$('.wikia-header-mask').before('<div id="HeaderCollapse" class="expanded"><span>▲</span><style type="text/css">#HeaderCollapse{position:fixed;z-index:-1;right:10px;width:30px;margin:34px 0 0;background:#ADD8E6;color:white;text-align:center;border-radius:0 0 5px 5px;-webkit-border-radius:0 0 5px 5px;cursor:pointer}.WikiaHeader{width:100% !important;position:fixed;transition:margin .5s;-moz-transition:margin .5s;-webkit-transition:margin .5s;-o-transition:margin .5s}#HeaderCollapse span{display:block;transition:transform .5s;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s}.WikiaTopAds{top:34px;padding:20px 0 !important;transition:top .5s;-moz-transition:top .5s;-webkit-transition:top .5s;-o-transition:top .5s}.WikiaPage{top:10px;transition:top .5s;-moz-transition:top .5s;-webkit-transition:top .5s;-o-transition:top .5s}#HeaderCollapse.expanded span{transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-ms-transform:scaleX(1);-o-transform:scaleX(1)}#HeaderCollapse.collapsed span{transform:rotateX(180deg);-moz-transform:rotateX(180deg);-webkit-transform:rotateX(180deg);-ms-transform:scaleY(-1);-o-transform:scaleY(-1)}</style></div>');
var collapseHeader = function() {
	$('#HeaderCollapse').removeClass('expanded').addClass('collapsed').unbind().bind('click',expandHeader);
	$('.WikiaHeader').css('marginTop','-=34px');
	$.cookie('headerCollapse','collapsed',{expires: 365});
};
var expandHeader = function() {
	$('#HeaderCollapse').removeClass('collapsed').addClass('expanded').unbind().bind('click',collapseHeader);
	$('.WikiaHeader').css('marginTop','+=34px');
	$.removeCookie('headerCollapse');
};
$('#HeaderCollapse').click(collapseHeader);
var hcCookie = $.cookie('headerCollapse');
if(hcCookie == "collapsed") {
	$(collapseHeader);
}
 
/*Fixed Collapsible Footer Toolbar - by ShermanTheMythran*/
//Code relies on jQuery Cookie Plugin
$('.wikia-bar').before('<div id="FooterCollapse" class="expanded"><span>▼</span><style type="text/css">#FooterCollapse{position:absolute;z-index:-1;right:10px;width:30px;bottom:25px;background: #396C7A !important;background: rgba(57,108,122, 0.7) !important;color:white;text-align:center;border-radius:5px 5px 0 0;-webkit-border-radius:5px 5px 0 0;cursor:pointer}#FooterCollapse span{display:block;transition:transform .5s;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s}#WikiaPage{margin-bottom:25px}.WikiaBarWrapper{transition:bottom .5s;-moz-transition:bottom .5s;-webkit-transition:bottom .5s;-o-transition:bottom .5s}#FooterCollapse.expanded span{transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-ms-transform:scaleX(1);-o-transform:scaleX(1)}#FooterCollapse.collapsed span{transform:rotateX(180deg);-moz-transform:rotateX(180deg);-webkit-transform:rotateX(180deg);-ms-transform:scaleY(-1);-o-transform:scaleY(-1)}.WikiaBarCollapseWrapper,.WikiaBarWrapper .arrow{display:none}</style></div>');
var collapseFooter = function() {
	$('#FooterCollapse').removeClass('expanded').addClass('collapsed').unbind().bind('click',expandFooter);
	$('.WikiaBarWrapper').css('bottom','-25px');
	$.cookie('footerCollapse','collapsed',{expires: 365});
};
var expandFooter = function() {
	$('#FooterCollapse').removeClass('collapsed').addClass('expanded').unbind().bind('click',collapseFooter);
	$('.WikiaBarWrapper').css('bottom','0px');
	$.removeCookie('footerCollapse');
};
$('#FooterCollapse').click(collapseFooter);
$('.WikiaBarWrapper').css('bottom','0px');
var fcCookie = $.cookie('footerCollapse');
if(fcCookie == "collapsed") {
	$(collapseFooter);
}
 
/*Header Toolbar TOC - by ShermanTheMythran*/
if (document.getElementById("toc") == null) {
}
else {
$('.GlobalNavigation').append('<li class="topNav TOC"><a style="cursor: default;">Jump to...<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron" height="0" width="0"></a><div class="subnav" style="width:200px;left:auto;padding:5px;"></div><style type="text/css">#toctitle{display:none}.tocnumber::before{content:"#"}.tocnumber::after{content:":"}.toc,.toc li{width:100% !important}</li>');
$('.topNav.TOC .subnav').append( $('.toc') );
$('.toc ul').addClass('catnav').css('margin','0');
}
 
/*Magic Spells - by ShermanTheMythran*/
$('.WikiaBarWrapper .tools').append('<li id="MagicSpells"><span id="trigger">»</span><span class="scroll-top spell" title="Scroll to top" style="display: none;">▲</span><span class="spell" id="toggle-ads" title="Hide ads" style="display: none;">●</span><span class="spell" id="hide-rail" title="Hide rail" style="display: none;">►</span><span class="scroll-bottom spell" title="Scroll to bottom" style="display: none;">▼</span><style type="text/css">#MagicSpells{font-family:Helvetica;padding:2px 5px !important}#trigger{font-size:16px;color:white !important;display:inline-block;margin-top:-1px;cursor:default;transition:transform .5s;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s}.spell{display:inline-block;color:white !important;margin:0 3px;vertical-align:top;cursor:pointer;transition:transform .5s,text-shadow .5s;-moz-transition:-moz-transform .5s,text-shadow .5s;-webkit-transition:-webkit-transform .5s,text-shadow .5s;-o-transition:-o-transform .5s,text-shadow .5s}.spell:hover{text-shadow:0 0 4px silver}</style></li>');
 
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
 
/*Fix Domain Namespace - by ShermanTheMythran*/
$('.ns-4 .WikiaPageHeader > h1').html(wgTitle);
$('.ns-4 .WikiaPageHeader > .tally').after('<h2>' + wgSiteName + ' page</h2>');
 
/*Spoilers - by ShermanTheMythran*/
//couples with Template:Spoiler
$('.spoiler > .spoilerTrigger').toggle(function() {
	$(this).parent().children('.spoilerTrigger').html('Hide spoiler');
	$(this).parent().children('.spoilerText').fadeToggle();},
	function() {
		$(this).parent().children('.spoilerTrigger').html('Show spoiler');
		$(this).parent().children('.spoilerText').fadeToggle();
	}
);
 

$('.episode .bubble').click(function() {
	$('.episode .bubble').addClass('inactive');
	$(this).removeClass('inactive'); }
);
$('.episode .bubble.one').click(function() {
	$('.img-1').slideDown();
	$('.img-2').slideUp(); }
);
$('.episode .bubble.two').click(function() {
	$('.img-1').slideUp();
	$('.img-2').slideDown(); }
);
 
$('#my-tools-menu').addClass('WikiaMenuElement');
$('.mediawiki').addClass(wgUserName);
$('.shortcut > a').attr('title','shortcut');
$('.WikiNav > ul > li:first-child').addClass('liActive');
$('.WikiNav > ul > li').mouseenter(function() {
	$('.WikiNav > ul > li').removeClass('liActive');
	$(this).addClass('liActive'); }
);
 

var	ajaxIndicator = ajaxIndicator || 'https://images.wikia.nocookie.net/psychusa/images/2/29/Loader.gif',
	ajaxTimer,
	ajaxRefresh = 4000,
	refreshText = 'Refresh',
	refreshHover = 'Check to automatically refresh the content of the page',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = [ 'Special:RecentChanges', 'Special:Log', 'Special:WikiActivity', 'Special:WikiActivity/activity', 'Special:WikiActivity/watchlist' ];
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
 
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" );
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		}
	}
	return "";
}
 
/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
	var	ajaxRLCookie = ( getCookie( "ajaxload-" + wgPageName ) == "on" ) ? true : false;
     if ( wgPageName == "Special:WikiActivity" || wgPageName == "Special:WikiActivity/watchlist" || wgPageName == "Special:WikiActivity/activity" ) { appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader .activity-nav ul' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstheading' ) ); } else { appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader > h2' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstheading' ) ); };
	appTo.append( '<li style="border-left:1px solid #CCC;height:15px;list-style:none;display:inline;margin:0 0 0 6px;padding:2px 0 1px 3px" id="ajaxRefresh"><input type="checkbox" style="margin-top:1px;position:absolute" id="ajaxToggle"><span id="ajaxLoadProgress" style="opacity:0;filter:alpha(opacity=0);position:absolute;height:24px;width:24px;transition:opacity .5s;-moz-transition:opacity .5s;-webkit-transition:opacity .5s;-o-transition:opacity .5s;background-image:url(' + ajaxIndicator + ');margin:-4px 0 0 20px"></span><style type="text/css">#WikiaPageHeader{padding-bottom:9px}.AdminDashboardHeader #ajaxRefresh{margin-top:9px !important;position:absolute}</style></li>' );
	$( '#ajaxLoadProgress' ).ajaxSend( function ( event, xhr, settings ) {
		if ( location.href == settings.url ) {
			$( this ).css({'opacity':'1','filter':'alpha(opacity=100)'});
		}
	} ).ajaxComplete ( function ( event, xhr, settings ) {
		var	$collapsibleElements = $( '#mw-content-text' ).find( '.mw-collapsible' );
		if ( location.href == settings.url ) {
			$( this ).css({'opacity':'0','filter':'alpha(opacity=0)'});
			for ( var i = 0; i < ajaxCallAgain.length; i++ ) {
				ajaxCallAgain[i]();
			}
			if ( $collapsibleElements.length ) {
				$collapsibleElements.makeCollapsible();
			}
			if ( mw.config.get( 'wgNamespaceNumber' ) === -1 && mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Recentchanges' ) {
				mw.special.recentchanges.init();
				if ( $( '.mw-recentchanges-table' ).find( '.WikiaDropdown' ).length ) {
					RecentChangesLocal.init();
				}
			}
		}
	} );
	$( '#ajaxToggle' ).click( toggleAjaxReload );
	$( '#ajaxToggle' ).attr( 'checked', ajaxRLCookie);
	if ( getCookie( "ajaxload-" + wgPageName ) == "on" ) {
		loadPageData();
	}
}
 
/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
	if ( $( '#ajaxToggle' ).prop( 'checked' ) === true ) {
		setCookie( "ajaxload-" + wgPageName, "on", 30 );
		doRefresh = true;
		loadPageData();
	} else {
		setCookie( "ajaxload-" + wgPageName, "off", 30 );
		doRefresh = false;
		clearTimeout( ajaxTimer );
	}
}
 
/**
 * Does the actual refresh
 */
function loadPageData() {
	var cC = '#mw-content-text';
	$( cC ).load( location.href + " " + cC + " > *", function ( data ) {
		if ( doRefresh ) {
			ajaxTimer = setTimeout( loadPageData, ajaxRefresh );
		}
	} );
}
 
/**
 * Load the script on specific pages
 */
$( function () {
	for ( var x = 0; x < ajaxPages.length; x++ ) {
		if ( wgPageName == ajaxPages[x] && $( '#ajaxToggle' ).length === 0 ) {
			preloadAJAXRL();
		}
	}
} );
 
/**
 * Temp Hack: copy the RC filter JS since it can't be accessed
 */
var RecentChangesLocal = {
	init: function() {
		this.$table = $('.mw-recentchanges-table');
		this.$dropdown = this.$table.find('.WikiaDropdown');
		this.$submit = this.$table.find('input[type="submit"]');
		this.$submit.on('click.RecentChangesDropdown', $.proxy(this.saveFilters, this));
		this.$submit.removeAttr('disabled'); //FF clean
 
		this.dropdown = new Wikia.MultiSelectDropdown(this.$dropdown);
		this.dropdown.on('change', $.proxy(this.onChange, this));
 
	},
 
	saveFilters: function(event) {
		var self = this;
 
		event.preventDefault();
 
		self.dropdown.disable();
		self.$submit.attr('disabled', 'disabled');
 
		if(self.dropdown.getSelectedValues().length == 0) {
			self.dropdown.doSelectAll(true);
		}
 
		$.nirvana.sendRequest({
			controller: 'RecentChangesController',
			method: 'saveFilters',
			data: {
				filters: self.dropdown.getSelectedValues()
			},
			type: 'POST',
			format: 'json',
			callback: function(data) {
				window.location.reload();
			}
		});
	}
};


/*Gears - by ShermanTheMythran*/ $('#WikiaBarWrapper').append($('.walls'));$('.walls').show();$('.name').click(function(){$('.walls img').addClass('active');$('.left').delay('1000').animate({left:'-50%'},'slow');$('.right').delay('1000').animate({right:'-50%'},'slow');$('.name').delay('1000').fadeOut('slow');})



// Slay and Elsa's Wiki Zone Discord
window.DiscordIntegratorConfig = {
    siderail: {
        title: "Slay and Elsa",
        id: "219871754850402314",
        theme: "light"
    }
};