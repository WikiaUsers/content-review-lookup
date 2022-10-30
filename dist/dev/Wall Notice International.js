/** <pre>
 * @name: Wall Notice International
 * @description: Display a "Message Wall Welcome"-like notice in all message walls recommending using Discussions before leaving a message to a specific user. **Only for community centrals to use.**
 */

;(function() {
	var centrals = [
		'https://community.fandom.com', // en, de, it
		'https://comunidad.fandom.com', // es
		'https://comunidade.fandom.com', // pt
		'https://communaute.fandom.com', // fr
		'https://spolecznosc.fandom.com' // pl
	];
	var conf = mw.config.get([ 'wgServer', 'wgScript' ]);
	if (!$('#MessageWall').length || !centrals.includes(conf.wgServer)) return;

	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('Wall_Notice_International').then(function(i18n) {
			var discussions = conf.wgScript.replace('index.php', 'f');
			$('#MessageWall').prepend($('<div>', {
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

	importArticle({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:I18n-js/code.js'
		]
	});
}());