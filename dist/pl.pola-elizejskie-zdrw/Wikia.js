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