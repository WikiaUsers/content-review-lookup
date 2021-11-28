/* Any JavaScript here will be loaded for users using the MonoBook skin */

/**
 * Topbar content fix with sitenotice and CentralNotice
 *
 * Description: This fixes the location of topbar content (e.g., featured
 *              content star) when the sitenotice or CentralNotice is active.
 * Maintainers: [[User:TheDJ]], [[User:MZMcBride]]
 */
// Only when editing/previewing a page
if ( mw.config.get( 'wgAction' ) == 'submit' || mw.config.get( 'wgAction' ) == 'view' ) {
	$( function() {
		// If there is a dismissible sitenotice or an (expanded) centralnotice
		if ( $( '#mw-dismissible-notice' ).length || $( '#centralNotice' ).hasClass('expanded') ) {
			mw.util.addCSS( '#bodyContent { position: relative; } #coordinates { position: absolute; top: 1px !important; }' );
		}
	} );
}

// Add support for legacy methods still being used by logged in users in their user scripts so these do not log as errors
// Please talk to [[User:Jon (WMF)]] before removing.

function stubMissingFunctionError( method, rtnValue ) {
  if(window[method]) return;
  window[method] = function () {
    mw.log.error('Monobook.js says - A user script or gadget you have loaded is using a deprecated method:' + method);
    return rtnValue;
  };
}
stubMissingFunctionError('getElementsByClassName', []);
stubMissingFunctionError('sajax_init_object');
stubMissingFunctionError('appendCSS');
stubMissingFunctionError('akeytt');
stubMissingFunctionError('attachEvent');
if (typeof InstaView === 'undefined') {
  window.InstaView = {}; // seeing various Uncaught ReferenceError: InstaView is not defined errors. Can be removed when addressed in https://global-search.toolforge.org/?q=InstaView%5C.&regex=1&namespaces=&title=.*%2Fmonobook%5C.js
}