/* Any JavaScript here will be loaded for all users on every page load. */
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
        }\
        #WikiaMainContent {\
            width: 100%;\
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
    $( '#WikiaPageHeader' ).append( '<br />Read in <a href="/wiki/' + mw.config.get( 'wgPageName' ) + '?mode=reader-light">light</a> or <a href="/wiki/' + mw.config.get( 'wgPageName' ) + '?mode=reader-dark">dark</a> mode' );
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
 
 
 
 