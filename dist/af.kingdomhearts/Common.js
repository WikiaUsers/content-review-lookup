/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* --- Special:Upload template preload --- */
 
    var matches = window.location.href.match(/wpForReUpload/);
 
    if( matches && matches.length ) {
    	var mwct;
    } else {
    	$("#mw-content-text #mw-upload-form fieldset #mw-htmlform-description tbody .mw-htmlform-field-HTMLTextAreaField .mw-input #wpUploadDescription").html("{{FileInfo\n|Beskrywing= \n|Datum= \n|Outeur= \n|Bron= \n|Lisensie=© SE en Walt Disney\n|Ander= \n}}\n\n[[Category:]]");
    	$("#mw-upload-form fieldset table#mw-htmlform-description tbody tr.mw-htmlform-field-Licenses").show();
    }