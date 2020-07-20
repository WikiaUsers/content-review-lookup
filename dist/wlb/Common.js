// We make our changes right after the DOM loads but before images and the like can be seen.
$(document).ready(function() {
/* redirect incorrect link to correct page */
    if (wgPageName.indexOf('_â_') !== -1 && wgNamespaceNumber === 114)  { 
        old_loc = location.href;
        new_loc = old_loc.replace(' â ', ' → ').replace('_%C3%A2_', ' → '); 
        setTimeout(function() {
            location = new_loc;
        }, 1000);
    }
});


importScriptPage("MediaWiki:Variables.js", "wlb"); /* language_dropdown */
importScriptPage("MediaWiki:ApiKey.js", "wlb"); /* _api. */

/* delay needed to initiate preloaded values */
setTimeout(function() { 
    if (mw.config.get('wgPageName') === "Translate:Requests") {
        importScript('MediaWiki:TranslateForm.js');
/*      setTimeout(function () {
            importScriptPage("MediaWiki:FilterTranslateRequests.js", "wlb");
        }, 1500); */ 
    } 
    if (mw.config.get('wgPageName') === "Correct:Requests") {
        importScript('MediaWiki:CorrectForm.js');
    }
    if (wgPageName === 'Language_Brigade_Wiki:Word_of_the_Week') {
        importScript('MediaWiki:WOTW_nomination.js');
    }
}, 500);

if (wgNamespaceNumber === 112 || $("body").hasClass("mainpage")) {
    importScript('MediaWiki:PortalAvailability.js');
}

if ($(".babel0-toc").length) {
    $(".babel0-toc").find('a').attr('title', 0);
}

/* spotlights */
importScriptPage('ShowHide/code.js', 'dev');
importScript("MediaWiki:Spotlight.js");

// for portal pages
;( function( $ ) {
    "use strict";

    $( '.to-hover' ).on( 'hover', function() {
        var get_data = $( this ).attr( 'data-page' );
        if ( $( '.page-' + get_data ).hasClass( 'active' ) ) return;

        // Selected tab
        $( '.active-tab' ).toggleClass( 'active-tab' );
        $( this ).toggleClass( 'active-tab' );

        // Tab switcher
        $( '.active' ).hide().toggleClass( 'active' );
        $( '.page-' + get_data ).show().toggleClass( 'active' );
   });
})( this.jQuery );


/*
$(window).ready(function() {
    if (wgPageName == "Translate:Requests" || wgPageName == "Correct:Requests") {
        // only show own requests 
        function showOwnRequests() {
            $(".forumlist tr").fadeOut();	

            setTimeout(function () {
                $($(".forumlist tr td:contains(" + wgUserName + ")")).parent().fadeIn();
                $(".forumlist tr:nth-child(1)").fadeIn();
            }, 500);
        }

        // show all requests 
        $(".forumlist").before("<a onclick='showAllRequests()' class='button'>Show all requests</a>&nbsp;<a onclick='showOwnRequests()' class='button'>Show own requests</a>");
        function showAllRequests() {
            $(".forumlist tr").fadeIn();	
        }
    }
});
.*/