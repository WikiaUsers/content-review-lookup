/**<nowiki>
 * Acepedia New Upload Form
 * Replaces Special:Upload's basic form with a more advanced one.
 * 
 * @author User:SlyCooperFan1
 *         Inspiration from Wikimedia Commons
 * 
 * @version 1
 *  
 * @todo add documentation
 */

function nufNewSubmit(){
	var nufSum = $("#wpUploadDescription");
	var destFile = $("#wpDestFile").val().trim();
	if(destFile.length==0){
		alert("Please provide a destination filename!");
		return;
	}
	var nufSource = $("#nufSource").val().trim();
	if(nufSource.length==0){
		alert("Please provide the original source!");
		return;
	}
	var nufDescText = $("#nufDescText").val().trim();
	if(nufDescText.length==0){
		alert("Please provide a description!");
		return;
	}
	nufSum.val("{{Fileinfo\n| description = " + nufDescText + "\n| source      = " + nufSource);
	var nufAuthors = $("#nufAuthors").val().trim();
	if(nufAuthors.length>0){
		nufSum.val(nufSum.val() + "\n| author      = " + nufAuthors);
	}
	var nufVersions = $("#nufVersions").val().trim();
	if(nufVersions.length>0){
		nufSum.val(nufSum.val() + "\n| alternate   = " + nufVersions);
	}
	var nufLicense = $("#wpLicense").val();
	if(nufLicense.length==0){
		alert("Please select a copyright license!");
		return;
	} else {
		nufSum.val(nufSum.val() + "\n| copyright   = {{" + nufLicense + "}}");
	}
	if(nufLicense=="Other free"){
		var nufLicenseText = $("#nufLicenseText").val().trim();
		if(nufLicenseText.length==0){
			alert("Please specify the other free license this file is published under!");
			return;
		} else {
			nufSum.val(nufSum.val() + "\n| license     = " + nufLicenseText);
		}
	}
	if(nufLicense=="Permission"){
		var nufPermissionText = $("#nufPermissionText").val().trim();
		if(nufPermissionText.length==0){
			alert("Please prove that this file is explicitly permitted to be used!");
			return;
		} else {
			nufSum.val(nufSum.val() + "\n| permission  = " + nufPermissionText);
		}
	}
	nufSum.val(nufSum.val() + "\n}}");
	var nuf7Check = $('input[name="nuf7Check"]:checked').val();
	if(!nuf7Check){
		alert("Please specify if this file relates to Ace Combat 7!");
		return;
	} else if(nuf7Check==1){
		nufSum.val(nufSum.val() + "\n[[Category:Ace Combat 7: Skies Unknown files]]");
	}
	$("#wpLicense").val("").attr("disabled", "disabled");
	$("#wpLicense > option:first").attr("selected", "selected").text("");
	$(".mw-htmlform-submit").click();
}

function nufOldForm(){
	$("#nufSwitchForms").html("<a onclick='nufNewForm()'>Click here for the new form. You will lose most of your work!</a>");
	$("#nufNewSubmit").remove();
	$(".mw-htmlform-submit").show().attr("accesskey", "s");
	$("#mw-upload-form fieldset:eq(1) legend").text("File description");
	$(".mw-htmlform-field-UploadSourceField td.mw-label").show();
	$(".mw-htmlform-field-UploadSourceField td.mw-input").attr("colspan", "1");
	$(".mw-htmlform-field-HTMLInfoField td.mw-label").show();
	$(".mw-htmlform-field-HTMLInfoField td.mw-input").attr("colspan", "1");
	$("tr.mw-htmlform-field-HTMLTextAreaField").show();
	$("label[for='wpDestFile'] .fa-asterisk").remove();
	$("#wpLicense").removeAttr("style").val("");
	$("#wpLicense > option:first").attr("selected", "selected");
	$("#mw-license-preview").html("");
	$(".mw-htmlform-field-Licenses .mw-label label").removeAttr("style");
	$(".nufFile").each(function(){
		$(this).remove();
	});
}

