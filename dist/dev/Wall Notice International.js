/** <pre>
 * @name: Wall Notice International
 * @description: Display a "Message Wall Welcome"-like notice in all message walls recommending using Discussions before leaving a message to a specific user. **Only for community centrals to use.** Optionally,can set a custom message in MediaWiki:Custom-wall-notice.
 */

;(function() {
	window.dev = window.dev || {};
	if (window.dev.wni) {
		return;
	}
	window.dev.wni = true;

	var centrals = [
		'https://community.fandom.com', // en, de, it, ru
		'https://comunidad.fandom.com', // es
		'https://comunidade.fandom.com', // pt
		'https://communaute.fandom.com', // fr
		'https://spolecznosc.fandom.com' // pl
	];
	var conf = mw.config.get([ 'wgServer', 'wgScript', 'wgCanonicalNamespace' ]);
	if (conf.wgCanonicalNamespace !== 'Message_Wall' || !centrals.includes(conf.wgServer)) return;

	function init() {
		var $container;
		var content;

		findContainer('#MessageWall')
			.then(function(container) {
				$container = container;
				return loadMessage();
			})
			.then(function(text) {
				content = text;
				createNotice($container, content);
			});
	}

	function loadMessage() {
		var promise = $.Deferred();

		var api = new mw.Api();
		api.get({
			action: 'parse',
			format: 'json',
			formatversion: 2,
			maxage: 300,
			page: 'MediaWiki:Custom-wall-notice'
		}).then(function(result) {
			promise.resolve(result.parse.text);
		}).catch(function() {
			mw.hook('dev.i18n').add(function(i18n) {
				i18n.loadMessages('Wall_Notice_International').then(function(i18n) {
					var discussions = conf.wgScript.replace('index.php', 'f');
					promise.resolve(i18n.msg('message', discussions).plain());
				});
			});
		});

		return promise;
	}

	function createNotice($container, content) {
		$container.prepend($('<div>', {
			id: 'MessageWallNotice',
			html: content
		}));
	}

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

	init();

	importArticle({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:I18n-js/code.js'
		]
	});
	importArticle( {
		type: 'style',
		article: 'u:dev:MediaWiki:Wall_Notice_International.css'
	} );
}());