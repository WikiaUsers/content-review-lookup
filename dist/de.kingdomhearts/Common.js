// ==================
//  Code for Template:Suite3
//  Author: Soxra
// ==================

$(document).ready(function () {
	$(".morphMaster").each(function () {
		var $master = $(this);
		var $tabs = $master.find(".morphTabBox");
		var $container = $master.find(".morphTabContainer");

		$tabs.find(".morphLink").click(function () {
			var id = $(this).attr("id");
			id = id.substr(0, id.length - 4);
			$container.find(".morphContent").hide();
			$container.find("#" + id + "Content").show();
		});
	});
});

/* --- Special:Upload template preload --- */
 
    var matches = window.location.href.match(/wpForReUpload/);
 
    if( matches && matches.length ) {
    	var mwct;
    } else {
    	$("#mw-content-text #mw-upload-form fieldset #mw-htmlform-description tbody .mw-htmlform-field-HTMLTextAreaField .mw-input #wpUploadDescription").html("{{Dateiinfo\n|Beschreibung = \n|Datum = \n|Autor = \n|Quelle = \n|Lizenz = © SE und Walt Disney\n|Sonstiges = \n}}\n\n[[Category:]]");
    	$("#mw-upload-form fieldset table#mw-htmlform-description tbody tr.mw-htmlform-field-Licenses").show();
    }