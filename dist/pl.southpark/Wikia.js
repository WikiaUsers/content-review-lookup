// Rangi dla użytkowników
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Rangi Użytkowników
 
rights["Pan_Andrzej176_xD"]             = ["Administrator", "Biurokrata"],
    rights["Pawel1631"]                 = ["Administrator", "Technik"];
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// Przenosi interwiki do stopki na Specjalna:Forum
$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });
/* Przycisk Edit */
function extraEditButton() {
$('#WikiaPageHeader>nav.wikia-menu-button').after(
	$('<nav />').addClass('wikia-menu-button extra-wikia-edit-button').append(
		$('<a href="/wiki/' + encodeURIComponent( wgPageName ) + '?action=edit">Klasyczny edytor</a>'),
		$('<style>.extra-wikia-edit-button {margin: 3px 0 0 12px !important;} .extra-wikia-edit-button>a {color:#fff; border-right: none !important;} a:hover {text-decoration: none;}</style>')
	)
)};
addOnloadHook(extraEditButton);
// Import
importScriptPage('MediaWiki:ReportErrors.js');