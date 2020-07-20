/* IMPORTE */

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/Zusammenfassung.js",
        "MediaWiki:Bewertung.js",
        "MediaWiki:Slider.js"
        ]
    });



/* SEARCHBOX */

$(function() {
  $('.searchbox')
    .find('.searchboxInput').attr('required', '')
      .after($('<label>').text('Bücher finden…'))
      .after($('<span>').addClass('bar'));
});

$(function() {
  $('.bodySearch')
    .find('.bodySearchInput').attr('required', '')
      .after($('<label>').text('Bücher finden…'))
      .after($('<span>').addClass('bar'));
});

/* Back to top */

function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtotop' ).show ();
						break;
					default:
						$( '#backtotop' ).fadeIn ();
						break;
				}
			} else {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtotop' ).hide ();
						break;
					default:
						$( '#backtotop' ).fadeOut ();
						break;
				}					
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:3px; border:none; color:white;" value="Back to Top" onClick="goToTop();">Nach oben</li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
var FadeSwitch = 1;
 
if( !window.BackToTop  ) {
	$( document ).ready( addBackToTop );
}
 
var BackToTop = true; // prevent duplication
 
if( typeof Start == "number" ) {
	ButtonStart = Start;
}
 
if( typeof Speed == "number" ) {
	ScrollSpeed = Speed;
}	
 
if( typeof ToggleFading == "number" ) {
	FadeSwitch = ToggleFading;
}

/* Link whole div box (class flexBtn) */

$('.flexBtn').click(function() {
     window.location.href = $(this).attr('data-link');
});

//----------------------------------

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};