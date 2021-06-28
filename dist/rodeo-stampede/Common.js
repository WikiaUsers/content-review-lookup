/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
	if (wgNamespaceNumber == '0') {
		$editLinks = $('a#ca-edit,#ca-edit a,#WikiaPageHeader .wikia-menu-button > li > a');
		$editLinks.attr('href', $editLinks.attr('href') + '&editintro=Template:Editing');
	}
});