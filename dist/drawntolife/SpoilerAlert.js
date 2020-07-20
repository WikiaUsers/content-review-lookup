/*
 Modified for use from the Attack on Titan Wiki. Originally written by Manuel de la Fuente.
*/
 
/* Enables the alerts only in articles within the category "Spoilers" */
if ($.inArray("Spoilers", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
        /* Alert */
        var alert =
        '<div id="spoiler-container" style="bottom: 0px; left: 0px; position: absolute; right: 0px; top: 0px; z-index: 2000000001;">' +
            '<table id="spoiler-alert" border="0" style="background: rgba(255,255,255,0.95); border: none; -webkit-box-shadow: 0 1px 3px 0 rgb(102,102,102); -moz-box-shadow: 0 1px 3px 0 rgb(102,102,102); -ms-box-shadow: 0 1px 3px 0 rgb(102,102,102); -o-box-shadow: 0 1px 3px 0 rgb(102,102,102); box-shadow: 0 1px 3px 0 rgb(102,102,102); border-radius: 1px; font-size: 13px; line-height: 22px; margin: 150px auto 0; width: 430px;">' +
                '<tbody>' +
                    '<tr>' +
                        '</td>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;" colspan="2"><strong style="font-weight: bold;">This article contains spoilers that can ruin elements of the story.</strong><br>Display the page anyway?</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;">' +
                            '<button id="no"><strong style="font-weight: bold;">No</strong></button>' +
                        '</td>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;">' +
                            '<button id="yes"><strong style="font-weight: bold;">Yes</strong></button>' +
                        '</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>' +
        '</div>';
 
        /* Inserts the alert */
        var lastVisit = window.localStorage.getItem('spoilerCache'); // Gets the timestamp of the last visit stored in the cache
        var thisVisit = Date.now(); // Returns the current time in milliseconds
        var howLong = thisVisit - lastVisit; // Checks how much time has passed since the last visit
        if (howLong > 2592000000) { // Inserts the alert if it's been more than one month since the last visit or the user has never visited the site
            $('#WikiaMainContentContainer').before(alert);
            document.getElementById("WikiaMainContentContainer").style.filter = "blur(15px)"; // Sets a blurring of 15px
            document.getElementById("WikiaMainContentContainer").style.WebkitFilter = "blur(15px)"; // Sets blurring in Webkit browsers
            var opacity = $('#WikiaPageBackground').css('opacity'); // Saves the original value of the opacity of the background
            document.getElementById("WikiaPageBackground").style.opacity = "1"; // Temporarily disables the opacity
 
            /* Actions when clicking yes or no */
            $('#yes').click(function () {
                $('#spoiler-container').remove(); // Removes the alert
                document.getElementById("WikiaMainContentContainer").style.filter = "none"; // Removes the blurring
                document.getElementById("WikiaMainContentContainer").style.WebkitFilter = "none"; // Removes the blurring in Webkit browsers
                document.getElementById("WikiaPageBackground").style.opacity = opacity; // Restores the original opacity
                localStorage.setItem("spoilerCache", thisVisit); // Saves the timestamp of this visit
            });
            $('#no').click(function () {
                $('#spoiler-alert').remove(); // Removes the alert
            });
        }
 
    });
}