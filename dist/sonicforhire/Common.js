/* Any JavaScript here will be loaded for all users on every page load. */

/* Automatically add Aboutfile template to file upload description. Source: nl.wikipedia.org/wiki/MediaWiki:Common.js */
if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload' && !document.getElementById('wpForReUpload') && !document.getElementsByClassName('warning')[0] && !document.getElementsByClassName('error')[0]) {
	function loadAutoAboutfileTemplate() {
		uploadDescription = document.getElementById('wpUploadDescription');
		var doubleBracket = '{' + '{';
		uploadDescription.value = doubleBracket + 'aboutfile\n|1=Subject of the image\n|2=Where you found the image\n|3=Artist\n|4=Describe edits, if any\n|5=Other versions (use file link)\n}}';
	}

	addOnloadHook(loadAutoAboutfileTemplate);
}

/* Auto-refresh button on Special:RecentChanges */
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}
var ajaxPages = new Array("Special:RecentChanges");
var ajaxRCOverride = false;
var rcRefresh = 30000;
function ajaxRC() {
	appTo = $(".firstHeading");
	appTo.append('&nbsp;<span style="position:absolute; right:12px;"><span style="position:relative; top:2px;"><span style="position:relative; top:-12px; right:-15px;" id="autoRefreshProgress"><img src="/images/loader.gif" border="0" alt="AJAX operation in progress" /></span><span style="font-size: xx-small; cursor:help;" title="Automatically refresh the current page every ' + Math.floor(rcRefresh / 1000) + ' seconds">AUTO-REFRESH:</span><input type="checkbox" id="autoRefreshToggle"></span></span>');
	$("#autoRefreshToggle").click(function () {
		setCookie("ajaxRC", $("#autoRefreshToggle").is(":checked") ? "on" : "off")
		loadRCData()
	});
	$("#autoRefreshProgress").hide();
	if (getCookie("ajaxRC") == "on" || ajaxRCOverride) {
		$("#autoRefreshToggle").attr("checked", "checked");
		setTimeout("loadRCData();", rcRefresh);
	}
}
function loadRCData() {
	if (!$("#autoRefreshToggle").is(":checked")) return;
	$('#autoRefreshProgress').show()
	$(article).load(location.href + " " + article + " > *", function (data) {
		(article + " .mw-collapsible").makeCollapsible();
		$('#autoRefreshProgress').hide()
		if ($("#autoRefreshToggle").is(":checked")) setTimeout("loadRCData();", rcRefresh);
	});
}
$(function () {
	article = "#bodyContent";
	for (x in ajaxPages) {
		if (wgPageName == ajaxPages[x] && $("#autoRefreshToggle").length == 0) ajaxRC();
	}
});