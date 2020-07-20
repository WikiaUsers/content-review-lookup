/****************************************/
/*Necesario para (Plantilla:Desplegable)*/
/****************************************/

var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "wikia_es"
};
importScriptPage('SocialIcons/code.js','dev');

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

// Etiqueta para usuarios inactivos por mas de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');