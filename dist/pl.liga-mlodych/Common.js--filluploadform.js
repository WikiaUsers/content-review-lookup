/* Automatically fills the summary field in upload form with imagebox
 * by: [[User:KettleMeetPot]]
 */
 
$(document).ready(function() {
    if ( wgCanonicalSpecialPageName == "Upload" || wgCanonicalSpecialPageName == "MultipleUpload") {
	    var value = "{"+"{Filebox\n"
		+ "| opis         = \n"
		+ "| sezon        = \n"
		+ "| odcinek      = \n"
		+ "| źródło       = \n"
		+ "| pochodzenie  = \n"
		+ "| licencja     = \n"
		+ "}"+"}";
		$('#wpUploadDescription').val(value);
    }
});