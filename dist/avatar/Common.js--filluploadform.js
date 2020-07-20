/* Automatically fills the summary field in upload form with imagebox
 * by: [[User:KettleMeetPot]]
 */
 
$(document).ready(function() {
    if ( wgCanonicalSpecialPageName == "Upload" || wgCanonicalSpecialPageName == "MultipleUpload") {
	    var value = "{"+"{Imagebox\n"
		+ "| description = \n"
		+ "| film        = \n"
		+ "| series      = \n"
		+ "| season      = \n"
		+ "| episode     = \n"
		+ "| source      = \n"
		+ "| origin      = \n"
		+ "| cats        = \n"
		+ "| license     = \n"
		+ "}"+"}";
		$('#wpUploadDescription').val(value);
    }
});