(function() {
	if (window.swagger || !document.getElementById('swagger-ui')) return;

	var v = '4.6.2';
	var title = window.swaggerTitle || (mw.config.get('wgPageName') + '/openapi.yaml');

	mw.loader.getScript('https://unpkg.com/swagger-ui-dist@' + v + '/swagger-ui-bundle.js').then(function() {
		mw.loader.load('https://unpkg.com/swagger-ui-dist@' + v + '/swagger-ui.css', 'text/css');

		/* function getBody(request) {
			const headers = request.get('headers');
			const reqBody = request.get('body');

			if (!(headers && headers.size) || !reqBody) return false;

			const contentType = Object.keys(headers).find(function(h) {
				return /^content-type$/i.test(h) ? headers[h].toLowerCase() : false;
			});

			var body = {};
			if (Map.isMap(reqBody)) {
				reqBody.forEach(function(key, value) {
					body[key] = value;
				});
			} else body = reqBody;
		}

		const CustomRequestGeneratorPlugin = { fn: {
			requestSnippetGenerator_js_got: function(request) {
				return 'import got from \'got\';\n\n' +
					'const { data } = await got.'+request.get('method').toLowerCase()+'('+request.get('url')+', {\n' +
					'	'
				;
			}
		}}; */

		var ui = SwaggerUIBundle({
			url: new mw.Uri(new mw.Title(title).getUrl()).extend({ action: 'raw' }).toString(),
			dom_id: '#swagger-ui',
			docExpansion: 'list',
			// presets: [
			// 	SwaggerUIBundle.presets.apis,
			// 	SwaggerUIBundle.SwaggerUIStandalonePreset
			// ],
			withCredentials: true,
			showExtensions: true,
			showCommonExtensions: true,
			/* requestSnippetsEnabled: true,
			requestSnippets: {
				generators: {
					'js_got': {
						title: 'Got (JavaScript)',
						syntax: 'javascript'
					},
					// 'js_fetch': {
					// 	title: 'Fetch (JavaScript)',
					// 	syntax: 'javascript'
					// }
				}
			} */
		});

		window.swagger = ui;
	}, function(e) {
		console.error(e.message);
	});
}());