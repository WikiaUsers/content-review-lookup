$(function() {
    if ( mw.config.get('wgCanonicalSpecialPageName') == "Upload" || mw.config.get('wgCanonicalSpecialPageName') == "MultipleUpload") {
	    var value = "{"+"{Imagebox\n"
		+ "| attention       = \n"
		+ "| description     = \n"
		+ "| source          = \n"
		+ "| artist          = \n"
		+ "| filespecs       = \n"
		+ "| licensing       = \n"
		+ "| other versions  = \n"
		+ "| cat artist      = \n"
		+ "| cat license     = \n"
	    + "| cat subject     = \n"
	    + "| cat type        = \n"
		+ "}"+"}";
		$('#wpUploadDescription').val(value);
    }
});