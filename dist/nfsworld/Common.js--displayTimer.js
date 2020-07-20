// ============================================================
// displayTimer
// ============================================================
/*jshint jquery:true browser:true curly:false */
/*global mediaWiki */
 
mediaWiki.loader.using('mediawiki.util', function() {
"use strict";
jQuery(function($) {
    // Double run protection.
    if ($('#displayTimer, #showdate, #DisplayClockJS').length) return;
 
    var $parent = $('<span id="showdate" />'),
        $node = $('<a title="Treasure Hunt clock. Do your hunts before midnight UTC" href="' + mediaWiki.util.wikiGetlink() + '?action=purge" />')
          .appendTo($('<span style="font-weight: bold; text-transform: none;" />')
              .appendTo($parent)
          );
    function updateDate() {
        $node.text(new Date().toUTCString().replace("GMT", "(UTC)").substr(5));
    }
 
    if (mediaWiki.config.get('skin') === 'oasis') { 
        $('<li id="displayTimer" />').css('fontSize',  "12px").append($parent).appendTo('#GlobalNavigation');
    } else {
        $('#p-personal ul').prepend($('<li id="displayTimer" />').append($parent));
    }
    updateDate();
    window.setInterval(updateDate, 1000);
    $parent = null;
});
});
//