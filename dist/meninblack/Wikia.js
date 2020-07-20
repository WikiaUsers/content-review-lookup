//Remove the Wikia rail if Template:Norail is present.  Credit goes to Ratchet & Clank Wiki.
if ($('.noRail').length > 0) {
$('html body:first').addClass('oasis-one-column');
$('#WikiaPageHeader').append($('#WikiaSearch'));
$('#WikiaRail, .WikiaWideTablesWrapper img, .WikiaWideTablesWrapper canvas').remove();
}