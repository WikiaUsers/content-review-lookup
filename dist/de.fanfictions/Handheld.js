// mit massiven verspätungen wird das hier aktualisiert
// um andere js-dateien zu laden, hier bearbeiten: http://de.fanfictions.wikia.com/wiki/MediaWiki:Wikiamobile-menu?action=edit
if ($("body").hasClass("page-MeerUndMehr")) {
window.location = window.location + "/mobile";
}
if ($("body").hasClass("page-MeerUndMehr_mobile")) {
$("div.box-link:nth-child(8)").remove();
}