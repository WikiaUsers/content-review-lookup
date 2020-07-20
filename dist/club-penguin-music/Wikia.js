/* Adding a Minor Edits Button Help Link (discluding wide mode) */
$(document).ready(function() {
	if ($("body.editor #EditPage .module_content .checkboxes label.wpMinoredit").length > 0) { // check whether a an older revision exists
		$("body.editor #EditPage .module_content .checkboxes").append('<a id="minor-edit-help" href="/wiki/Help:Minor_edits" title="What is this?" target="_blank" style="font-size: 11px;">(help)</a>');
		$("body.editor #EditPage .module_content .checkboxes .wpMinoredit").css("display","inline-block");
	}
});
/* END Minor Edits Button Help Link */

/* Remove links to base page(s) from a sub page for Oasis skin. See Template:Subpagelinkremove */
if ($('#WikiaArticle span.base-page-links-remove').length) {
	$("header#WikiaPageHeader h2:last-child").remove();
	$("#WikiaArticle span.base-page-links-remove").remove();
}
/* END Template:Subpagelinkremove */