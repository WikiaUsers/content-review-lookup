$(function() {
	
	// do nothing in hydra
	if ($('#mw-head').length) return;
	
	// main button
	var $veButton = $('#ca-ve-edit');
	if ($veButton.length) {
		var $sourceButton = $('#ca-edit');
		$sourceButton.detach();
		$sourceButton.attr('class', 'wds-button wds-is-text page-header__action-button has-label').prepend($('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-pencil-small"></use></svg>'));
		$veButton.replaceWith($sourceButton);
	}
	
	// section buttons
	$('.mw-editsection-visualeditor').each(function () {
		$(this).attr('href', $(this).attr('href').replace(/veaction=edit/, 'action=edit'));
	});
	
});