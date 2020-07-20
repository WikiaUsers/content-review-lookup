/**
 * !block
 * Allows for users with block rights to block users in the Special:Chat with a textbox command
 * @Author Mario&LuigiBowser'sInsideStory
*/
 
;(function($, mw) {
	if (mw.config.get('wgCanonicalSpecialPageName') !== "Chat") return;

	var i18n;

	// call API
	function Api(method, data, callback) {
		data.format = 'json';
		$.ajax({
			type: method,
			data: data,
			dataType: 'json',
			url: wgScriptPath + '/api.php',
			success: function(response) {
				callback(response);
			},
			error: function() {
				mainRoom.model.chats.add(new models.InlineAlert({ text: i18n.msg('api-error').plain() }));
			}
		});
	}

	function init(i18np) {
		i18n = i18np;
		i18n.useUserLang();

		$(document).on('keydown', 'textarea[name="message"]', function(e) {
			var $value = $(this).val();
			if (e.which === 13 && $value.substring(0, 6) === '!block') {
				if (/sysop|helper|vstf|bureaucrat|global-discussion-moderator|wiki-manager/m.test(mw.config.get('wgUserGroups').join(' ')) === false) {
					$(this).val('');
					mainRoom.model.chats.add(new models.InlineAlert({ text: i18n.msg('no-perms').plain() }));
					return false;
				}
				var textData = $value.slice(7).split(' | ');
				if (textData[0] === mw.config.get('wgUserName')) {
					$(this).val('');
					mainRoom.model.chats.add(new models.InlineAlert({ text: i18n.msg('self-block').plain() }));
					return false;
				}
				var config = {
					action: 'block',
					user: textData[0],
					reason: textData[1],
					expiry: textData[2],
					token: mw.user.tokens.get('editToken')
				};
				if (textData.indexOf('disable talk page') === -1) config.allowusertalk = 1;

				// For whatever reason you may want to leave the user's IP unblocked and not reblocking any existing ones.
				if (textData.indexOf('disable autoblock') === -1) config.autoblock = 1;
				if (textData.indexOf('disable reblock') === -1) config.reblock = 1;
				Api('POST', config, function(d) {
					if (!d.error) {

						// If that user is in the chat
						if (mainRoom.model.users.findByName(textData[0])) {
							mainRoom.kick({ name: textData[0] });
						}
						mainRoom.model.chats.add(new models.InlineAlert({ text: i18n.msg('success', textData[0]).plain() }));
					}
					else mainRoom.model.chats.add(new models.InlineAlert({ text: i18n.msg('error', textData[0], d.error.info).plain() }));
				});
				$(this).val('');
				return false;
			}
		});
	}

	mw.hook('dev.i18n').add(function(i18np) {
		i18np.loadMessages('!block').then(init);
	});

	importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
})(jQuery, mediaWiki);