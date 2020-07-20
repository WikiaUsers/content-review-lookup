/* Automatically fills the summary field in upload form with imagebox
 * by: [[User:KettleMeetPot]]
 */
 
$(document).ready(function() {
    if ( wgCanonicalSpecialPageName == "Upload" || wgCanonicalSpecialPageName == "MultipleUpload") {
	    var value = "{"+"{Filebox\n"
		+ "| description = \n"
		+ "| season      = 3\n"
		+ "| episode     = \n"
		+ "| source      = HD\n"
		+ "| origin      = \n"
		+ "| license     = screenshot\n"
		+ "}"+"}";
		$('#wpUploadDescription').val(value);
    }
});