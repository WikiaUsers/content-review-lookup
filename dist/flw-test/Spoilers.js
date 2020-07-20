$(function () {
 
    "use strict";
 
    ////////////////////////////////////////////////////////////////////////////
    //                                GENERAL                                 //
    ////////////////////////////////////////////////////////////////////////////
 
    /*******************/
    /* Spoiler overlay */
    /*******************/
 
     // This script must always be the very first executed
 
    var lastVisit = window.localStorage.getItem('spoilerCache'); // Gets the timestamp of the last visit stored in the cache
    var thisVisit = Date.now(); // Returns the current time in milliseconds
    var howLong = thisVisit - lastVisit; // Checks how much time has passed since the last visit
    if (howLong < 1) { // If it's been less than one month since the last visit
        $('#spoiler-overlay').remove(); // Removes the alert 2592000000
    }
    $('#show-spoilers').click(function () { // When clicking the button to remove spoilers
    $('#spoiler-overlay').remove(); // Removes the alert
        localStorage.setItem("spoilerCache", thisVisit); // Saves the timestamp of this visit
    });
 
    // Adds button to rehide spoilers to the row of buttons
    if ($.inArray("Spoilers", mw.config.get('wgCategories')) > -1) {
        $('.wds-dropdown__content .wds-list').append('<li><a id="reset-spoilers" style="margin-right: 10px;">Rehide spoilers</a></li>');
        $('#reset-spoilers').click(function () {
            localStorage.removeItem('spoilerCache');
            location.reload();
        });
    }
});