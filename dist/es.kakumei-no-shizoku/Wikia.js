        (function () {
        "use strict";
        var userRightsList = {
            "SekkiCat": ["Puto amo"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());

/****************************************/
/*Necesario para (Plantilla:Desplegable)*/
/****************************************/
importScriptPage('ShowHide/code.js', 'dev');
 
/* Code by Seaside98 - Displays timer - Special thanks to Runescape wiki */
var refreshDate;
 
function addDate() {
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().attr('title','Hora utc de la wikia').attr('style','text-decoration:none !important;').attr('href',window.location.href + '?action=purge').html(UTCDate.substring(5));
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(addDate, 1000);
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li class="Date" id="displayClock" style="float:right"><a id="showdate"></a></li>').appendTo('.WikiaBarWrapper .toolbar .tools');
    else
        $('#p-personal ul').prepend('<li class="Date" id="displayClock" style="float:right;"><a id="showdate"></a></li>');
    addDate();
    refreshDate = window.setTimeout(addDate, 1000);
});