/* Any JavaScript here will be loaded for all users on every page load. */

/*
 * QLicense.js, 
 * [originally] by User:Cakemix, decoded and formatted,
 * decoded, formatted, and shortened by Monchoman45,
 * translated by MarkosBoss (polish).
 */
if ( $.inArray("user",wgUserGroups) != -1) {
function QLicenseUI() {
	window.qapi = new APIQuery();
	var options = {
		'{{Fairuse}}': 'Fairuse',
                '{{Screenshot}}': 'AT episode screenshot',
                '{{Character Image}}': 'AT character',
                '{{Modelsheet}}': 'AT model sheet',
                '{{Photograph}}': 'Photograph',
                '{{No license}}': 'I dont know the license',
		'{{Self}}': 'I took this photo myself',
                '{{PD}}': 'Public domain'
	};
	var optstr = '';
	for(i in options) {optstr += '<option value="' + i + '" style="text-align:center;">' + options[i] + '</option>';}

	var html = '<p style="text-align:center;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Add license</a> (if it does not exist)';
	if(document.getElementById('LicensedFile') || document.getElementById('Copyright')) {html += '&nbsp;<span style="color:red; font-weight:bold; text-align:center;">This file is licensed.</span></p>';}
	else {html += '&nbsp;<span style="color:green; font-weight:bold; text-align:center;">This file is not licensed.</span></p>';}
	$('#filetoc').append(html);

	document.getElementById('aSubmit').onclick = function(event) {
		qapi.send(new qapi.Query(qapi, 'POST', 'action=edit&title=' + wgPageName + '&appendtext=' + document.getElementById('QLicenseSelect').value + '&summary=Licensing image', function(result) {
			if(result.edit.result == 'Success') {window.location = wgServer + '/index.php?title=' + wgPageName + '&action=purge';}
			else {alert('An error occurred while submitting the edit.');}
		}));
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
	}
}

if(wgCanonicalNamespace == 'File') {
	addOnloadHook(QLicenseUI);
	importScriptPage('MediaWiki:APIQuery.js', 'monchbox');
}
}