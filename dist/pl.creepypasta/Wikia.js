this.creepypasta = this.creepypasta || {};

var $ = jQuery;

creepypasta = {
    anon: true,
    arkusz: true,
    badges: true,
    cache: true,
    fejsbox: true,
    rating: true,
    snow: true,
    unloged: true,
    usertags: true,
};

function loadCreepypasta(creepypasta, $, mw) {
    if (creepypasta.anon === true) {
        window.RevealAnonIP = {
            permissions: ['rollback', 'sysop', 'bureaucrat', 'VCROC']
        };
    }

    if (creepypasta.arkusz === true) {
        importScriptPage('MediaWiki:Wikia.js/arkusz.js');
    }

    if (creepypasta.badges === true) {
        $(document).ready(function () {
            var badgesTpl = document.getElementById('badges');
            if ((typeof badgesTpl !== "undefined") && (badgesTpl !== null)) {
                $("#badges").addClass("module");
                $('#WikiaRail').prepend(badgesTpl);
            }
        });
    }

    if (creepypasta.cache === true) {
        importScriptPage('MediaWiki:Wikia.js/cache.js');
    }

    if (creepypasta.fejsbox === true) {
        importScriptPage('MediaWiki:Wikia.js/fejsbox.js');
    }

    if (creepypasta.rating === true) {
        importScriptPage('MediaWiki:Wikia.js/Ratings.js');
    }

    if (creepypasta.snow === true) {
        importScriptPage('MediaWiki:Snow.js', 'creepypasta');
    }

    if (creepypasta.unloged === true) {
        importScriptPage('MediaWiki:Wikia.js/niezalogowany.js');
    }

    if (creepypasta.usertags === true) {
        importScriptPage('MediaWiki:Wikia.js/usertags.js');
    }
}

// DODANIE PODZIELENIA SIĘ NA FACEBOOK'U, TWITTERZE I GOOGLE +
var SocialMediaButtons = {
    position: "top", // bottom, jeśli na dole każdej strony, lub top, jeśli ma być pod ilością stron na wiki
    colorScheme: "dark", // dark lub light
    buttonSize: "default" // rozmiar przycisków, jeśli nie chce się zmieniać, to default
};
importScriptPage('SocialIcons/code.js', 'dev');

// DODANIE STATUSU "NIEAKTYWNY" DLA NIE WCHODZĄCYCH OD 30 DNI USERÓW
importScriptPage('MediaWiki:code.js');
InactiveUsers = {
    months: 1,
    text: 'Nieaktywny'
};

// ULEPSZENIE SPECJALNA:LOSOWA STRONA
$(function () {
    var link = $('.subnav-2a[data-canonical=random]');
    link.attr('href', link.attr('href') + '/main');
});

/**
 * Reader mode - A no-distraction reader for stories
 *
 * @author [[User:Shining-Armor]]
 *
 * @description:
 *     Reader mode provides a distraction free environment
 *     for readers that focuses on the content of the page
 *     without all of the bells and whistles of the normal
 *     wiki skin. Ideal for wikis that are built around 
 *     literature and user submitted stories.
 *
 * @modes [light][dark]
 *
 * @version 1.0.4
 *
 * @license GNU GPL v2.0
 */
 
var readerMode = window.readerMode || {};
 
readerMode.hasLoaded = false;
 
readerMode.addTitle = function() {
    $( '.mw-content-text' ).prepend( '<h1 style="text-align: center;">' + mw.config.get( 'wgPageName' ).replace( /_/g, ' ' ) + '</h1><br />' );
};
 
readerMode.lightMode = function() {
    var css = "\
        nav,\
        figure,\
        img,\
        button,\
        #globalNavigation,\
        #WikiaRail,\
        #catlinks,\
        #WikiaFooter,\
        #WikiaBar,\
        #WikiHeader,\
        #WikiaPageHeader,\
        .WikiaArticleFooter,\
        .wikia-gallery,\
        .wordmark {\
	       display: none !important;\
        }\
        #WikiaMainContentContainer {\
	       margin-right: 0px !important;\
	       color: #000000;\
	       opacity: none !important;\
        }\
        body,\
        #WikiaPageBackground,\
        #WikiaPage,\
        .WikiaPAge {\
	       background-color: #FFFFFF !important;\
	       border: none !important;\
        }";
 
    var cssNode = document.createElement( 'style' );
        cssNode.textContent = css;
 
    $( 'head' ).append( $( cssNode ) );
    this.addTitle();
};
 
readerMode.darkMode = function() {
    this.lightMode();
 
    var css = "\
        #WikiaMainContentContainer {\
	       color: #FFFFFF;\
        }\
        body,\
        #WikiaPageBackground,\
        #WikiaPage,\
        .WikiaPAge {\
	       background-color: #000000 !important;\
        }";
 
    var cssNode = document.createElement( 'style' );
        cssNode.textContent = css;
 
    $( 'head' ).append( $( cssNode ) );
};
 
readerMode.prepare = function( mode ) {
    if ( mode === 'reader-light' ) {
        this.lightMode();
    } else if ( mode === 'reader-dark' ) {
        this.darkMode();
    }
};
 
readerMode.isURLVar = function( name ) {
    var results = new RegExp( '[\?&]' + name + '=([^&#]*)' ).exec( window.location.href );
 
    if ( results === null ) {
       return null;
    } else {
       return results[1] || 0;
    }
};
 
readerMode.getURLMode = function() {
    var mode = this.isURLVar( 'mode' );
        mode = decodeURIComponent( mode );
 
    if ( mode !== null ) {
        switch ( mode ) {
            case 'reader-light': 
                return 'reader-light';
                break;
            case 'reader-dark':
                return 'reader-dark';
                break;
            case 'reader':
                return 'reader-light';
                break;
            default:
                return '';
        }
    } else {
        return '';
    }
};
 
readerMode.addButtons = function() {
    $( '#WikiaPageHeader' ).append( '<br />Czytaj w <a href="/wiki/' + mw.config.get( 'wgPageName' ) + '?mode=reader-light">jasnym</a> lub <a href="/wiki/' + mw.config.get( 'wgPageName' ) + '?mode=reader-dark">ciemnym</a> trybie' );
};
 
readerMode.init = function() {
    var mode = this.getURLMode();
 
    if ( mode !== '' ) {
        this.prepare( mode );
    } else {
        this.addButtons();
    }
};
 
$( document ).ready( function() {
    if ( mw.config.get( 'wgNamespaceNumber' ) === 0 ) {
        if ( readerMode.hasLoaded === false ) {
            readerMode.init();
        }
    }
});