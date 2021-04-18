/*-----------------------------------------------------------------------------
@ Bearbeiter dieser Seite: 
Bitte fügt neue Abschnitte nur am Ende der Seite ein!
Die Abschnitte bitte mit Überschriften in GROSSBUCHSTABEN gliedern,
Unterüberschriften normal. Vielen Dank!
-----------------------------------------------------------------------------*/

/* WIKIANOTIFICATION (WIKI-WEITE BENACHRICHTIGUNGSBOX) */
var WikiaNotificationMessage = 'Unser Buch des Monats für Dezember 2016: <u><a href="' + mw.util.getUrl('Noahs_Kuss ... und plötzlich ist alles anders') + '">„Noahs Kuss ... und plötzlich ist alles anders“ von David Levithan</a></u>';
var WikiaNotificationexpiry = 10;
importScriptPage('WikiaNotification/code.js', 'dev');

/*
 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( mw.config.get('wgCanonicalSpecialPageName') == "Upload" ) {
    $('<script />', {
        type: 'text/javascript',
        src: '/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s'
    }).appendTo('head');
 }*/

/* KONFIGURATION MASTHEAD-BP-ZÄHLER */
var config = {
    newpages_created: "BuchPorträts erstellt"
};


/* ANPASSUNG "MITMACHEN"-ROLL-UP */
/**
 * Diese Funktion erweitert das "Mitmachen"-Menü um den Eintrag »Infos zum Mitmachen«.
 * @param wp - die gewünschte Position des neuen Eintrags
 * @param ne - das einzufügende Element
 */
function eintrageinfuegen(wp, ne) {
    var mitmachen = $('#WikiHeader > .buttons > nav > .WikiaMenuElement > li');
    if (mitmachen.length >= wp) {
        mitmachen.slice(wp-1, wp).before(ne);
    } else {
        mitmachen.parent().append(ne);
    }
}

$(function() {
  eintrageinfuegen(2, '<li><a href=' + mw.util.getUrl('Community:BuchPorträt erstellen') + '">BuchPorträt erstellen</a></li>');
});

/* Anpassbare Seitentitel */
function titleRewrite() {
    var neuerTitel = $('#neuer_Titel');
    if (!neuerTitel.length) {
        return;
    }
    var alterTitel = $('.WikiaPageHeader > h1');
    if (!alterTitel.length) {
        alterTitel = $('#firstHeading');
        neuerTitel.addClass('firstHeading');
        neuerTitel.attr('id', 'firstHeading');
    }
    alterTitel.replaceWith(neuerTitel);
    neuerTitel.show();
}

$(function() {
    titleRewrite();
});

/* FÜR VORLAGE:USERNAME */

function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  $('span.insertusername').text(mw.config.get('wgUserName'));
}
$(UserNameReplace);

/* "NACH OBEN"-SCHALTFLÄCHE IN DER UNTEREN WIKIA-LEISTE */

function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' )[FadeSwitch ? 'fadeIn' : 'show']();
			} else {
				$( '#backtotop' )[FadeSwitch ? 'fadeOut' : 'hide']();					
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
	if( mw.config.get('skin') == 'oasis' ) {
		$('<li />', {
		    id: 'backtotop',
		    css: {
		        position: 'absolute',
		        right: '20px',
		        top: '3px',
		        border: 'none',
		        color: 'white'
		    },
		    value: 'Back to Top',
		    text: 'Nach oben'
		}).click(goToTop).appendTo('#WikiaBarWrapper .toolbar > .tools');
		hideFade ();
	}	
}
 
var ButtonStart = 1000;
var ScrollSpeed = 650;
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

/* BUCH DES MONATS / LATEST COMMENTS / "ICH LESE GERADE" */
 
mw.hook('dev.sidebar').add(function () {
    //Buch des Monats
    curdate = new Date();
    curmonth = curdate.getMonth();
    curyear = curdate.getFullYear();
    monthNames = mw.config.get('wgMonthNames').slice(0); // clone
    monthNames.shift(); // remove unnecessary empty string as first item
    bdmNextMonth = monthNames[(curmonth + 1) % 12];
    bdmYear = curmonth == 11 ? curyear + 1 : curyear;
    bdmDescription = $('<div />').addClass('description').append(
        'Wähle das ',
        $('<b />').text('Buch des Monats'),
        ' für ' + bdmNextMonth + '!'
    );
    bdmButton = $('<a />')
                    .addClass('button')
                    .text('Abstimmen')
                    .attr('href', mw.util.getUrl('Buch des Monats: Abstimmung für ' + bdmNextMonth + '_' + bdmYear));
    createSidebarModule('', bdmDescription.wrapAll('<div>').parent().html() + bdmButton.wrapAll('<div>').parent().html(), 'BdM', true);/*

    //Latest Comments
    if(!isUserpage()) {
        getActivityComments(function(comments) {
            latestCommentsBox(comments);
        });
    }*/

    //Aktuelles Buch
    if(isUserpage() && !!$('#currentBook').length) {
        var currentBook = $('#currentBook');
        $('#currentBook').detach();
        createSidebarModule(
            'Ich lese gerade',
            $('<div />').addClass('book').html(currentBook .find('[data-book]').html()),
            'current-book'
        );
    }
});