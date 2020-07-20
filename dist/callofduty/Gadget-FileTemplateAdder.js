// <nowiki>
// BEGIN MW GADGET
// *********
// File Template Adder
// Easy way to add file maintenance template
// Written by Callofduty4
// *********

function FileTemplateAdder() {
	var tempOptions = {
		'{{Jpeg}}': '.JPG',
		'{{Trans}}': 'Needs trans',
		'{{Imagequality}}': 'Poor quality'
	};
        if (wgUserGroups.indexOf("sysop") != -1) {
                tempOptions['{{SDS}}'] = "SDS";
        }
	var tempOptStr = '';
	for(i in tempOptions) {
		tempOptStr += '<option value="' + i + '" style="text-align:center;">' + tempOptions[i] + '</option>';
	}
 	var html = '<p style="text-align:center;" class="TemplateAdder"><select id="FileTemplateAdder">' + tempOptStr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="templateSubmit">Add template</a>';
	$('#filetoc').append(html);
	$('#templateSubmit').click(function(event) {
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.getJSON("/api.php", {action: "query", prop: "info", titles: wgPageName, intoken: "edit", format: "json", indexpageids: 1}, function(json) {
			var pageIdentification = json.query.pageids[0];
			var pageToken = json.query.pages[pageIdentification].edittoken;
			$.post("/api.php", {action: "edit", title: wgPageName, token: pageToken, bot: true, prependtext: $('#FileTemplateAdder').val() + "\n"}, function (result) {$(".TemplateAdder").remove();});
		});
	});
}

if (wgCanonicalNamespace == 'File') {
	addOnloadHook(FileTemplateAdder);
}

// END MW GADGET
// </nowiki>