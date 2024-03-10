/* Any JavaScript here will be loaded for all users on every page load. */
function requireImageLicense() {
	if (mw.config.get("wgPageName") == "Special:Upload" && mw.util.getParamValue("wpDestFile") == null) {
		var $wpu = $("#mw-upload-form").find("[name=wpUpload]").not("#wpUpload");
		$wpu.attr("disabled","true");
		$("#wpLicense").change(function () {
			if ($("#wpLicense").val()) {
				$wpu.removeAttr("disabled");
			} else {
				$wpu.attr("disabled","true");
			}
		});
	}
}

$(function() {
	requireImageLicense();
});