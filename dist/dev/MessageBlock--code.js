mw.loader.using('mediawiki.api', function() {
	'use strict';
 
	if (
		window.MessageBlockLoaded ||
		mw.config.get('wgCanonicalSpecialPageName') !== 'Block'
	) return;
	window.MessageBlockLoaded = true;
 
	var api = new mw.Api(),
		i18n,
		useTalk,
		preloads = 2,
		isUCP = mw.config.get('wgVersion') !== '1.19.24',
		config = $.extend({
			title: 'Block',
			message: 'You have received a $2 block for the reason of $1'
		}, window.MessageBlock);
 
	function preload() {
		if (--preloads === 0) {
			window.dev.i18n.loadMessages('MessageBlock').then(init);
		}
	}
 
	function init(i18nData) {
		i18n = i18nData;
 
		if (isUCP) {
			$('#mw-htmlform-options').append('<div class="mw-htmlform-field-HTMLCheckField oo-ui-layout oo-ui-labelElement oo-ui-fieldLayout oo-ui-fieldLayout-align-inline" data-ooui=""><div class="oo-ui-fieldLayout-body"><span class="oo-ui-fieldLayout-field"><span id="mw-input-wpMessage" class="oo-ui-widget oo-ui-widget-enabled oo-ui-inputWidget oo-ui-checkboxInputWidget" aria-disabled="false" data-ooui=""><input type="checkbox" tabindex="0" aria-disabled="false" name="wpMessage" value="1" class="oo-ui-inputWidget-input" id="mw-input-wpMessage"><span class="oo-ui-checkboxInputWidget-checkIcon oo-ui-widget oo-ui-widget-enabled oo-ui-iconElement oo-ui-iconElement-icon oo-ui-icon-check oo-ui-labelElement-invisible oo-ui-iconWidget" aria-disabled="false"></span></span></span><span class="oo-ui-fieldLayout-header"><label class="oo-ui-labelElement-label">' + i18n.msg('button').escape() + '</label></span></div></div>');
			$('.mw-htmlform-submit .oo-ui-buttonElement-button').click(click);
		} else {
			$('tbody').append('<tr class="mw-htmlform-field-HTMLCheckField"><td class="mw-label"><label for="mw-input-wpMessage">&#160;</label></td><td class="mw-input"><input name="wpMessage" type="checkbox" value="1" id="mw-input-wpMessage" />&#160;<label for="mw-input-wpMessage">' + i18n.msg('button').escape() + '</label></td></tr>');
			$('.mw-htmlform-submit').click(click);
		}
 
		if (config.autocheck) {
			$('input#mw-input-wpMessage').attr('checked', 'checked');
		}
	}
 
	function click(event) {
		if (
			!$(isUCP ? '.oo-ui-inputWidget-input[id="mw-input-wpMessage"]' : '#mw-input-wpMessage').is(':checked')
		) return;
 
		event.preventDefault();
 
		var messages, page;
 
		if (isUCP) {
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
		} else {
			var duration = $('#mw-input-wpExpiry-other').css('display') === 'none' ?
					$('#mw-input-wpExpiry option:selected').text() :
					$('#mw-input-wpExpiry-other').val(),
				blockmessage = prompt(i18n.msg('blockreason').plain(), $('#mw-input-wpReason option:selected').text() +
					($('#mw-input-wpReason-other').val() ?
						': ' + $('#mw-input-wpReason-other').val() :
						''));
 
			messages = config.message
				.replace('$1', blockmessage)
				.replace('$2', duration);
			page = $('#mw-bi-target').val();
		}
 
		if (useTalk) {
			if (isUCP) {
				api.newSection('User_talk:' + page, config.title, messages).then(callback);
			} else {
				api.post({
					action: 'edit',
					section: 'new',
					title: 'User_talk:' + page,
					summary: config.title,
					text: messages,
					token: mw.user.tokens.get('editToken')
				}).then(callback, error);
			}
		} else {
			if (isUCP) {
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
							token: mw.user.tokens.get('editToken'),
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
			} else {
				$.ajax({
					type: 'POST',
					url: mw.util.wikiScript('wikia') + '?controller=WallExternal&method=postNewMessage&format=json',
					data: {
						pagenamespace: 1200,
						pagetitle: page,
						messagetitle: config.title,
						body: messages,
						token: mw.user.tokens.get('editToken')
					},
					xhrFields: {
						withCredentials: true 
					}
				}).then(callback, error);
			}
		}
	}
	
	function error(jqXHR, textStatus, errorThrown) {
		alert('Error: ' + textStatus);
	}
 
	function callback() {
		alert(i18n.msg('success').plain());
		$((isUCP ? '.mw-htmlform-ooui-wrapper' : '#mw-content-text') + ' > form').trigger('submit');
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