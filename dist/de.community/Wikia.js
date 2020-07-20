/* new interlanguage links on forum footer */
$(function() {
    if ($('#forum-display').length ) {
        $('#forum-display').insertBefore('#WikiaFooter'); 
    }
});

importScriptPage('MediaWiki:Parallax.js','comunidad');

// link zurück zur antragsseite
if (wgPageName.search(/Wiki-Paten-Antrag:.*/) !== -1 && wgPageName !== "Wiki-Paten-Antrag:Übersicht")  $('#PageHeader').after('<a href="https://community.fandom.com/de/wiki/Wiki-Paten-Antrag:Übersicht">< Wiki-Paten-Antrag:Übersicht</a>');