/**
 * TallyLink.js
 * @file Changes edit tally link address to Special:Editcount or custom link
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @external "jQuery"
 * @external "mw"
 */

/*jslint browser */
/*global mw, jQuery, window */

(function($, mw) {
    "use strict";

    if (window.isTallyLinkLoaded || !jQuery("#WikiaUserPagesHeader").exists()) {
        return;
    }
    window.isTallyLinkLoaded = true;

    // Declarations
    var $userName, $newAddress, $editCount, $articlePath, $tallyDetails;

    // Definitions
    $userName = jQuery(".UserProfileMasthead .masthead-info h1").text();
    $editCount = "Special:Editcount/User:";
    $articlePath = mw.config.get("wgArticlePath");
    $tallyDetails = ".UserProfileMasthead .contributions-details a";
    $newAddress = window.customTallyLink || $editCount + $userName;

    // Apply new destination to masthead details
    jQuery($tallyDetails).attr("href", $articlePath.replace("$1", $newAddress));
})(jQuery, mediaWiki);