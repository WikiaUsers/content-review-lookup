/* SCRIPT ORIGINALLY CREATED BY [[User:Lost Labyrinth]] for The Sims Wiki [[w:c:sims]] */
/* [[w:c:sims:User:Lost_Labyrinth/general/quicklicenseoasis.js]] */
/* This is intended for use in the Oasis skin. Doesn't work on Monobook. */
/* Monobook version: [[User:K6ka/javascript/licenseadder-monobook.js]] */
if (wgUserGroups.indexOf('autoconfirmed') != -1) {
function QLicenseUI() {
	var options = {
		'': 'Select a license',
		'\n== Licensing ==\n{{Copyright by CAG}}': 'Copyrighted by Con Artist Games',
		'\n== Licensing ==\n{{Fairuse}}': 'Fair Use',
		'\n== Licensing ==\n{{Permission}}': 'Copyrighted — used with permission',
		'\n== Licensing ==\n{{Copyright by Wikia}}': 'Copyrighted by Wikia',
		'\n== Licensing ==\n{{CC-BY-SA}}': 'CC-BY-SA',
		'\n== Licensing ==\n{{CC-BY-SA-3.0}}': 'CC-BY-SA 3.0',
		'\n== Licensing ==\n{{CC-BY-SA-4.0}}': 'CC-BY-SA 4.0',
        	'\n== Licensing ==\n{{GFDL}}': 'GFDL',
        	'\n== Licensing ==\n{{Other free}}': 'Other free',
        	'\n== Licensing ==\n{{PD}}': 'Public Domain',
        	'\n== Licensing ==\n{{From Wikimedia}}': 'From Wikimedia',
        	'\n== Licensing ==\n{{No license}}': 'I do not know the license',
		};
	var optstr = '';
	for (var i in options ) {
		if ( options.hasOwnProperty( i ) ) {
			optstr += '<option value="' + i + '" style="text-align:center;">' + options[i] + '</option>';
		}
	}
 
	var html = '<p style="text-align:center;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Add license</a>';
	if($('#LicensedFile').length || $('#Licensing').length) {
		html += '&nbsp;<span style="color:green; font-weight:bold; text-align:center;">This page has a license template.</span> (<a href="https://tlaststand.wikia.com/wiki/Help:License adder">help</a>)</p>';
	} else {
		html += '&nbsp;<span style="color:red; font-weight:bold; text-align:center;">This page does not have a license template! Consider adding one.</span> (<a href="https://tlaststand.wikia.com/wiki/Help:License adder">help</a>)</p>';
	}
	$(html).insertBefore('#WikiaMainContent');
	$('#aSubmit').click( function(event) {
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.post("/api.php", {action: "edit", title: mw.config.get("wgPageName"), token: mw.user.tokens.values.editToken, bot: true, appendtext: $("#QLicenseSelect").val(), summary: "Adding license template using [[Help:License adder|license adder]]"}, function (result) {
			window.location = wgServer + '/index.php?title=' + mw.config.get("wgPageName") + '&action=purge';
		});
	});
}
 
if (mw.config.get('wgNamespaceIds').file === mw.config.get('wgNamespaceNumber') && mw.config.get('wgAction') === 'view' && !window.QLicenseLoaded) {
    window.QLicenseLoaded = true;
    addOnloadHook(QLicenseUI);
}
}