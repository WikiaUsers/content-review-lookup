;(function() {
	'use strict';
	var action = mw.config.get('wgAction');
	if ( action == 'edit' || action == 'submit' ) {
		mw.loader.load( [ 'ext.gadget.FANDOOMEditorImpl' ] );
	}
})();