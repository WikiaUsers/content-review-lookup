/**************************************************
** Written by Manuel de la Fuente for usage
** on Attack on Titan Wiki:
** http://shingekinokyojin.wikia.com/wiki/MediaWiki:Common.js
**
** Modifications by CaptFredricks for use
** on Federation Legacy Wiki:
** http://federationlegacy.wikia.com/wiki/MediaWiki:Spoilers.js
**************************************************/

$(function () {
 
    "use strict";
 
     // This script must always be the very first executed
 
    var lastVisit = window.localStorage.getItem('spoilerCache'); // Gets the timestamp of the last visit stored in the cache
    var thisVisit = Date.now(); // Returns the current time in milliseconds
    var howLong = thisVisit - lastVisit; // Checks how much time has passed since the last visit
    if (howLong < 2592000000) { // If it's been less than one month since the last visit
        $('#spoiler-overlay').remove(); // Removes the alert
    }
    $('#show-spoilers').click(function () { // When clicking the button to remove spoilers
    $('#spoiler-overlay').remove(); // Removes the alert
        localStorage.setItem("spoilerCache", thisVisit); // Saves the timestamp of this visit
    });
 
    // Adds button to rehide spoilers to the row of buttons
    // NOT WORKING CURRENTLY
    /*if ($.inArray("Spoilers", mw.config.get('wgCategories')) > -1) {
        $('.wds-dropdown__content .wds-list').append('<li><a id="reset-spoilers" style="margin-right: 10px;">Rehide spoilers</a></li>');
        $('#reset-spoilers').click(function () {
            localStorage.removeItem('spoilerCache');
            location.reload();
        });
    }*/
});