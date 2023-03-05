/** <pre>
 * @name: Wall Notice International
 * @description: Display a "Message Wall Welcome"-like notice in all message walls recommending using Discussions before leaving a message to a specific user. **Only for community centrals to use.**
 */

;(function() {
	var centrals = [
		'https://community.fandom.com', // en, de, it, ru
		'https://comunidad.fandom.com', // es
		'https://comunidade.fandom.com', // pt
		'https://communaute.fandom.com', // fr
		'https://spolecznosc.fandom.com' // pl
	];
	var conf = mw.config.get([ 'wgServer', 'wgScript', 'wgCanonicalNamespace' ]);
	if (conf.wgCanonicalNamespace !== 'Message_Wall' || !centrals.includes(conf.wgServer)) return;

	$.when(findContainer('#MessageWall')).then(function($container) {
		mw.hook('dev.i18n').add(function(i18n) {
			i18n.loadMessages('Wall_Notice_International').then(function(i18n) {
				var discussions = conf.wgScript.replace('index.php', 'f');
				$container.prepend($('<div>', {
					css: {
						'border-bottom': '2px solid grey',
						'margin-bottom': '1em',
						'padding-bottom': '1em',
						'text-align': 'center'
					},
					id: 'MessageWallNotice',
					html: i18n.msg('message', discussions).plain()
				}));
			});
		});
	});

	// https://dev.fandom.com/wiki/MediaWiki:AddUserRightsTag/code.js
	function findContainer(identifier, options) {
		var promise = $.Deferred();
		var interval = setInterval(function() {
			var $element = $(identifier);
			if ($element.length) {
				clearInterval(interval);
				promise.resolve($element, options);
			}
		}, 300);
		return promise;
	}

	importArticle({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:I18n-js/code.js'
		]
	});
}());