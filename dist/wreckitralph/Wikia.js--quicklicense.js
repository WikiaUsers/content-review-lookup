/* FROM SIMS WIKI ... https://sims.fandom.com/index.php?title=MediaWiki%3AWikia.js%2Fquicklicense.js&diff=858084&oldid=858083 First developed by Lost Labyrinth and updated by K6ka, per https://sims.fandom.com/wiki/Help:Quick_license ... modified for use with Wreck-It Ralph Wiki templates */

/* Quick image license - contains the most commonly used licensing criteria */
if (wgUserGroups.indexOf('autoconfirmed') != -1) {
function QLicenseUI() {
	var options = {
                ' ': 'Select a license',
		'== Licensing ==\n{{Fairuse}}\n': 'Fair use (images of the movie or other copyrighted things)',
                '== Licensing ==\n{{CC-BY-SA}}\n': 'Creative Commons Attribution-Share Alike License',
                '== Licensing ==\n{{cc-by-sa-3.0}}\n': 'Creative Commons Attribution 3.0 (free license)',
                '== Licensing ==\n{{Other free}}\n': 'Licensed under another free license',
                '== Licensing ==\n{{PD}}\n': 'Public domain',
                '== Licensing ==\n{{Self}}\n': 'I created this image myself.',
                '== Licensing ==\n{{Permission}}\n': 'I can show an admin written permission from the copyright holder',
                '== Licensing ==\n{{Official external video}}\n': 'Video hosted externally by an official or licensed source',
                '{{From Wikimedia}}\n': 'Wikipedia/other Wikimedia (this will not mark this file as having a license)',
                '{{No license}}\n': 'License unknown (this will not mark this file as having a license)'
		};
	var optstr = '';
	for (var i in options ) {
		if ( options.hasOwnProperty( i ) ) {
			optstr += '<option value="' + i + '" style="text-align:left;padding-bottom:10px;">' + options[i] + '</option>';
		}
	}
 
	var html = '<p style="text-align:left;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Add license</a>';
	if($('#LicensedFile').length || $('#Licensing').length) {
		html += '&nbsp;<span style="color:green; font-weight:bold; text-align:left;">This page has a license template.</span> (<a href="https://wreckitralph.wikia.com/wiki/Help:Quick_license">help</a>)</p>';
	} else {
		html += '&nbsp;<span style="color:red; font-weight:bold; text-align:left;">This page does not have a license template! Consider adding one.</span> (<a href="https://wreckitralph.wikia.com/wiki/Help:Quick_license">help</a>)</p>';
	}
	$(html).insertBefore('#WikiaMainContent');
	$('#aSubmit').click( function(event) {
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.post("/api.php", {action: "edit", title: mw.config.get("wgPageName"), token: mw.user.tokens.values.editToken, bot: true, prependtext: $("#QLicenseSelect").val(), summary: "Adding license template using [[Help:Quick license|Quick license]]"}, function (result) {
			window.location = wgServer + '/index.php?title=' + mw.config.get("wgPageName") + '&action=purge';
		});
	});
}
 
if (mw.config.get('wgNamespaceIds').file === mw.config.get('wgNamespaceNumber') && mw.config.get('wgAction') === 'view' && !window.QLicenseLoaded) {
    window.QLicenseLoaded = true;
    addOnloadHook(QLicenseUI);
}
}
//