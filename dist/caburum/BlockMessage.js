/**
 * Name:		BlockMessage
 * Version:		v1.0
 * Author:		Caburum
 * Description:	Sends details about a user's block to their message wall
 * Based on:	[[w:c:dev:MessageBlock]]
**/

mw.loader.using('mediawiki.api', function() {
	if (window.BlockMessageLoaded || mw.config.get('wgCanonicalSpecialPageName') !== 'Block') return;
	window.BlockMessageLoaded = true;

	var api = new mw.Api(),
		i18n,
		useWall,
		preloads = 2,
		config = $.extend({
				noAutoCheck: false
			}, window.MessageBlock);

	function preload() {
		if (--preloads === 0) {
			window.dev.i18n.loadMessages('u:caburum:MediaWiki:Custom-BlockMessage/i18n.json').then(init);
		}
	}

	function init(i18nData) {
		i18n = i18nData;
 
		$('#mw-htmlform-options').append(
			generateCheckbox('buttonEnable', 'BlockMessage-enable'),
			generateCheckbox('buttonToU', 'BlockMessage-tou')
		);

		if (!config.noAutoCheck) {
			$('input#mw-input-BlockMessage-enable').attr('checked', 'checked');
		}

		$('.mw-htmlform-submit .oo-ui-buttonElement-button').click(click);
	}

	function click(event) {
		if (!$('.oo-ui-inputWidget-input[id="mw-input-BlockMessage-enable"]').is(':checked')) return;

		event.preventDefault();
		
		var durationBox = $('#mw-input-wpExpiry .oo-ui-inputWidget-input'),
			durationDropdown = $('#mw-input-wpExpiry .oo-ui-dropdownWidget-handle .oo-ui-labelElement-label'),
			reasonBox = $('#mw-input-wpReason .oo-ui-textInputWidget-type-text .oo-ui-inputWidget-input'),
			reasonDropdown = $('#mw-input-wpReason-select .oo-ui-dropdownWidget-handle .oo-ui-labelElement-label');

		var duration = durationBox.is(':disabled') ? durationDropdown.text() : durationBox.val(),
			reason = reasonDropdown.text() + (reasonBox.val() ? ': ' + reasonBox.val() : ''),
			user = $('input[name="wpTarget"]').val(),
			forToU = $('.oo-ui-inputWidget-input[id="mw-input-BlockMessage-tou"]').is(':checked');

		if (useWall) {
			var cityId = mw.config.get('wgCityId');
			
			api.get({
				action: 'query',
				list: 'users',
				ususers: user
			}).then(function(data) {
				var users = data.query.users;
				if (!users.length) return alert('No users found with this name.');
				
				$.ajax({
					type: 'POST',
					url: mw.util.wikiScript('wikia') + '?controller=Fandom%5CMessageWall%5CMessageWall&method=createThread&format=json',
					data: {
						token: mw.user.tokens.get('editToken'),
						wallOwnerId: users[0].userid,
						title: i18n.msg('messageTitle').escape(),
						rawContent: 'test',
						jsonModel: '{"type":"doc","content":' + generatePayload(duration, reason, forToU) + '}]}',
						attachments: '{"contentImages": [], "openGraphs": [], "atMentions": []}'
					},
					xhrFields: {
						withCredentials: true 
					}
				}).then(callback, error);
			});
		} else {
			// Talk pages not supported yet
		}
	}

	function error(jqXHR, textStatus, errorThrown) {
		alert('Error: ' + textStatus);
	}

	function callback() {
		alert('Success');
		$('.mw-htmlform-ooui-wrapper > form').trigger('submit');
	}

	function generateCheckbox(messageName, buttonID) {
		return '<div class="mw-htmlform-field-HTMLCheckField oo-ui-layout oo-ui-labelElement oo-ui-fieldLayout oo-ui-fieldLayout-align-inline" data-ooui>' +
			'<div class="oo-ui-fieldLayout-body">' +
				'<span class="oo-ui-fieldLayout-field">' +
					'<span id="mw-input-' + buttonID +'" class="oo-ui-widget oo-ui-widget-enabled oo-ui-inputWidget oo-ui-checkboxInputWidget" aria-disabled="false" data-ooui>' +
						'<input type="checkbox" tabindex="0" aria-disabled="false" name="' + buttonID +'" value="1" class="oo-ui-inputWidget-input" id="mw-input-' + buttonID +'">' +
						'<span class="oo-ui-checkboxInputWidget-checkIcon oo-ui-widget oo-ui-widget-enabled oo-ui-iconElement oo-ui-iconElement-icon oo-ui-icon-check oo-ui-labelElement-invisible oo-ui-iconWidget" aria-disabled="false"></span>' +
					'</span>' +
				'</span>' +
				'<span class="oo-ui-fieldLayout-header">' +
					'<label class="oo-ui-labelElement-label">' + i18n.msg(messageName).escape() + '</label>' +
				'</span>' +
			'</div>' +
		'</div>';
	}
	
	function generatePayload(duration, reason, forToU) {
		var payload = [
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: reason
					}
				]
			}
		];
		return JSON.stringify(payload);
	}

	mw.hook('dev.i18n').add(preload);
	mw.hook('dev.enablewallext').add(function(wgMessageWallsExist) {
		wgMessageWallsExist.then(
			function () { useWall = true; preload(); },
			function () { useWall = false; preload(); }
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