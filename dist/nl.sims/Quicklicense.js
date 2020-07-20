/* Quick image license - contains the most commonly used licensing criteria - fixed for Oasis */
function QLicenseUI() {
	var options = {
		'': '',
		'== Licentie ==\n{{Auteursrecht van EA|fanon}}': 'Fanon Sim of afbeelding',
		'== Licentie ==\n{{Auteursrecht van EA|sim1}}': 'Sim van The Sims',
		'== Licentie ==\n{{Auteursrecht van EA|sim2}}': 'Sim van De Sims 2',
		'== Licentie ==\n{{Auteursrecht van EA|sim3}}': 'Sim van De Sims 3',
		'== Licentie ==\n{{Auteursrecht van EA|sim4}}': 'Sim van De Sims 4',
		'== Licentie ==\n{{Auteursrecht van EA|simlv}}': 'Sim van Levensverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|simdv}}': 'Sim van Dierenverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|simev}}': 'Sim van Eilandverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|simcon}}': 'Sim van een console',
		'== Licentie ==\n{{Auteursrecht van EA|simm}}': 'Sim van Middeleeuwen',
		'== Licentie ==\n{{Auteursrecht van EA|huisdier}}': 'Huisdier',
		'== Licentie ==\n{{Auteursrecht van EA|fam}}': 'Familie',
		'== Licentie ==\n{{Auteursrecht van EA|kavel1}}': 'Kavel van The Sims',
		'== Licentie ==\n{{Auteursrecht van EA|kavel2}}': 'Kavel van De Sims 2',
		'== Licentie ==\n{{Auteursrecht van EA|kavel3}}': 'Kavel van De Sims 3',
		'== Licentie ==\n{{Auteursrecht van EA|kavel4}}': 'Kavel van De Sims 4',
		'== Licentie ==\n{{Auteursrecht van EA|kavellv}}': 'Kavel van Levensverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|kaveldv}}': 'Kavel van Dierenverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|kavelev}}': 'Kavel van Eilandverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|kavelm}}': 'Kavel van Middeleeuwen',
		'== Licentie ==\n{{Auteursrecht van EA|voor}}': 'Voorwerp',
		'== Licentie ==\n{{Auteursrecht van EA|her}}': 'Herinnering',
		'== Licentie ==\n{{Auteursrecht van EA|vae}}': 'Verlangen of Angst',
		'== Licentie ==\n{{Auteursrecht van EA|gemoed}}': 'Gemoedstoestand',
		'== Licentie ==\n{{Auteursrecht van EA|eigen}}': 'Eigenschap',
		'== Licentie ==\n{{Auteursrecht van EA|ster}}': 'Sterrenbeeld',
		'== Licentie ==\n{{Auteursrecht van EA|icoon1}}': 'Icoon uit The Sims',
		'== Licentie ==\n{{Auteursrecht van EA|icoon2}}': 'Icoon uit De Sims 2',
		'== Licentie ==\n{{Auteursrecht van EA|icoon3}}': 'Icoon uit De Sims 3',
		'== Licentie ==\n{{Auteursrecht van EA|icoon4}}': 'Icoon uit De Sims 4',
		'== Licentie ==\n{{Auteursrecht van EA|icoon1}}': 'Icoon uit The Sims',
		'== Licentie ==\n{{Auteursrecht van EA|s2com}}': 'Icoon van TheSims2.com/ Desims2.nl',
		'== Licentie ==\n{{Auteursrecht van EA|s3com}}': 'Icoon van TheSims3.com/ Desims3.nl',
		'== Licentie ==\n{{Auteursrecht van EA|s4com}}': 'Icoon van TheSims4.com/ Desims4.nl',
		'== Licentie ==\n{{Auteursrecht van EA|box}}': 'Covers',
		'== Licentie ==\n{{Auteursrecht van EA|logo}}': 'Spel logo of icoon',
		'== Licentie ==\n{{Auteursrecht van EA|render}}': 'Promotie materiaal',
		'== Licentie ==\n{{Auteursrecht van EA|ss1}}': 'Afbeelding uit The Sims',
		'== Licentie ==\n{{Auteursrecht van EA|ss2}}': 'Afbeelding uit De Sims 2',
		'== Licentie ==\n{{Auteursrecht van EA|ss3}}': 'Afbeelding uit De Sims 3',
		'== Licentie ==\n{{Auteursrecht van EA|ss4}}': 'Afbeelding uit De Sims 4',
		'== Licentie ==\n{{Auteursrecht van EA|sslv}}': 'Afbeelding uit Levensverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|ssdv}}': 'Afbeelding uit Dierenverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|ssev}}': 'Afbeelding uit Eilandverhalen',
		'== Licentie ==\n{{Auteursrecht van EA|ssmid}}': 'Afbeelding uit Middeleeuwen',
		'== Licentie ==\n{{Auteursrecht van EA|sscon}}': 'Afbeelding uit console spellen',
		'== Licentie ==\n{{Auteursrecht van EA}}': 'Iets anders uit De Sims serie',
		'== Licentie ==\n{{Auteursrecht van DSW}}': 'Iets van De Sims Wiki',
		'== Licentie ==\n{{Auteursrecht van Wikia}}': 'Iets van Wikia',
                '== Licentie ==\n{{Auteursrecht onbekend}}': 'Licentie onbekend'
		};
	var optstr = '';
	for ( i in options ) {
		if ( options.hasOwnProperty( i ) ) {
			optstr += '<option value="' + i + '" style="text-align:center;">' + options[i] + '</option>';
		}
	}

	var html = '<p style="text-align:center;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Voeg licentie toe</a>';
	if($('#LicensedFile').length || $('#Licensing').length) {
		html += '&nbsp;<span style="color:green; font-weight:bold; text-align:center;">Dit bestand heeft een licentie.</span></p>';
	} else {
		html += '&nbsp;<span style="color:red; font-weight:bold; text-align:center;">Dit bestand heeft geen licentie.</span></p>';
	}
	$('#WikiaPageHeader').append(html);
	$('#aSubmit').click( function(event) {
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.post("/api.php", {action: "edit", title: mw.config.get("wgPageName"), token: mw.user.tokens.values.editToken, bot: true, appendtext: $("#QLicenseSelect").val(), summary: "Licensing image."}, function (result) {
			window.location = wgServer + '/index.php?title=' + mw.config.get("wgPageName") + '&action=purge';
		});
	});
}

if (wgCanonicalNamespace == 'Bestand') {
	addOnloadHook(QLicenseUI);
}