/* Oto CSS/JS stworzony przez Pawela1631, Edwina282, Szynke013 i Wedkarskiego */
var SocialMediaButtons = {
position: "top", 
colorScheme: "color", 
buttonSize: "35px", 
wikiTwitterAccount: "AngryBirdsWiki"
}; 
importScriptPage('SocialIcons/code.js','dev');
// Import
importScriptPage('MediaWiki:ReportErrors.js');
 
// Rangi dla użytkowników
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Rangi Użytkowników
 
    rights["Night Furia"]               = ["Edytowymiatacz", "Administrator"],
    rights["Chuck123456"]               = ["Edytowymiatacz", "Moderator"],
    rights["Alone Horse"]               = ["Edytowymiatacz", "Moderator Chatu"],
    rights["Bomb Bird"]                 = ["Edytowymiatacz", "Moderator Chatu"],
    rights["Lartament"]                 = ["Edytowymiatacz"],
    rights["Lubie Bendera"]             = ["Edytowymiatacz"];
 
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