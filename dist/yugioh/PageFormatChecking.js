mw.loader.using(['mediawiki.util', 'jquery.client'], function () {
/**
 * Page format checking
 *
 * Maintainers: [[User:Falzar FZ]]
 */
var mNamespace       = mw.config.get('wgCanonicalNamespace'),
	mNamespaceNumber = mw.config.get('wgNamespaceNumber'),
	mAction          = mw.util.getParamValue('action'),
	mSection         = mw.util.getParamValue('section');

	/*
	 * Check that you have signed your post on Talk pages and Forum pages.

	 * Disable for yourself on every page by adding:
			var signCheck = 'Disable';
	   to [[Special:MyPage/common.js]]

	 * Alternatively, if you sign with 3 tildes, add:
			var signCheck = 3;

	 * To disable checking on a specific page for everyone, add:
			<!--~~~~-->
	   to that page somewhere, it will overlook it each time.
	 */
if (mNamespaceNumber % 2 == 1 || mNamespaceNumber == 110) {
	if (!document.URL.match('&undo') && !document.URL.match('/Archive')) {
		addOnloadHook(function() {
			$('#wpSave, #wpPreview').mousedown(signChecker);
		});

		var vSignCheckerCounter = 0;
		var mInitialLength = $('#wpTextbox1').val().length;
		function signChecker() {
			var vTildes = '~~\~~';
			// Bypassing the line in the forum template.
			var vForumMessage = 'Be sure to sign your edits with four tildes: ' + vTildes;
			var vNoWiki = '<nowiki>' + vTildes + '</nowiki>';
			var vMinorChecked = $('#wpMinoredit').is(':checked');
			var mFinalLength = $('#wpTextbox1').val().length;

			var vText = $('#wpTextbox1').val().replace(vForumMessage, '').replace(vNoWiki, '');
			if (vSignCheckerCounter < 3 && !vText.match(vTildes) &&
				   !vText.match('{\{[Tt]alk ?header}}') && !vText.match('{\{[Dd]elete') &&
				   !vMinorChecked && !$('#wpSummary').val().match(/move/i) &&
				   !$('#wpSummary').val().match(/archive/i) &&
				   mFinalLength > mInitialLength + 15) {
				vSignCheckerCounter++;
				if (!window.signCheck) {
					alert('Please sign your post by adding 4 tildes (' + vTildes + ') to the end of your post.');
				} else if (window.signCheck == 3) {
					alert('Please sign your post by adding 3 tildes (~\~~) to the end of your post.');
				} else if (window.signCheck == 'Disable') {
					vSignCheckerCounter = 9;
				}
			}
		}
	}
}
/* End of mw.loader.using callback; DO NOT ADD CODE BELOW THIS LINE */
});