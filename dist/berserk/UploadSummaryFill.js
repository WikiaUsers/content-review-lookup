// Pre-fill upload summary with Template:Fileinfo

$(function() {
	if (mw.config.get("wgCanonicalSpecialPageName") === "Upload" || mw.config.get("wgCanonicalSpecialPageName") === "MultipleUpload") {
		const template = "{{Fileinfo\n"
		    + "| license    = \n"
		    + "| categories = \n"
		    + "}}";
		$("#wpUploadDescription").val(template);
		$(".mw-htmlform-field-Licenses").remove()
		$(".mw-upload-editlicenses").remove()
	}
});