function nufNewForm(){
	$("#nufSwitchForms").html("<a onclick='$(\"#nufOldConfirm\").slideToggle();'>Advanced users, click here for the old form.</a><div id='nufOldConfirm'>You will lose most of your work! Are you sure you want to use the old form?<br><a onclick='nufOldForm()'>Yes, I'm sure.</a><br><a onclick='$(\"#nufOldConfirm\").slideToggle();'>Cancel.</a>");
	$(".mw-htmlform-submit").hide().removeAttr("accesskey").after('<a id="nufNewSubmit" class="wds-button" onclick="nufNewSubmit()" accesskey="s" title="Start upload [alt-shift-s]"><span class="fa fa-upload"></span> <span>Upload File</span></a>');
	$("#mw-upload-form fieldset:eq(1) legend").text("File information");
	$(".mw-htmlform-field-UploadSourceField td.mw-label").hide();
	$(".mw-htmlform-field-UploadSourceField td.mw-input").attr("colspan", "2");
	$(".mw-htmlform-field-HTMLInfoField td.mw-label").hide();
	$(".mw-htmlform-field-HTMLInfoField td.mw-input").attr("colspan", "2");
	$("tr.mw-htmlform-field-HTMLTextAreaField").hide();
	$("label[for='wpDestFile']").prepend("<span class='fa fa-asterisk' title='Required'></span> ");

	$(".mw-htmlform-field-HTMLTextField").next().after("<tr class='nufFile'><td class='mw-label'><label for='nufSource'><span class='fa fa-asterisk' title='Required'></span> Original source:</label><span class='fa fa-question-circle' title='Click here for help'></span></td><td class='mw-input'><input id='nufSource' name='nufSource' size='80'><span id='nufSourceMore' class='fa fa-plus' title='Click here for more lines'></span></td></tr>\
\
<tr class='nufFile nufHelp'><td></td><td>The source can be as simple as a URL to the source website or video.<br>Do not link to the image file itself, as it's no use when it's being uploaded.<br><br>If this is an in-game screenshot, specify the source as such: <code>''[[" + "GAME NAME]]''</code><br>If this file comes from another file on this wiki, specify the source as such: <code>[[" + ":File:NAME]]</code><br><br>If you need more than one line, click the plus icon to the right.</td></tr>\
\
<tr class='nufFile'><td class='mw-label'><label for='nufAuthor'>Author(s):</label><span class='fa fa-question-circle' title='Click here for help'></span></td><td class='mw-input'><input id='nufAuthors' name='nufAuthors' size='80'><span id='nufAuthorsMore' class='fa fa-plus' title='Click here for more lines'></span></td></tr>\
\
<tr class='nufFile nufHelp'><td></td><td>Usually, this field is unnecessary.<br>If this file was created by someone in particular, credit them here.<br><br>If this is an in-game screenshot, credit the person who took it, whether that's yourself or another player.<br><br>If you need more than one line, click the plus icon to the right.</td></tr>\
\
<tr class='nufFile'><td class='mw-label'><label for='nufVersions'>Other versions:</label><span class='fa fa-question-circle' title='Click here for help'></span></td><td class='mw-input'><input id='nufVersions' name='nufVersions' size='80'><span id='nufVersionsMore' class='fa fa-plus' title='Click here for more lines'></span></td></tr>\
\
<tr class='nufFile nufHelp'><td></td><td>This is typically used for wallpapers.<br>If you know there are other files on the wiki similar to this one, link them in this field as such:<br><code>[[" + ":File:NAME]] &amp;middot; [[" + ":File:NAME]] &amp;middot;</code> etc.<br><br>If you need more than one line, click the plus icon to the right.</td></tr>\
\
<tr class='nufFile'><td class='mw-label'><label for='nufDescText'><span class='fa fa-asterisk' title='Required'></span> Description:</label><span class='fa fa-question-circle' title='Click here for help'></span></td><td class='mw-input'><textarea class='nufTextArea' rows='2' id='nufDescText' name='nufDescText'></textarea></td></tr>\
\
<tr class='nufFile nufHelp'><td></td><td>Describe the contents of the file you're uploading.<br>Be as descriptive as possible, and include <code>[[" + "article links]]</code> to relevant articles.</td></tr>");

	$("#wpLicense").val("");
	$("#wpLicense > option:first").attr("selected", "selected");

	$(".mw-htmlform-field-Licenses .mw-label label").attr("style","display:inline!important;").html("<span class='fa fa-asterisk' title='Required'></span> Copyright license:</label><span class='fa fa-question-circle' title='Click here for help'></span>");

	$("#wpLicense").attr("style","display:inline!important;");

	$("#mw-license-preview").parent("tr").after("<tr class='nufFile nufHelp'><td></td><td>If you're not sure which license to use, \"<strong>Fair use</strong>\" covers 99% of files on this wiki.<br>Other licenses are only used for files that are explicitly protected under those licenses.</td></tr>\
\
<tr id='nufLicenseRow' class='nufFile'><td class='mw-label'><label for='nufLicenseText'><span class='fa fa-asterisk' title='Required'></span> \"Other free\" license:</label><span class='fa fa-question-circle' title='Click here for help'></span></td><td class='mw-input'><input id='nufLicenseText' name='nufLicenseText' size='80'></td></tr>\
\
<tr class='nufFile nufHelp'><td></td><td>If the copyright license is \"<strong>Other free</strong>\", you need to specify which free license is being used in this field. Include a link to the license.</td></tr>\
\
<tr id='nufPermissionRow' class='nufFile'><td class='mw-label'><label for='nufPermissionText'><span class='fa fa-asterisk' title='Required'></span> Permission:</label><span class='fa fa-question-circle' title='Click here for help'></span></td><td class='mw-input'><input id='nufPermissionText' name='nufPermissionText' size='80'><span id='nufPermissionTextMore' class='fa fa-plus' title='Click here for more lines'></span></td></tr>\
\
<tr class='nufFile nufHelp'><td></td><td>If the copyright license is \"<strong>Permission</strong>\", you need to provide evidence for our use of the file. If available, include links.<br><br>If you need more than one line, click the plus icon to the right.</td></tr>\
\
<tr id='nufNoLicense' class='nufFile'><td></td><td>WARNING: Your file is subject to deletion if you don't specify a valid license!</td></tr>\
\
<tr class='nufFile'><td></td><td><span class='fa fa-asterisk' title='Required'></span> Does this file relate in any way to <em>Ace Combat 7: Skies Unknown</em>?</td></tr>\
<tr class='nufFile'><td></td><td class='mw-input'><label><input type='radio' name='nuf7Check' value='1'> Yes</label> <label><input type='radio' name='nuf7Check' value='0'> No</label></td></tr>");
}

