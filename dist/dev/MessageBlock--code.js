mw.loader.using('mediawiki.api', function() {
	if (
		window.MessageBlockLoaded ||
		mw.config.get('wgCanonicalSpecialPageName') !== 'Block'
	) return;
	window.MessageBlockLoaded = true;
 
	var api = new mw.Api(),
		i18n,
		useTalk,
		preloads = 2,
		config;
 
	function preload() {
		if (--preloads === 0) {
			window.dev.i18n.loadMessages('MessageBlock').then(init);
		}
	}
 
	function init(i18nData) {
		i18n = i18nData;
		
		config = $.extend({
			title: i18n.msg('title').escape(),
			message: i18n.msg('message').escape()
		}, window.MessageBlock);
 
		$('#mw-htmlform-options').append('<div class="mw-htmlform-field-HTMLCheckField oo-ui-layout oo-ui-labelElement oo-ui-fieldLayout oo-ui-fieldLayout-align-inline" data-ooui=""><div class="oo-ui-fieldLayout-body"><span class="oo-ui-fieldLayout-field"><span id="mw-input-wpMessage" class="oo-ui-widget oo-ui-widget-enabled oo-ui-inputWidget oo-ui-checkboxInputWidget" aria-disabled="false" data-ooui=""><input type="checkbox" tabindex="0" aria-disabled="false" name="wpMessage" value="1" class="oo-ui-inputWidget-input" id="mw-input-wpMessage"><span class="oo-ui-checkboxInputWidget-checkIcon oo-ui-widget oo-ui-widget-enabled oo-ui-iconElement oo-ui-iconElement-icon oo-ui-icon-check oo-ui-labelElement-invisible oo-ui-iconWidget" aria-disabled="false"></span></span></span><span class="oo-ui-fieldLayout-header"><label class="oo-ui-labelElement-label">' + i18n.msg('button').escape() + '</label></span></div></div>');
		$('.mw-htmlform-submit .oo-ui-buttonElement-button').click(click);
 
		if (config.autocheck) {
			$('input#mw-input-wpMessage').attr('checked', 'checked');
		}
	}
 
	function click(event) {
		if (
			!$('.oo-ui-inputWidget-input[id="mw-input-wpMessage"]').is(':checked')
		) return;
 
		event.preventDefault();
 
		var messages, page;
 
		var durationBox = $('#mw-input-wpExpiry .oo-ui-inputWidget-input'),
			durationDropdown = $('#mw-input-wpExpiry .oo-ui-dropdownWidget-handle .oo-ui-labelElement-label');

		var reasonBox = $('#mw-input-wpReason .oo-ui-textInputWidget-type-text .oo-ui-inputWidget-input'),
			reasonDropdown = $('#mw-input-wpReason-select .oo-ui-dropdownWidget-handle .oo-ui-labelElement-label');

		var duration = durationBox.is(':disabled') ? durationDropdown.text() : durationBox.val(),
			blockmessage = prompt(
				i18n.msg('blockreason').plain(), 
				reasonDropdown.text() + (reasonBox.val() ? ': ' + reasonBox.val() : '')
			);

		messages = config.message
			.replace('$1', blockmessage)
			.replace('$2', duration);
		page = $('input#ooui-php-1').val();
 
		if (useTalk) {
			api.newSection('User_talk:' + page, config.title, messages).then(callback);
		} else {
			var cityId = mw.config.get('wgCityId');

			api.get({
				action: 'query',
				list: 'users',
				ususers: page
			}).then(function(data) {
				var users = data.query.users;
				if (
					!users.length
				) return alert('No users found with this name.');

				$.ajax({
					type: 'POST',
					url: mw.util.wikiScript('wikia') + '?controller=Fandom%5CMessageWall%5CMessageWall&method=createThread&format=json',
					data: {
						token: mw.user.tokens.get('csrfToken'),
						wallOwnerId: users[0].userid,
						title: config.title,
						rawContent: messages,
						jsonModel: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"' + messages + '"}]}]}',
						attachments: '{"contentImages": [], "openGraphs": [], "atMentions": []}'
					},
					xhrFields: {
						withCredentials: true 
					}
				}).then(callback, error);
			});
		}
	}
	
	function error(jqXHR, textStatus, errorThrown) {
		alert('Error: ' + textStatus);
	}
 
	function callback() {
		alert(i18n.msg('success').plain());
		$('.mw-htmlform-ooui-wrapper > form').trigger('submit');
	}
 
	mw.hook('dev.i18n').add(preload);
	mw.hook('dev.enablewallext').add(function(wgMessageWallsExist) {
		wgMessageWallsExist.then(
			function () { useTalk = false; preload(); },
			function () { useTalk = true; preload(); }
		);
	});
 
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:I18n-js/code.js',
			'u:dev:MediaWiki:WgMessageWallsExist.js'
		]
	});
});