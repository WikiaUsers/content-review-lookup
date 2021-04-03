// By [[w:c:dev:user:KockaAdmiralac]]
$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('.DiscordIntegratorModule').appendTo('#WikiaRail');
    });
});

// Element koło interwiki z [[w:c:starwars:MediaWiki:Wikia.js]]
$( function eraIconsOasis() {
    if ( $( '.wds-community-header' ).length ) {
        $('#PageHeader .page-header__contribution > :first-child').prepend($('.headerek'));
    } else {
    	$( '.WikiaPageHeader' ).append( $( '#title-eraicons' ) );
    	$( '.headerek' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
    }
});

// Klasa kategorii
$ ( function ( ) { mw.config.get ( 'wgCategories' ).forEach ( function ( el, id ) { $ ( 'body' ).addClass ( 'cat-' + el.replace(/ /g, '-') ) } ); } );

// Page Creator
window.pageCreatorConfig = {
    useTimestamp: true,
    useUTC: true
};

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
$('textarea[name=wpUploadDescription]').val('{{Informacje\r\n| Opis      = \r\n| Autor     = \r\n| Źródło    = \r\n}}\r\n');

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