/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

// Time
var refreshDate;
 
function addDate() {
    "use strict";
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().append('<span style="font-weight: bold; text-transform: none;"><a title="Refresca el chach� y purga la p�gina [Ctrl+Shift+R]" href="' + mw.config.get('wgArticlePath').replace('$1', mw.config.get('wgPageName').replace(/ /g, '_')) + '?action=purge">' + UTCDate.substring(5) + '</a></span>');
    clearTimeout(refreshDate);
    refreshDate = setTimeout(addDate, 1000);
}
 
importScriptPage('AjaxRC/code.js', 'dev');