/*
 * Written by Manuel de la Fuente for usage in the Shingeki no Kyojin Wiki: http://shingekinokyojin.wikia.com/wiki/MediaWiki:SpoilerAlert.js
 * Based on SpoilerAlert by pecoes & Gguigui1: http://dev.wikia.com/wiki/SpoilerAlert
*/
 
/* Enables the alerts only in articles within the category "Spoilers" */
if ($.inArray("Spoilers", wgCategories) > -1) {
 
    $(function () {
        "use strict";
 
        /* Alert */
        var alert =
        '<div id="spoiler-container" style="bottom: 0px; left: 0px; position: absolute; right: 0px; top: 0px; z-index: 2000000001;">' +
            '<table id="spoiler-alert" border="0" style="background-color: #401F22; border: 1px dashed #C00; font-size: 13px; line-height: 22px; margin: 150px auto 0; width: 500px">' +
                '<tbody>' +
                    '<tr>' +
                        '<td style="border-style: none; padding: 5px; text-align: center; font-style: italic" colspan="2">Warning! This article contains major <strong style="font-weight: bold">SPOILERS</strong> about <a href="http://flw-test.wikia.com/wiki/Upcoming_content">upcoming content</a>. Read at your own risk, and do not blame us if you fail to heed this advisory.<br /><strong style="font-weight: bold">Continue to page?</strong></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;">' +
                            '<button id="yes">YES</button>' +
                        '</td>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;">' +
                            '<button id="no">NO</button>' +
                        '</td>' +
                    '</tr>' +
                '</tbody>' + 
            '</table>' +
        '</div>';
 
        /* Inserts the alert */
        var lastVisit = window.localStorage.getItem('spoilerCache') // Gets the timestamp of the last visit stored in the cache
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
                $('#spoiler-container').remove();
                document.getElementById("WikiaMainContentContainer").style.filter = "none"; // Removes the blurring
                document.getElementById("WikiaMainContentContainer").style.WebkitFilter = "none"; // Removes the blurring in Webkit browsers
                document.getElementById("WikiaPageBackground").style.opacity = opacity; // Restores the original opacity
                localStorage.setItem("spoilerCache", thisVisit); // Saves the timestamp of this visit
            });
            $('#no').click(function () {
                $('#spoiler-alert').remove();
            });
        }
 
    });
}

/* Adds option to hide spoilers to the row of buttons */
    if ($.inArray("Spoilers", wgCategories) > -1) {
        $('#WikiaPageHeader').append('<a id="reset-spoilers" class="wikia-button secondary" style="margin-right: 10px;">Rehide spoilers</a>');
        $('#reset-spoilers').click(function() {
            localStorage.removeItem("spoilerCache");
            location.reload();
        });
    }