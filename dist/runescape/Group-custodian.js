/* <pre>
 * Javascript for custodian usergroup
 */

// Unchecks redirect checkbox on file pages
// Because redirects in file namespace are useless
$(function () {
	if(mw.config.get('wgCanonicalSpecialPageName') === 'Movepage' && (/File/).test(mw.config.get('wgTitle'))) {
		$('#wpLeaveRedirect').removeAttr('checked');
	}
});

/* </pre> */