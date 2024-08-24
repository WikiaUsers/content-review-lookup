;(function() {
	'use strict';

	var wgPageName = mw.config.get('wgPageName');
	if (wgPageName !== 'M�dulo:Pok�mon/datos') return;

	function getAPI(args, result) {
    result = result || [];
		var api = args.api;
		var params = args.params;
		var listname = args.listname || params.list || params.prop;
		var transformItem = args.transformItem || function(item) { return item; };
		var continueKey = args.continueKey;

		var promise = $.Deferred();
		api.get(params).then(function(req) {
			req.query[ listname ].forEach(function(item) {
				result.push(transformItem(item));
			});

			if (req.continue && req.continue[continueKey]) {
				params[continueKey] = req.continue[continueKey];
				setTimeout(function() {
					promise.resolve(getAPI(args, result));
				}, 1000);
			} else {
				setTimeout(function() {
					promise.resolve(result);
				}, 1000);
			}
		});
		return promise;
	}

	// https://stackoverflow.com/a/24932757
	function clearQueue(q) {
		var p = $.Deferred();
		setTimeout(p.resolve.bind(p), 0);

		return q.reduce(function(prev,cur){ 
			return prev.then(cur);
		}, p);
	}

	function setTagline(text) {
		if (!$('#custom-tagline').length) {
			$('.page-header__bottom').after('<div id="custom-tagline"></div>');
		}
		$('#custom-tagline').html(text);
	}

  function pagesInCategory(api, category, namespace) {
    return getAPI.bind(undefined, {
      api: api,
      params: {
        action: 'query',
        cmlimit: 'max',
        cmnamespace: namespace || 0,
        cmtitle: 'Category:' + category.replace(/Categor(�a|y):/i, ''),
        format: 'json',
        formatversion: 2,
        list: 'categorymembers'
      },
      continueKey: 'cmcontinue',
      transformItem: function(item) { return item.title; }
    });
  }

	function update() {
		var api = new mw.Api();

		pagesInCategory(api, 'Pok�mon por regiones', 14)().then(function(regions) {
				setTagline('Obteniendo Pok�mon de las siguientes regiones: ' + regions.join(', ').replace(/Categor�a:Pok�mon de /g, ''));
			var promises = [];
			for ( var i = 0; i < regions.length; i++ ) {
				var region = regions[i];
				var pages = pagesInCategory(api, region);
				promises.push(pages);
			}
			clearQueue(promises).then(function(titles) {
				var promises = [];
				while (titles.length) {
					var revisions = getAPI.bind(undefined, {
						api: api,
						params: {
							action: 'query',
							format: 'json',
							formatversion: 2,
							prop: 'revisions',
							rvprop: 'content',
							rvslots: '*',
							titles: titles.splice(0, 50)
						},
						listname: 'pages',
						transformItem: function(item) {
							var content = item.revisions[0].slots.main.content;
							var data = {
								name: item.title,
								number: content.match(/n�mero *= *#?(\d+)/),
								type1: content.match(/tipo-primario *= *([a-z�����]+)/i),
								type2: content.match(/tipo-secundario *= *([a-z�����]+)/i)
							};
							if (data.number) data.number = data.number.at(1);
							if (data.type1) data.type1 = data.type1.at(1);
							if (data.type2) data.type2 = data.type2.at(1);
							data.name = data.name.replace( /'/g, '\\\'' );

							var result = [ '\t[\'', data.name, '\'] = {\n\t\t[\'n�mero\'] = \'', data.number,
								'\',\n\t\ttipos = {\n\t\t\t\'', data.type1, '\',\n\t\t\t', data.type2 ? '\'' + data.type2 + '\'' : 'nil',
								'\n\t\t},\n\t},' ];
							return result.join('');
						}
					});
					promises.push(revisions);
				}

				return clearQueue(promises);
			}).then(function(revs) {
				setTagline('Obtenida la informaci�n de todos los Pok�mon. Guardando...');
				var lua = 'return {\n' + revs.sort().join('\n') + '\n}';
				api.postWithToken('csrf', {
					action: 'edit',
					summary: 'Actualizaci�n autom�tica de datos',
					text: lua,
					title: 'Module:Pok�mon/datos'
				}).then(function() {
					setTagline('');
					new window.dev.banners.BannerNotification('Actualizaci�n de datos completada.', 'confirm').show();
				});
			});
		});
	}

	mw.loader.using(['mediawiki.api']).then(function() {
		mw.hook('dev.ct').add(function(customTools) {
			mw.hook('dev.banners').add(function() {
				customTools({
					click: update,
					placement: 'page-actions-dropdown',
					position: -1,
					text: 'Actualizar m�dulo'
				});
			});
		});
	});

	importArticle({
	    type: 'script',
		articles: [
			'u:dev:MediaWiki:BannerNotification.js',
			'u:dev:MediaWiki:CustomTools.js'
		]
	});
}());