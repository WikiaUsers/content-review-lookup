// 09:55, February 18, 2016 (UTC)
// <source lang="JavaScript">

// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
importScriptPage('MediaWiki:Wikia.js/accountNavigation.js', 'admintools');
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

/* Quick image license - contains the most commonly used licensing criteria - fixed for Oasis */
function QLicenseUI() {
	var options = {
		'': '',
		'\n== Licensing ==\n{{Fairuse}}': 'Fair use',
                '\n== Licensing ==\n{{cc-by-sa-3.0}}': 'This is licensed under Creative Commons Attribution 3.0 (free license)',
                '\n== Licensing ==\n{{GFDL}}': 'This is licensed under GFDL (free license)',
                '\n== Licensing ==\n{{PD}}': 'Public domain',
                '\n== Licensing ==\n{{No license}}': 'License unknown'
		};
	var optstr = '';
	for ( i in options ) {
		if ( options.hasOwnProperty( i ) ) {
			optstr += '<option value="' + i + '" style="text-align:center;">' + options[i] + '</option>';
		}
	}
 
	var html = '<p style="text-align:center;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Add license</a>';
	if($('#LicensedFile').length || $('#Licensing').length) {
		html += '&nbsp;<span style="color:red; font-weight:bold; text-align:center;">This file is licensed.</span></p>';
	} else {
		html += '&nbsp;<span style="color:green; font-weight:bold; text-align:center;">This file is not licensed.</span></p>';
	}
	$('#WikiaPageHeader').append(html);
	$('#aSubmit').click( function(event) {
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.post("/api.php", {action: "edit", title: mw.config.get("wgPageName"), token: mw.user.tokens.values.editToken, bot: true, appendtext: $("#QLicenseSelect").val(), summary: "Licensing image."}, function (result) {
			window.location = wgServer + '/index.php?title=' + mw.config.get("wgPageName") + '&action=purge';
		});
	});
}
 
if (wgCanonicalNamespace == 'File') {
	addOnloadHook(QLicenseUI);
}

importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});