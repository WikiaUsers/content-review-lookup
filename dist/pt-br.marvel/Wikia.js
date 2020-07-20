// Add click tracking to the Curso básico:Daredevil page
if(mw.config.get('wgPageName') === "Curso_básico:Demolidor") {
	var countryCode = Geo.getCountryCode(),
		timestamp = Date.now(),
		click_tracker,
		pixel_tracker,
		pass = true;
 
	switch(countryCode) {
		case "BR": 
			click_tracker = 'https://ad.doubleclick.net/ddm/trackclk/N186801.143372WIKIAINC/B9521718.130279317;dc_trk_aid=303123409;dc_trk_cid=69815253;u=mqso:90439401;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=';
			pixel_tracker = 'https://ad.doubleclick.net/ddm/trackimp/N186801.143372WIKIAINC/B9521718.130279317;dc_trk_aid=303123409;dc_trk_cid=69815253;u=mqso:90439401;ord=' + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?';
			break;
		default:
			pass = false;
			break;
	}
	if(pass === true) {
		$('.banner a').attr('href', click_tracker);
		$('body').append('<img src="' + pixel_tracker + '" border=0 width=1 height=1 alt="Advertisement">');
	}
}