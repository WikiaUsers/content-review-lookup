(function() {
	if (window.swagger) return;
	var v = '4.6.2';

	mw.loader.getScript('https://unpkg.com/swagger-ui-dist@' + v + '/swagger-ui-bundle.js').then(function() {
		mw.loader.load('https://unpkg.com/swagger-ui-dist@' + v + '/swagger-ui.css', 'text/css');

		var ui = SwaggerUIBundle({
			url: new mw.Uri(new mw.Title(mw.config.get('wgPageName') + '/openapi.yaml').getUrl()).extend({ action: 'raw' }).toString(),
			dom_id: '#swagger-ui',
			docExpansion: 'list',
			// presets: [
			// 	SwaggerUIBundle.presets.apis,
			// 	SwaggerUIBundle.SwaggerUIStandalonePreset
			// ]
		});

		window.swagger = ui;
	}, function(e) {
		console.error(e.message);
	});
}());