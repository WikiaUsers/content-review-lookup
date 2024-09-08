/* Alerta de Spoiler */
// Based on SpoilerAlert by pecoes & Gguigui1: http://dev.wikia.com/wiki/SpoilerAlert
 
/* Enables the alerts only in articles within the category "No emitidos en América Latina" */
if ($.inArray("No emitidos en América Latina", wgCategories) > -1) {
 
    $(function () {
        "use strict";
 
/* Alerta de spoiler */
        var alert =
        '<div id="spoiler-container" style="bottom: 0px; left: 0px; position: absolute; right: 0px; top: 0px; z-index: 2000000001;">' +
            '<table id="spoiler-alert" border="0" style="background-color:  #bdecff; border: 4px double; border-color: #21aaff;  box-shadow: 3px 3px 10px; border-radius: 20px; font-size: 13px; line-height: 22px; margin: 150px auto 0; width: 430px;">' +
                '<tbody>' +
                    '<tr>' +
                        '<td rowspan="2" style="padding: 0px;">' +
                            '<alt="¡Spoilers!">' +
                        '</td>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;" colspan="2"><strong style="font-weight: bold;">¡Advertencia de spoilers!</strong><br>Este artículo muestra contenido sobre un episodio aun no emitido en latinoamerica, ¿seguro que quieres continuar?</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;">' +
                            '<button id="yes">Si</button>' +
                        '</td>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;">' +
                            '<button id="no">No</button>' +
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