/* Any JavaScript here will be loaded for all users on every page load. */

/* Automatically fills the summary field in upload form with imagebox
 * by: [[User:KettleMeetPot]] (taken from  [[w:c:Avatar|Avatar Wiki]]).
 */
 
 
$(document).ready(function() {
    if ( wgCanonicalSpecialPageName == "Upload" || wgCanonicalSpecialPageName == "MultipleUpload") {
	    var value = "{"+"{Dateiinfo\n"
		+ "| Beschreibung = \n"
		+ "| Quelle       = \n"
		+ "| Künstler     = \n"
		+ "| Kategorien   = \n"
		+ "}"+"}";
		$('#wpUploadDescription').val(value);
    }
});