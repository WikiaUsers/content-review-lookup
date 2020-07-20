/* Quick image license - contains the most commonly used licensing criteria - fixed for Oasis */
function QLicenseUI() {
	var options = {
		'': '',
		'\n== Licensing ==\n{{Copyright by EA|fanon}}': 'Fanon image',
		'\n== Licensing ==\n{{Copyright by EA|sim1}}': 'Sim from TS1',
                '\n== Licensing ==\n{{Copyright by EA|ss1}}': 'Screenshot from TS1',
                '\n== Licensing ==\n{{Copyright by EA|lot1}}': 'Lot from TS1',
                '\n== Licensing ==\n{{Copyright by EA|sim2}}': 'Sim from TS2',
                '\n== Licensing ==\n{{Copyright by EA|ss2}}': 'Screenshot from TS2',
                '\n== Licensing ==\n{{Copyright by EA|lot2}}': 'Lot from TS2',
		'\n== Licensing ==\n{{Copyright by EA|sim3}}': 'Sim from TS3',
                '\n== Licensing ==\n{{Copyright by EA|ss3}}': 'Screenshot from TS3',
                '\n== Licensing ==\n{{Copyright by EA|lot3}}': 'Lot from TS3',
		'\n== Licensing ==\n{{Copyright by EA|sim4}}': 'Sim from TS4',
                '\n== Licensing ==\n{{Copyright by EA|ss4}}': 'Screenshot from TS4',
                '\n== Licensing ==\n{{Copyright by EA|lot4}}': 'Lot from TS4',
                '\n== Licensing ==\n{{Copyright by EA|simls}}': 'Sim from Life Stories',
                '\n== Licensing ==\n{{Copyright by EA|lotls}}': 'Lot from Life Stories',
                '\n== Licensing ==\n{{Copyright by EA|ssls}}': 'Screenshot from Life Stories',
                '\n== Licensing ==\n{{Copyright by EA|simps}}': 'Sim from Pet Stories',
                '\n== Licensing ==\n{{Copyright by EA|lotps}}': 'Lot from Pet Stories',
                '\n== Licensing ==\n{{Copyright by EA|ssps}}': 'Screenshot from Pet Stories',
                '\n== Licensing ==\n{{Copyright by EA|lotcs}}': 'Lot from Castaway Stories',
                '\n== Licensing ==\n{{Copyright by EA|sscs}}': 'Screenshot from Castaway Stories',
                '\n== Licensing ==\n{{Copyright by EA|simcon}}': 'Sim from a console game',
                '\n== Licensing ==\n{{Copyright by EA|sscon}}': 'Screenshot from a console game',
                '\n== Licensing ==\n{{Copyright by EA|obj}}': 'An object',
                '\n== Licensing ==\n{{Copyright by EA|pet}}': 'A pet',
                '\n== Licensing ==\n{{Copyright by EA|box}}': 'Box art',
                '\n== Licensing ==\n{{Copyright by EA|mem}}': 'A memory',
                '\n== Licensing ==\n{{Copyright by EA|mood}}': 'A moodlet',
                '\n== Licensing ==\n{{Copyright by EA|moodnf}}': 'A moodlet with no frame',
                '\n== Licensing ==\n{{Copyright by EA|trait}}': 'A trait',
                '\n== Licensing ==\n{{Copyright by EA|zodiac}}': 'A zodiac sign',
                '\n== Licensing ==\n{{Copyright by EA|logo}}': 'A game logo or icon',
                '\n== Licensing ==\n{{Copyright by EA|waf}}': 'A want or fear',
                '\n== Licensing ==\n{{Copyright by EA|interface}}': 'Something from the game interface',
                '\n== Licensing ==\n{{Copyright by EA|promo}}': 'A promotional image',
                '\n== Licensing ==\n{{Copyright by EA|render}}': 'A game render',
                '\n== Licensing ==\n{{Copyright by EA}}': 'Something else from The Sims series/other EA-copyrighted image',
                '\n== Licensing ==\n{{Copyrighted by Wikia|obj}}': 'Something part of the Wikia interace',
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