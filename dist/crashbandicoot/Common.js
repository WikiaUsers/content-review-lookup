/* --- Global variable used for referencing current page URL --- */
 
    var siteURL = location.protocol + "//" + location.host + location.pathname;
 
/* --- Removes the need for adding a surfeit amount of <gallery> attributes --- */
/* --- by making the desirable ones the default.                            --- */
 
    $(".wikia-gallery").removeClass().addClass("wikia-gallery wikia-gallery-caption-below wikia-gallery-position-center wikia-gallery-spacing-small wikia-gallery-border-none wikia-gallery-captions-center wikia-gallery-caption-size-medium");
 
/* --- Special:Upload template preload --- */
 
    var matches = window.location.href.match(/wpForReUpload/);
 
    if( matches && matches.length ) {
    	var mwct;
    } else {
    	$("#mw-content-text #mw-upload-form fieldset #mw-htmlform-description tbody .mw-htmlform-field-HTMLTextAreaField .mw-input #wpUploadDescription").html("{{infobox file\n|description = \n|source      = \n}}\n\n[[Category:]]");
    	$("#mw-upload-form fieldset table#mw-htmlform-description tbody tr.mw-htmlform-field-Licenses").hide();
    }