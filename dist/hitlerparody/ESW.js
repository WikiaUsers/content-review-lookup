// Returns a warning when the edit summary is left blank.
// Only affects the main namespace.
// 12 mar 17 - take into account /*section text*/ and "Minor edit."
//           - made fn for custom modal (for different text)
//           - encapsulated code

(function(window,$,mw) {

	function editSummaryError(text) {
		$.showCustomModal('Edit summary', text, {
			id: 'edit-summary-error',
			width: 400,
			buttons: [{
				message: 'OK',
				defaultButton: true,
				handler: function() {
					$('#edit-summary-error').closeModal();
				}
			}]
		});
	}

	$('#wpSave').click( function(e) {
		var ns = mw.config.get('wgNamespaceNumber'), // namespace
		// summary text without /*section text*/ and trimmed
		summaryText = $('#wpSummary').val().replace(/\/\*[^\*\/]*\*\/\s*/g, "").trim();
		if (ns !== 0) return; // skip non-main namespace
		if (!summaryText) { // empty edit summary
			editSummaryError('You left the edit summary blank. Please help other contributors pick up where you left off by writing edit summaries. Thank you.')
			return false;
		} else if (summaryText.match(/^minor edit\.?/ig)) { // writing "Minor edit." as edit summary
			editSummaryError('Please tick the "Minor edit" checkbox to mark minor edits. Thank you.')
			return false;
		}
	});
}(window, jQuery, mediaWiki));