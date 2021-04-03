/**
 * „CVU” zapożyczony z RuneScape Wiki
 * Oryginał na stronie https://runescape.fandom.com/wiki/MediaWiki:Cvu.js
 *
 * Skrypt odpowiedzialny za formularz zgłoszeniowy na stronie Gothicpedia:Wandalizmy
 * @todo Przepisać na nowo z użyciem OOUI celem lepszego doświadczenia na UCP
 * @todo Zamienić jQuery na vanilla JS
 */
(function($, mw) {
	var config = mw.config.get([
		'wgPageName',
		'wgRestrictionEdit',
		'wgUserGroups',
		'wgVersion'
	]);

	const isUCP = config.wgVersion !== '1.19.24';
	const token = mw.user.tokens.get(isUCP ? 'csrfToken' : 'editToken');

	function showSuccess() {
		alert('Dziękujemy za zgłoszenie tego użytkownika! Strona się teraz przeładuje.');
		location.reload();
	}

	function showError(msg) {
		alert(msg);
		$('#cvuSubmit').removeAttr('disabled').val('Submit');
	}

	function callAPI(data, method, callback) {
		data.format = 'json';
		$.ajax({
			data: data,
			dataType: 'json',
			url: mw.util.wikiScript('api'),
			type: method,
			success: function(response) {
				if (response.error) {
					showError('Błąd API: ' + response.error.info);
				} else {
					callback(response);
				}
			},
			error: function(xhr, error) {
				showError('Błąd AJAX: ' + error);
			}
		});
	}

	function cvuSubmit() {
		const editor = $.trim($('#cvuEditor').val());

		$('#cvuSubmit').attr('disabled', 'disabled').val('Proszę czekać...');

		if (editor === '') {
			showError('Wpisz nick użytkownika.');
			return false;
		}

		callAPI({
			'action': 'query',
			'prop': 'info|revisions',
			'titles': config.wgPageName,
			'rvprop': 'content',
			'rvlimit': '1',
			'indexpageids': 'true',
		}, 'GET', function(response) {
			const page = response.query.pages[response.query.pageids[0]];
			const template = '\{\{cvuid\|zgłoś wandala\}\}';
			
			var content = page.revisions[0]['*'];

			if (content.match(template) === null) showError('An error occurred.');
			content = content.replace(template, '{' + '{cvuid|' + editor + '}' + '}');

			callAPI({
				'minor': 'yes',
				'summary': 'Zgłoszono nowego użytkownika: [' + '[Specjalna:Wkład/' + editor + '|' + editor + ']' + ']',
				'action': 'edit',
				'title': config.wgPageName,
				'basetimestamp': page.revisions[0].timestamp,
				'startimestamp': page.starttimestamp,
				'token': token,
				'text': content
			}, 'POST', function(response) {
				if (response.edit.result === 'Success')
					showSuccess();
				else
					showError('Wystąpił błąd.');
			});
		});
		return false;
	}

	if (config.wgPageName === 'Gothicpedia:Wandalizmy') {
		var $div = $('#cvu_guide');
		var $form = $('<form />');

		const ppLink = 'Ze względu na akty wandalizmu, strona ta została zabezpieczona przed edycją';

		if (
			$.inArray('sysop', config.wgRestrictionEdit) > -1 &&
			$.inArray('sysop', config.wgUserGroups) === -1
		) {
			$form.append(ppLink + ' Skontaktuj się z administratorem, by zaktualizować jej treść.');
		}
		else if (
			$.inArray('autoconfirmed', config.wgRestrictionEdit) > -1 &&
			$.inArray('autoconfirmed', config.wgUserGroups) === -1
		) {
			$form.append(ppLink + ' Proszę,  <a href="' + mw.util.getUrl('Specjalna:Zaloguj', { returnto: config.wgPageName }) + '">zaloguj się</a> by móc edytować tę stronę.');
		}
		else {
			$form.submit(cvuSubmit);
			$form.append($('<h4 />').text('Zgłoś wandala:'));

			var $p1 = $('<p />').append('Możesz zgłosić wandala wprowadzając jego nazwę lub IP poniżej.');
			$form.append($p1);

			var $p2 = $('<p />');
			$p2.append($('<label />').attr({
				'for': 'cvuEditor'
			}).text('Numer IP lub nick użytkownika:'));
			$p2.append($('<input />').attr({
				'id': 'cvuEditor',
				'type': 'text',
				'size': 11
			}));
			$p2.append($('<input />').css({
				'margin': '0 3px 0 3px'
			}).attr({
				'id': 'cvuSubmit',
				'type': 'submit'
			}).val('Wyślij zgłoszenie'));
			$form.append($p2);
		}

		if ($div !== null) $div.empty().append($form);

		$('span').each(function() {
			const name = this.className;
			if (
				this.id === 'cvu_remove' &&
				this.className !== 'zgłoś wandala'
			) {
				var $img1 = $('<img>').attr('src', 'https://images.wikia.nocookie.net/runescape/images/f/fb/Yes_check.svg');
				$img1.attr('width', '15').attr('height', '16').attr('title', 'Usuń to zgłoszenie, gdy użytkownik jest już zablokowany').css('cursor', 'pointer');
				$img1.click(function() {
					removeUser(name.replace(/ /g, '_').replace(/-/g, '.'), 'blocked');
				});

				var $img2 = $('<img>').attr('src', 'https://images.wikia.nocookie.net/runescape/images/a/a2/X_mark.svg');
				$img2.attr('width', '15').attr('height', '16').attr('title', 'Zignoruj to zgłoszenie').css('cursor', 'pointer');
				$img2.click(function() {
					removeUser(name.replace(/ /g, '_').replace(/-/g, '.'), '');
				});

				$(this).append('&nbsp;').append($img1).append($img2);
			}
		});
	}

	function removeUser(user, state) {
		const template = '\{\{cvuid\|' + user.split('_').join(' ') + '(\|.*?)?\}\}';

		callAPI({
			'action': 'query',
			'prop': 'info|revisions',
			'titles': config.wgPageName,
			'rvprop': 'content',
			'rvlimit': '1',
			'indexpageids': 'true'
		}, 'GET', function(response) {
			const page = response.query.pages[response.query.pageids[0]];
			var content = page.revisions[0]['*'];

			if (content.match(template) === null) {
				showError('Wystąpił błąd');
				return;
			}

			content = content.replace('{' + '{cvuid|' + user.split('_').join(' '), '{' + '{cvuid|zgłoś wandala}' + '}');
			content = content.replace(/\}\}(\|.*?)?\}\}/, '}' + '}');

			var summary = '[' + '[Specjalna:Wkład/' + user + '|' + user.split('_').join(' ') + ']' + ']';
			if (state === 'blocked') {
				summary += ' został zablokowany.';
			} else {
				summary += ' nie został zablokowany.';
			}

			callAPI({
				'minor': 'yes',
				'summary': summary,
				'action': 'edit',
				'title': config.wgPageName,
				'basetimestamp': page.revisions[0].timestamp,
				'startimestamp': page.starttimestamp,
				'token': token,
				'text': content
			}, 'POST', function(response) {
				if (response.edit.result !== 'Success') {
					showError('Wystąpił błąd podczas publikowania zmiany.');
				} else {
					location.reload();
				}
			});
		});
	}
})(jQuery, mediaWiki);