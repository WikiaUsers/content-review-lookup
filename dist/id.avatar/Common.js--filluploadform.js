/* Any JavaScript here will be loaded for all users on every page load. */
/* Automatically fills the summary field in upload form with imagebox
 * by: [[User:KettleMeetPot]]
 */
 
$(document).ready(function() {
    if ( wgCanonicalSpecialPageName == "Upload" || wgCanonicalSpecialPageName == "MultipleUpload") {
	    var value = "{"+"{Imagebox\n"
		+ "| ringkasan   = \n"
		+ "| film        = \n"
		+ "| seri        = \n"
		+ "| musim       = \n"
		+ "| episode     = \n"
		+ "| sumber      = \n"
		+ "| asal        = \n"
		+ "| kategori    = \n"
		+ "| lisensi     = \n"
		+ "}"+"}";
		$('#wpUploadDescription').val(value);
    }
});