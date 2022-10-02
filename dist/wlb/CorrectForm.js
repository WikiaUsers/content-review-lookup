/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adds a pop up modal form for wlb.wikia.com
@ License: CC-BY-NC-SA
@ License Jurisdiction: International
*/
 
;(function($, mw) {
	'use strict';

	// Variables for later on
	// Keep these in an object for organization
	var config = mw.config.get([
			'wgPageName',
			'wgUserLanguage'
		]),
		signature = '~~' + '~~',
		$modal,
		showCustomModal,
		msg,
		preloads = 2;

	if (config.wgPageName !== 'Correct:Requests') return;

	var languages = {
		EN: 'en - English',
		AR: 'ar - العربية',
		BE: 'be - Беларуская',
		BG: 'bg - Български',
		BN: 'bn - বাংলা',
		BS: 'bs - Bosanski',
		CA: 'ca - Català',
		CS: 'cs - Česky',
		CY: 'cy - Cymraeg',
		DA: 'da - Dansk',
		DE: 'de - Deutsch',
		EL: 'el - Ελληνικά',
		EO: 'eo - Esperanto',
		ES: 'es - Español',
		ET: 'et - Eesti',
		EU: 'eu - Euskara',
		FA: 'fa - فارسی',
		FI: 'fi - Suomi',
		FR: 'fr - Français',
		GA: 'ga - Gaeilge',
		GD: 'gd - Gàidhlig',
		GL: 'gl - Galego',
		HE: 'he - עברית',
		HI: 'hi - हिन्दी',
		HR: 'hr - Hrvatski',
		HU: 'hu - Magyar',
		HY: 'hy - Հայերեն',
		ID: 'id - Bahasa Indonesia',
		IT: 'it - Italiano',
		JA: 'ja - 日本語', 
		JV: 'jv - Basa Jawa',
		KK: 'kk - Қазақша',
		KO: 'ko - 한국어',
		LA: 'la - Latina',
		LB: 'lb - Lëtzebuergesch',
		MI: 'mi - Māori',
		ML: 'ml - മലയാളം',
		MN: 'mn - Монгол',
		MO: 'mo - Молдовеняскэ',
		MS: 'ms - Malay',
		MT: 'mt - Malti',
		NL: 'nl - Nederlands',
		NN: 'nn - ‪Norsk (nynorsk)‬',
		NO: 'no - Norsk (bokmål)‬',
		NV: 'nv - Diné bizaad',
		OC: 'oc - Occitan',
		PL: 'pl - Polski',
		PT: 'pt - Português',
		RO: 'ro - Română',
		RU: 'ru - Русский',
		SK: 'sk - Slovenčina',
		SL: 'sl - Slovenščina',
		SR: 'sr - Српски / Srpski',
		SV: 'sv - Svenska',
		TG: 'tg - Тоҷикӣ',
		TK: 'tk - Türkmençe',
		TL: 'tl - Tagalog',
		TR: 'tr - Türkçe',
		UK: 'uk - Українська',
		UZ: 'uz - O\'zbek',
		VAL:'val - Valencià',
		VI: 'vi - Tiếng Việt',
		YI: 'yi - ייִדיש',
		ZH: 'zh - 中文',
		ZU: 'zu - isiZulu',
		XX: 'Other'
	};

	// This opens the form for the users to fill out
	function openFormCorrect() {
		var dropdown = '<select name="language" id="language" value="'+mw.config.get('wgUserLanguage').toUpperCase()+'">';
		dropdown += '<option value="" selected disabled>' + msg('form-language-choose').escape() + '</option>';
		for (var i in languages) {
			dropdown += '<option value="'+i+'">'+languages[i]+'</option>';
		}
		dropdown += '</select>';
		$modal = showCustomModal(msg('form-name').escape(), '<form class="WikiaForm" method="" name="" id="correctionForm"><fieldset><strong>' + msg('form-header').escape() + '</strong> <input id="request-header" maxlength="40" type="text" placeholder="' + msg('form-header-placeholder').escape() + '" style="width: 450px"/><br/><span id="request-header-number"></span><strong><br><span style="font-size:13pt">' + msg('form-information-header').escape() + '</span><span title="' + msg('form-information-request').escape() + '" style="cursor:help; float:right; font-size:12pt; border-bottom:1px dotted">[?]</span></strong><table border="0" id="mw-correct-table"><tr><td class="mw-label">' + msg('form-language-correct').escape() + '</td><td class="mw-input">' + dropdown + '</td></tr><br/><tr><td class="mw-label">' + msg('form-url').escape() + '</td><td class="mw-input">https://<input id="wiki-url" type="text" placeholder="' + msg('community-url').escape() + '" style="width:200px"/>.fandom.com</td></tr><tr><td class="mw-label">' + msg('form-items').escape() + ':</td><td class="mw-input"><textarea name="items" id="items" cols="50" rows="5" maxlength="200" placeholder="' + msg('form-items-placeholder').escape() + '"></textarea></td></tr><tr><td class="mw-label">' + msg('form-extrainfo').escape() + ':</td><td class="mw-input"><textarea name="extrainfo" id="extrainfo" cols="50" rows="4" maxlength="200" placeholder="' + msg('form-extrainfo-placeholder').escape() + '"></textarea></td></tr><tr><td class="mw-label">' + msg('form-signature').escape() + ':</td><td class="mw-input"><input id="signature-place" type="text" value="' + signature + '"style="width:200px"/></td></tr></table></fieldset></form>', {
			id: "requestWindow",
			width: 650,
			buttons: [{
				id: "cancel",
				message: "Cancel",
				handler: function () {
					cancelformCorrect();
				}
			}, {
				id: "submit",
				defaultButton: true,
				message: "Submit",
				handler: function () {
					submitformCorrect();
				}
			}]
		});
	}

	// Closes the form
	function cancelformCorrect() {
		showCustomModal.closeModal($modal);
	}

	// Submits the form
	function submitformCorrect() {
		var $form = $('#correctionForm'),
			header = $form.find('#request-header').val(),
			lang = $form.find('#language').val(),
			wikiurl = $form.find('#wiki-url').val(),
			items = $form.find('#items').val(),
			extrainfo = $form.find('#extrainfo').val(),
			signatureplace = $form.find('#signature-place').val(),
			page = '{{Correct header}}\n{{Correction|' + lang + '}}\n\n\'\'\'{{int:i18n-form-wiki}}\'\'\': [[w:c:' + wikiurl + ']]\n\n\'\'\'{{int:i18n-form-items}}\'\'\': ' + items + '\n\n\'\'\'{{int:i18n-form-extrainfo}}\'\'\': ' + extrainfo + '\n\n\'\'\'{{int:i18n-form-signature}}\'\'\': ' + signatureplace;
		// Making sure the header isnt blank, and a language has been filled in
		if (!header) {
			alert("Please title your request!");
			return;
		}
		if (!lang) {
			alert('Please select a language!');
			return;
		}

		// Ajax URL
		new mw.Api().postWithEditToken({
			action: 'edit',
			title: 'Correct:' + header + ' (' + lang + ')',
			text: page,
			summary: 'New+correct+request+(' + lang + ')'
		}).done(function (r) {
			cancelformCorrect();
			window.location.reload();
		});
	}

	function preload() {
		if (--preloads === 0) {
			window.dev.i18n.loadMessages('u:wlb:MediaWiki:Custom-form/i18n.json').done(function(i18no) {
				msg = i18no.msg;
				showCustomModal = window.dev.showCustomModal;
				var buttonappend = document.createElement('a');
					buttonappend.className = 'wds-button';
					buttonappend.textContent = msg('button').plain();
					buttonappend.addEventListener('click', openFormCorrect);
				document.getElementById("lang-" + config.wgUserLanguage.toUpperCase()).append(buttonappend);
			});
		}
	}

	mw.hook('dev.showCustomModal').add(preload);
	mw.hook('dev.i18n').add(preload);

	mw.loader.using( ['mediawiki.api'] ).then(function() {
		importArticles({
			type: 'script',
			article: 'u:dev:MediaWiki:I18n-js/code.js'
		});
		importArticles({
			type: 'script',
			article: 'u:dev:MediaWiki:ShowCustomModal.js'
		});
	});
})(window.jQuery, window.mediaWiki);
// </nowiki>