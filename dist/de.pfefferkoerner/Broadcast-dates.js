if (mw.config.get('wgPageName') === mw.config.get('wgMainPageTitle').replace(/ /g, '_')) {
	$('.js-sendetermine').append(
		$('<iframe />', {
			src: 'https://programm.ard.de/TV/Export/Pfefferkoerner',
			sandbox: ''
		})
	);
}