if($(".page-Special_Upload").length && typeof wpForReUpload === "undefined"){

	// import CSS
	window.importArticles({ type: "style", article: "MediaWiki:NewUploadForm.css" });

	$("#mw-upload-form fieldset:eq(1)").before("<div id='nufSwitchForms'></div>");
	nufNewForm();
	$(document).on("keypress", ":input:not(textarea)", function(event) {
		return event.keyCode != 13;
	});
	$("#wpLicense").change(function(){
		$("#nufLicenseRow").hide().next(".nufHelp").hide();
		$("#nufPermissionRow").hide().next(".nufHelp").hide();
		$("#nufNoLicense").hide();
		if($("#wpLicense").val()=="Other free"){
			$("#nufLicenseRow").show();
		} else if($("#wpLicense").val()=="Permission") {
			$("#nufPermissionRow").show();
		} else if($("#wpLicense").val()=="From Wikimedia" || $("#wpLicense").val()=="No license"){
			$("#nufNoLicense").show();
		}
	});
	$(".fa-question-circle").click(function(){
		var selRow = $(this).closest("tr");
		do {
			selRow = $(selRow).next();
		} while(!$(selRow).hasClass("nufHelp"));
		$(selRow).toggle();
	});
	$(".fa-plus").click(function(){
		var inputPrev = $(this).prev();
		$(this).remove();
		var v = $(inputPrev).val();
		var i = $(inputPrev).attr("id");
		$(inputPrev).replaceWith("<textarea class='nufTextArea' rows='2' id='" + i + "' name='" + i + "'>" + v + "</textarea>");
	});

}

if($(".page-Special_Images").length){
	$("#page-header-add-new-photo").click(function(){ window.location=$(this).attr('href'); });
}