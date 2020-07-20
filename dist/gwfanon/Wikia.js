// 1. AjaxRC configuration option
var ajaxRefresh = 30000;
 
// 2. AjaxRC import statement
importScriptPage('AjaxRC/code.js','dev');

// Tło na noc i tło noc 
$(function () {
 var d = new Date();
 if (d.getHours() < 6) {
  document.body.className += ' BG2';
  document.getElementById('WikiaPage').className += ' BG2-page';
 } 
 else if (d.getHours() < 17) {
  document.body.className += ' BG1';
  document.getElementById('WikiaPage').className += ' BG1-page';
 } 
 else if (d.getHours() < 22) {
  document.body.className += ' BG3';
  document.getElementById('WikiaPage').className += ' BG3-page';
 } 
 else if (d.getHours() < 24) {
  document.body.className += ' BG2';
  document.getElementById('WikiaPage').className += ' BG2-page';
 } 
});

// Facebook (z [[w:c:pl.lotr]])
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
	$("<div id='FacebookWnd'></div>").css({
		background:'url(https://images.wikia.nocookie.net/bleach/pl/images/5/55/Facebook.png)',
		width:242,
		height:401,
		position:'fixed',
		top:150,
		right:-210,
		zIndex:300}).appendTo("body");
	$('<div class="fb-like-box" data-href="https://www.facebook.com/gwfanon" data-width="185" data-height="361" data-show-faces="false" data-stream="true" data-header="true"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
	$("#FacebookWnd").click(function(){
		toggleFacebookWnd();
	});
});
 
function toggleFacebookWnd() {
	if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
	else $("#FacebookWnd").animate({right:"-210px"}, 700);
}

// By [[w:c:dev:user:KockaAdmiralac]]
$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('.DiscordIntegratorModule').appendTo('#WikiaRail');
    });
});

// Element koło interwiki z [[w:c:starwars:MediaWiki:Wikia.js]]
$( function eraIconsOasis() {
    if ( $( '.wds-community-header' ).length ) {
        $('#PageHeader .page-header__contribution > :first-child').prepend($('.headerek'))
    } else {
    	$( '.WikiaPageHeader' ).append( $( '#title-eraicons' ) );
    	$( '.headerek' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
    }
} );

// WAM
window.railWAM = {
    logPage:"Project:WAM Log"
};

// Move to Rail
if($('#moveto').length) {
   $('<section class="railModule rail-module"><h2>'+$('#moveto').data('title')+'</h2>'+$('#moveto').html()+'</section>').appendTo('#WikiaRail');
   $('#moveto').remove();
}

if($('#moveto2').length) {
   $('<section class="railModule rail-module przeniesione"><h2>'+$('#moveto2').data('title')+'</h2>'+$('#moveto2').html()+'</section>').appendTo('#WikiaRail');
   $('#moveto2').remove();
}

// Sandbox (based on Dev Wiki, translated to Polish
(function() {
    var $header = $('#WikiaUserPagesHeader');
    if ($header.exists()) {
        var title = 'User:' + $header.find('#UserProfileMasthead h1').text() + '/Brudnopis';
        $header.find('.tabs-container .tabs').append(
            $('<li>', { 'data-id': 'sandbox' }).append(
                $('<a>', {
                    href: mw.util.getUrl(title),
                    title: title,
                    text: 'Brudnopis'
                })
            )
        );
    }
})();

// Twórczość
(function() {
    var $header = $('#WikiaUserPagesHeader');
    if ($header.exists()) {
        var title = 'Kategoria:' + $header.find('#UserProfileMasthead h1').text();
        $header.find('.tabs-container .tabs').append(
            $('<li>', { 'data-id': 'sandbox' }).append(
                $('<a>', {
                    href: mw.util.getUrl(title),
                    title: title,
                    text: 'Twórczość'
                })
            )
        );
    }
})();

// Dodatkowy przycisk
if (typeof (mwCustomEditButtons) != 'undefined') {
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
                "imageId": "Opowiadanie",
		"imageFile": "https://images.wikia.nocookie.net/pneumonoultramicroscopicsilicovolcanoconiosis/pl/images/5/5e/Reading-book.png",
		"speedTip": "Wstaw gotowy formularz opowiadania",
		"tagOpen": "{{Autor|<!-- Twój nick -->|real}}\n{{Opowiadanie|\n",
		"tagClose": "\n}}\n\n[[Kategoria:Opowiadania]]",
		"sampleText": "<!-- Pisz opowiadanie w tym miejscu -->"
	};
 
}

// Klasa kategorii
$ ( function ( ) { mw.config.get ( 'wgCategories' ).forEach ( function ( el, id ) { $ ( 'body' ).addClass ( 'cat-' + el ) } ); } );

// Spoiler!
window.SpoilerAlertJS = {
    question: 'Ta strona zawiera treści, które mogą zostać uznane za nieodpowiednie, a także budzić odrazę. Jesteś pewien, że chcesz to zobaczyć?',
    yes: 'Tak, chcę',
    no: 'Nie, nie chcę',
    fadeDelay: 1600
};

// Hiding and showing, copied from Wookieepedia, the Star Wars Wiki
function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
	var hidables = getElementsByClass('hidable');
 
	for(var i = 0; i < hidables.length; i++) {
		show = localStorage.getItem('hidableshow-' + i  + '_' + page);
 
		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}
 
function onArticleNavClick() {
	var div = document.getElementById('mp3-nav');
 
	if( div.style.display == 'block' )
		div.style.display = 'none';
	else
		div.style.display = 'block';
}
 
function addHideButtons() {
	var hidables = getElementsByClass('hidable');
 
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');
 
		if( button != null && button.length > 0 ) {
			button = button[0];
 
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Ukryj]') );
 
			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}
 
function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;
 
	if( content != null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Ukryj]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Pokaż]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;
 
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
 
			if( item == -1 ) {
				return;
			}
 
			localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}

// Page Creator
window.pageCreatorConfig = {
    useTimestamp: true,
    useUTC: true
};

// Making a Twitter widget available for the rail by KockaAdmiralac
mw.hook('wikipage.content').add(function($content) {
    if ($content.find('.widget-twitter > a').length) {
        mw.loader.using('ext.TwitterTag').then(function() {
            if (window.twttr && window.twttr.widgets) {
                window.twttr.widgets.load();
            }
        });
    }
});

// Skopiowano z https://dragonage.fandom.com linijka po linijce. Zobacz autorów: https://dragonage.fandom.com/wiki/MediaWiki:Wikia.js?action=history

mw.loader.using( ['jquery.cookie']);
 
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

// File description
$('#wpUploadDescription').val('{{Informacje\r\n| Opis      = \r\n| Autor     = \r\n| Źródło    = \r\n| Warunek   = \r\n}}\r\n');

$('textarea[name=wpUploadDescription]').val('{{Informacje\r\n| Opis      = \r\n| Autor     = \r\n| Źródło    = \r\n| Warunek   = \r\n}}\r\n');