/* Any JavaScript here will be loaded for all users on every page load. */
 * by: [[User:KettleMeetPot]]
 */
 
$(function() {
    if ( mw.config.get('wgCanonicalSpecialPageName') == "Upload" || mw.config.get('wgCanonicalSpecialPageName') == "MultipleUpload") {
	    var value = "{"+"{Imagebox\n"
		+ "| description = \n"
		+ "| chapter     = \n"
	    + "| Volume      = \n"
		+ "| series      = \n"
		+ "| season      = \n"
		+ "| episode     = \n"
		+ "| source      = \n"
		+ "| origin      = \n"
		+ "| license     = \n"
		+ "}"+"}";
		$('#wpUploadDescription').val(value);
    }
});