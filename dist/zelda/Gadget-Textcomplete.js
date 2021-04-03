/**
 * Defines method to load textcomplete by yuku-t
 *  yuku-t.com/textcomplete/
 *  github.com/yuku/textcomplete
 * 
 * Assumptions:
 *  - No requests will occur before textcomplete is loaded
 * 
 */

var isTextcompleteLoaded = false;
function loadTextcomplete( callback ) {
	if (!isTextcompleteLoaded) {
		console.log( "Loading textcomplete..." );
		$.getScript( "https://unpkg.com/textcomplete/dist/textcomplete.min.js", function( data, textStatus, jqxhr ) {
			isTextcompleteLoaded = true;
			/// console.log( [ data, textStatus, jqxhr.status ] ); // Data returned, Success, 200
			console.log( "Loaded textcomplete. (Warning: May not be executed yet)" );
			// Textarea object: https://github.com/yuku-t/textcomplete/issues/114#issuecomment-318352383
			Textarea = Textcomplete.editors.Textarea; // Global Variable
			callback();
		});
	} else {
		callback();
	}
}