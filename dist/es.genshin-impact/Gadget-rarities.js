;(function() {
	'use strict';

	var wgPageName = mw.config.get('wgPageName');
	if (wgPageName !== 'Módulo:Rarezas') return;


	function pagesInCategory(api, category, result, params) {
		setTagline('<b>Obteniendo datos de la categoría:</b> ' + category);
		var promise = $.Deferred();
		params = params || {
			action: 'query',
			cmlimit: 'max',
			cmnamespace: 0,
			cmtitle: 'Category:' + category,
			format: 'json',
			formatversion: 2,
			list: 'categorymembers'
		};
		api.get(params).then(function(req) {
			req.query.categorymembers.forEach(function(item) {
				result.push(item.title);
			});

			if (req.continue && req.continue.cmcontinue) {
				params.cmcontinue = req.continue.cmcontinue;
				promise.resolve(pagesInCategory(api, category, result, params));
			} else {
				promise.resolve();
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

	function update() {
		var api = new mw.Api();
		var itemTypes = [ 'Armas', 'Comidas', 'Objetos', 'Personajes' ];
		var perRarity = [ [], [], [], [], [] ];
		var promises = [];
		for (var i = 0; i < itemTypes.length; i++) {
			var itemType = itemTypes[i];
			for (var rarity = 1; rarity <= 5; rarity++) {
				var items = perRarity[rarity - 1];
				var stars;
				if (rarity === 1) {
					stars = '1 estrella';
				} else {
					stars = rarity + ' estrellas';
				}
				var fetchPages = pagesInCategory.bind(undefined, api, itemType + ' de ' + stars, items);
				promises.push(fetchPages);
			}
		}

		clearQueue(promises).then(function() {
			var data = perRarity.map(function(raritySet, rarityIndex) {
				var rarity = rarityIndex + 1;
				return raritySet.sort().map(function(item) {
					var name = item.replace( '\'', '\\\'' );
					return '  [\'' + name + '\'] = ' + rarity + ',';
				}).join('\n');
			}).flat().join('\n');
			var table = 'return {\n' + data + '\n}';
			setTagline('Actualizando datos...');
			api.postWithToken('csrf', {
				action: 'edit',
				minor: true,
				summary: 'Actualización automática de rarezas',
				text: table,
				title: 'Module:Rarezas'
			}).then(function() {
				location.reload();
			});
		});
	}

	mw.loader.using(['mediawiki.api']).then(function() {
		var $li = $('<li>');
		$li.append($('<a>', {
			text: 'Actualizar rarezas'
		}));
		$li.appendTo('#p-cactions .wds-list');
		$li.click(update);
	});
}());