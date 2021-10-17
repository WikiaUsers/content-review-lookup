/* Automatically fills the summary field in upload form with imagebox
 * by: [[User:KettleMeetPot]]
 */
 
$(function() {
    if ( mw.config.get('wgCanonicalSpecialPageName') == "Upload" || mw.config.get('wgCanonicalSpecialPageName') == "MultipleUpload") {
	    var value = "{"+"{Filebox\n"
		+ "| description = \n"
		+ "| season      = 4\n"
		+ "| episode     = \n"
		+ "| source      = HD\n"
		+ "| origin      = \n"
		+ "| license     = screenshot\n"
		+ "}"+"}";
		$('#wpUploadDescription').val(value);
    }
});