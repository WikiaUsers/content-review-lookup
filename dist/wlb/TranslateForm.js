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
	signature = '~~' + '~~';
	var $modal, showCustomModal;
	
	if (config.wgPageName !== 'Translate:Requests') return;
	
	var messages = {
	    get: function(name) {
	        var m = '(' + name + ')';
	        if (messages[config.wgUserLanguage.toUpperCase()] && messages[config.wgUserLanguage.toUpperCase()][name]) { m = messages[config.wgUserLanguage.toUpperCase()][name]; }
	        else if (typeof messages.EN[name] == 'string') { m = messages.EN[name]; }
	        return m;
	    },
	    add: function(code, obj) {
	        this[code.toUpperCase()] = $.extend({}, this[code.toUpperCase()], obj);
	    },
	    languages: {
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
	            XX: 'Other'/*,
	            XM: 'Multiple languages'*/
	        },
	    };
	
	
	// English / default
	messages.EN = {
	    button: "Create request",
	    "save-wiki": "Wiki",
	    "community-url": "community",
	    "form-name": "Request Form",
	    "form-header": "Title of the request:",
	    "form-header-placeholder": "Replace this with the title",
	    "form-language": "Translate from:",
	    "form-language-to": "To:",
	    "form-language-after": "",
	    "form-language-choose": "Choose language",
	    "form-url": "URL of the wiki:",
	    "form-information-header": "Information of your request:",
	    "form-information-request": "More information on how to file in your request can be found at the top of the page.",
	    "form-items": "Items",
	    "form-items-placeholder": "<items to translate (up to 3)>",
	    "form-extrainfo": "Extra information",
	    "form-extrainfo-placeholder": "<insert extra information (optional)>",
	    "form-signature": "Signature",
	};
	
	// Bosanian
	messages.BS = {
	    button: "U&#269;inite zahtjev",
	    "save-wiki": "Wiki",
	    "community-url": "bs.community",
	    "form-name": "Traziti formu",
	    "form-header": "Naslov zahtjeva:",
	    "form-header-placeholder": "Zamjeniti ovo sa naslovom",
	    "form-language": "Translate form:", // Needs translation
	    "form-language-to": "To:", // Needs translation
	    "form-language-after": "",
	    "form-language-choose": "Choose language", // Needs translation
	    "form-url": "Wiki's url:",
	    "form-information-header": "Informacije za tvoj zahtjev:",
	    "form-information-request": "Vise informacija za kako traziti dokumenat u tvoj zahtjev mozete naci gore na ekranu.",
	    "form-items": "Stvari",
	    "form-items-placeholder": "<stvari za prevodjenje (do 3)>",
	    "form-extrainfo": "Dodatne informacije",
	    "form-extrainfo-placeholder": "<dodatne informacije (optional)>",
	    "form-signature": "Signature", // Needs translation
	};
	
	// Catalan
	messages.CA = {
	    button: "Nova soŀlicitud",
	    "save-wiki": "Wiki",
	    "community-url": "ca.community",
	    "form-name": "Forma de petició",
	    "form-header": "Títol de la petició:",
	    "form-header-placeholder": "Reemplaça això amb el títol",
	    "form-language": "Traduir de:",
	    "form-language-to": "A:", 
	    "form-language-after": "",
	    "form-language-choose": "Tria idioma",
	    "form-url": "URL del wiki:",
	    "form-information-header": "Informació de la teva petició:",
	    "form-information-request": "Més informació de com fer la teva petició es pot trobar a la part superior de la pàgina.",
	    "form-items": "Items",
	    "form-items-placeholder": "<coses per traduir (fins a 3)>",
	    "form-extrainfo": "Informació extra",
	    "form-extrainfo-placeholder": "<afegeix informació extra (opcional)>",
	    "form-signature": "Signatura",
	};
	
	// German
	messages.DE = {
	    button: "Übersetzungsanfrage stellen",
	    "save-wiki": "Wiki",
	    "community-url": "de.community",
	    "form-name": "Formular",
	    "form-header": "Anfragentitel:",
	    "form-header-placeholder": "Geben Sie hier den Titel an",
	    "form-language": "Von:",
	    "form-language-to": "Nach:",
	    "form-language-after": " übersetzen",
	    "form-language-choose": "Sprache wählen",
	    "form-url": "Wiki-URL hier angeben:",
	    "form-information-header": "Informationen zur Anfrage:",
	    "form-information-request": "Weitere Informationen darüber, wie das Formular auszufüllen ist können auf der Seite &quot;Translate&quot; gefunden werden.",
	    "form-items": "Sätze/Artikel/Seiten",
	    "form-items-placeholder": "<Zu übersetzende Sätze/Artikel/Seiten (bis zu drei)>",
	    "form-extrainfo": "Weitere Informationen",
	    "form-extrainfo-placeholder": "<Weitere Informationen angeben (optional)>",
	    "form-signature": "Signatur",
	};
	
	// Spanish
	messages.ES = {
	    button: "Nueva solicitud",
	    "save-wiki": "Wiki",
	    "community-url": "es.community",
	    "form-name": "Formulario de solicitud de",
	    "form-header": "Título de la petición:",
	    "form-header-placeholder": "Sustituye esto con el título",
	    "form-language": "Traducir desde:",
	    "form-language-to": "A:",
	    "form-language-after": "",
	    "form-language-choose": "Elige idioma",
	    "form-url": "Url de la wiki:",
	    "form-information-header": "Información de tu petición:",
	    "form-information-request": "Más información sobre como hacer tu petición se puede encontrar en la parte superior de la página.",
	    "form-items": "Items",
	    "form-items-placeholder": "<cosas a traducir (hasta 3)>",
	    "form-extrainfo": "Información extra",
	    "form-extrainfo-placeholder": "<información extra>",
	    "form-signature": "Firma",
	};
	
	// French
	messages.FR = {
	    button: "Nouvelle requête",
	    "save-wiki": "Wiki",
	    "community-url": "fr.community",
	    "form-name": "Formulaire de demande",
	    "form-header": "Titre de votre requête:",
	    "form-header-placeholder": "Remplacez ceci avec votre titre",
	    "form-language": "Traduire de:",
	    "form-language-to": "À:",
	    "form-language-after": "",
	    "form-language-choose": "Choisir une langue",
	    "form-url": "L'URL du wiki:",
	    "form-information-header": "Information de vôtre requête:",
	    "form-information-request": "Plus d'information sur comment remplir votre requête ce retrouve en haut de cette page.",
	    "form-items": "Items",
	    "form-items-placeholder": "<items à traduire (jusqu'à 3)>",
	    "form-extrainfo": "Information suplémentaire",
	    "form-extrainfo-placeholder": "<insérez l'information suplémentaire ici (optionnel)>",
	    "form-signature": "Signature",
	};
	
	// Galician
	messages.GL = { 
	    button: "Nova solicitude",
	    "save-wiki": "Wiki",
	    "community-url": "gl.community",
	    "form-name": "Formulario de solicitude",
	    "form-header": "Título da solicitude:",
	    "form-header-placeholder": "Substitúe isto co título",
	    "form-language": "Traducir de:",
	    "form-language-to": "A:",
	    "form-language-after": "",
	    "form-language-choose": "Escolle o idioma",
	    "form-url": "Url da wiki:",
	    "form-information-header": "Información da túa solicitude:",
	    "form-information-request": "Máis información sobre como facer a túa solicitude pódense atopar na parte superior da páxina.",
	    "form-items": "Elementos",
	    "form-items-placeholder": "<cousas para traducir (ata wiki)>",
	    "form-extrainfo": "Información extra",
	    "form-extrainfo-placeholder": "<engade información extra (opcional)>",
	    "form-signature": "Firma",
	};
	
	// Italian
	messages.IT = {
	    button: "Crea nuova richiesta",
	    "community-url": "it.community",
	    "form-name": "Forma di Richiesta",
	    "form-header": "Titolo della richiesta:",
	    "form-header-placeholder": "Rimpiazzare questa linea con il titolo",
	    "form-language": "Traduci da:",
	    "form-language-to": "A:",
	    "form-language-after": "",
	    "form-language-choose": "Scegli lingua",
	    "form-url": "L'url della wiki:",
	    "form-information-header": "Informazioni sulla tua richiesta:",
	    "form-information-request": "Più informazioni su come compilare la tua richiesta possono essere trovate all'inizio della pagina.",
	    "form-items": "Elementi",
	    "form-items-placeholder": "<elementi da tradurre (fino a 3)>",
	    "form-extrainfo": "Informazioni aggiuntive",
	    "form-extrainfo-placeholder": "<inserisci informazioni aggiuntive (facoltative)>",
	    "form-signature": "Firma", 
	};
	
	// Japanese
	// Japanese
	messages.JA = {
	    button: "依頼する",
	    "save-wiki": "ウィキ",
	    "community-url": "ja.community",
	    "form-name": "申し込み書",
	    "form-header": "リクエストのタイトル",
	    "form-header-placeholder": "こちらをタイトルに変更してください",
	    "form-language": "翻訳する言語:",
	    "form-language-to": "から:",
	    "form-language-after": " へ",
	    "form-language-choose": "言語の選択",
	    "form-url": "ウィキのURL:",
	    "form-information-header": "リクエストの情報。",
	    "form-information-request": "詳しいリクエストの記入のしかたについては、ページ上部をご覧ください。",
	    "form-items": "項目",
	    "form-items-placeholder": "<翻訳を頼みたい項目 (3つまで)>",
	    "form-extrainfo": "その他の情報",
	    "form-extrainfo-placeholder": "<その他の情報を追加してください (任意)>",
	    "form-signature": "署名",
	};
	
	//Malay
	messages.MS = {
	    button: "Permintaan Baru",
	    "save-wiki": "Wiki",
	    "community-url": "ms.community",
	    "form-name": "Borang Permintaan",
	    "form-header": "Tajuk:",
	    "form-header-placeholder": "Gantikan ini dengan tajuk anda",
	    "form-language": "Bahasa yang ingin diterjemah:",
	    "form-language-to": "Untuk:",
	    "form-language-after": "",
	    "form-language-choose:": "Pilih bahasa",
	    "form-url": "URL atau laman wiki yang ingin diterjemah:",
	    "form-information-header": "Keterangan:",
	    "form-information-request": "Untuk keterangan lanjut, sila rujuk kepada segmen atas laman ini.",
	    "form-items": "Sumber-sumber",
	    "form-items-placeholder": "<artikel-artikel untuk diterjemah (maksimum: 3)>",
	    "form-extrainfo": "Maklumat tambahan",
	    "form-extrainfo-placeholder": "<masukkan maklumat tambahan sini (tidak wajib)>",
	    "form-signature": "Tandatangan",
	};
	
	// Dutch
	messages.NL = {
	    button: "Verbetering aanvragen",
	    "save-wiki": "Wiki",
	    "community-url": "nl.community",
	    "form-name": "Aanvraagformulier",
	    "form-header": "Onderwerp van de aanvraag",
	    "form-header-placeholder": "Vervang dit met het onderwerp",
	    "form-language": "Vertaal vanuit:",
	    "form-language-to": "Naar:",
	    "form-language-after": "",
	    "form-language-choose": "Kies taal",
	    "form-url": "Plaats hier de url van de wiki:",
	    "form-information-header": "Informatie over de aanvraag:",
	    "form-information-request": "Meer informatie over hoe je de aanvraag kan invullen staat aan de bovenkant van de pagina.",
	    "form-items": "Items",
	    "form-items-placeholder": "<te verbeteren pagina's (tot 3)>",
	    "form-extrainfo": "Extra informatie",
	    "form-extrainfo-placeholder": "<andere informatie (optioneel)",
	    "form-signature": "Handtekening",
	};
	
	// Polish
	messages.PL = {
	    button: "Utwórz wniosek",
	    "save-wiki": "Wiki",
	    "community-url": "pl.community",
	    "form-name": "Formularz wniosku",
	    "form-header": "Tytuł wniosku:",
	    "form-header-placeholder": "Zastąp ten tytuł",
	    "form-language": "Przetłumacz z:",
	    "form-language-to": "Na:",
	    "form-language-after": "",
	    "form-language-choose": "Wybierz język",
	    "form-url": "Podaj adres url wiki:",
	    "form-information-header": "Informacje o Twoim wniosku:",
	    "form-information-request": "Więcej informacji na temat plików, można znaleźć na górze strony.",
	    "form-items": "Elementy",
	    "form-items-placeholder": "<elementy do poprawy (do 3)>",
	    "form-extrainfo": "Dodatkowe informacje",
	    "form-extrainfo-placeholder": "<wprowadź dodatkowe informacje (opcjonalne)>",
	    "form-signature": "Podpis",
	};
	
	// Portuguese
	messages.PT = {
	    button: "Novo pedido",
	    "save-wiki": "Wiki",
	    "community-url": "pt.community",
	    "form-name": "Formulário de solicitação",
	    "form-header": "Título do pedido:",
	    "form-header-placeholder": "Substitui isto com o título",
	    "form-language": "Traduzir de:",
	    "form-language-to": "A:",
	    "form-language-after": "",
	    "form-language-choose": "Escolhe a língua",
	    "form-url": "Url da wiki:",
	    "form-information-header": "Informação do teu pedido:",
	    "form-information-request": "Mais informações sobre como fazer o teu pedido podem-se encontrar na parte superior da página.",
	    "form-items": "Itens",
	    "form-items-placeholder": "<coisas para traduzir (até 3)>",
	    "form-extrainfo": "Informação extra",
	    "form-extrainfo-placeholder": "<adiciona informção extra (opcional)>",
	    "form-signature": "Assinatura",
	};
	
	// Russian
	messages.RU = {
	    button: "Создать запрос",
	    "save-wiki": "Вики",
	    "community-url": "ru.community",
	    "form-name": "Форма запроса",
	    "form-header": "Название запроса:",
	    "form-header-placeholder": "Введите сюда название",
	    "form-language": "Translate from:", // Needs translation
	    "form-language-to": "To:", // Needs translation
	    "form-language-after": "",
	    "form-language-choose": "Choose language", // Needs translation
	    "form-url": "Url адрес викии:",
	    "form-information-header": "Информация по запросу:",
	    "form-information-request": "Более подробную информацию о том, как оставить запрос, можно найти в верхней части страницы.",
	    "form-items": "Статьи",
	    "form-items-placeholder": "<статьи для перевода (до 3-ех)>",
	    "form-extrainfo": "Дополнительная информация",
	    "form-extrainfo-placeholder": "<укажите дополнительную информацию (необязательно)>",
	    "form-signature": "Signature", // Needs translation
	};
	
    var dropdown = '<select name="language" id="language" value="'+mw.config.get('wgUserLanguage').toUpperCase()+'">';
	    dropdown += '<option value="" selected disabled>' + messages.get('form-language-choose') + '</option>';
	    for (var j in messages.languages) {
	        dropdown += '<option value="'+j+'">'+messages.languages[j]+'</option>';
	    }
	    dropdown += '</select>';

    var dropdown2 = '<select name="language2" id="language2" value="'+mw.config.get('wgUserLanguage').toUpperCase()+'">';
	    dropdown2 += '<option value="" selected disabled>' + messages.get('form-language-choose') + '</option>';
	    for (var k in messages.languages) {
	        dropdown2 += '<option value="'+k+'">'+messages.languages[k]+'</option>';
	    }
	    dropdown2 += '</select>';

	// This opens the form for the users to fill out
	function openFormTranslate() {
	    $modal = showCustomModal(messages.get('form-name'), '<form class="WikiaForm" method="" name="" id="translationForm"><fieldset><strong>' + messages.get('form-header') + '</strong> <input id="request-header" type="text" placeholder="' + messages.get('form-header-placeholder') + '" style="width: 450px"/><br/><strong><br><span style="font-size:13pt">' + messages.get('form-information-header') + '</span><span title="' + messages.get('form-information-request') + '" style="cursor:help; float:right; font-size:12pt; border-bottom:1px dotted">[?]</span></strong><table border="0" id="mw-translate-table"><tr><td class="mw-label">' + messages.get('form-language') + '</td><td class="mw-input">' + dropdown + ' ' + messages.get('form-language-to') + ' ' + dropdown2 + messages.get('form-language-after') + '</td></tr><tr><td class="mw-label">' + messages.get('form-url') + '</td><td class="mw-input">https://<input id="wiki-url" type="text" placeholder="' + messages.get('community-url') + '" style="width:200px"/>.fandom.com</td></tr><tr><td class="mw-label">' + messages.get('form-items') + ':</td><td class="mw-input"><textarea name="items" id="items" cols="50" rows="3" maxlength="200" placeholder="' + messages.get('form-items-placeholder') + '"></textarea></td></tr><tr><td class="mw-label">' + messages.get('form-extrainfo') + ':</td><td class="mw-input"><textarea name="extrainfo" id="extrainfo" cols="50" rows="2" maxlength="200" placeholder="' + messages.get('form-extrainfo-placeholder') + '"></textarea></td></tr><tr><td class="mw-label">' + messages.get('form-signature') + ':</td><td class="mw-input"><input id="signature-place" type="text" value="' + signature + '"style="width:200px"/></td></tr></table></fieldset></form>', {
	        id: "requestWindow",
	        width: 650,
	        buttons: [{
	    id: "cancel",
	    message: "Cancel",
	    handler: function () {
	        cancelformTranslate();
	    }
	        }, {
	    id: "submit",
	    defaultButton: true,
	    message: "Submit",
	    handler: function () {
	        submitformTranslate();
	    }
	        }]
	    });
    }

	// Closes the form
	 
	function cancelformTranslate() {
	    showCustomModal.closeModal($modal);
	}
	 
	// Submits the form
	
	function submitformTranslate() {
	    var $form = $('#translationForm'),
	        header = $form.find('#request-header').val(),
	        lang = $form.find('#language').val(),
	        lang2 = $form.find('#language2').val(),
	        wikiurl = $form.find('#wiki-url').val(),
	        items = $form.find('#items').val(),
	        extrainfo = $form.find('#extrainfo').val(),
	        signatureplace = $form.find('#signature-place').val(),
	        page = '{{Translate header}}\n{{Translation|' + lang + '|' + lang2 + '}}\n\n\'\'\'{{int:i18n-form-wiki}}\'\'\': [[w:c:' + wikiurl + ']]\n\n\'\'\'{{int:i18n-form-items}}\'\'\': ' + items + '\n\n\'\'\'{{int:i18n-form-extrainfo}}\'\'\': ' + extrainfo + '\n\n\'\'\'{{int:i18n-form-signature}}\'\'\': ' + signatureplace + '\n[[Category:New translations]]';
	
	    // Making sure the header isn't blank, and a language has been filled in
	    if (!header) {
	        alert("Please title your request!");
	        return;
	    }
	    if (!lang||!lang2) {
	        alert('Please select a language!');
	        return;
	    }

	    // Ajax URL
	    new mw.Api().postWithEditToken({
	    	action: 'edit',
	    	title: 'Translate:' + header + ' (' + lang + '→' + lang2 + ')',
	    	text: page,
	    	summary: 'New translate request (' + lang + '→' + lang2 + ')'
	    }).done(function (r) {
			cancelformTranslate();
	        window.location.reload();
	    });
	}

	mw.hook('dev.showCustomModal').add(function(scm) {
		showCustomModal = scm;
		var buttonappend = document.createElement('a');
			buttonappend.className = 'wds-button';
			buttonappend.textContent = messages.get('button');
			buttonappend.addEventListener('click', openFormTranslate);
	    document.getElementById("lang-" + config.wgUserLanguage.toUpperCase()).append(buttonappend);
	});

	mw.loader.using( ['mediawiki.api'] ).then(function() {
		importArticle({
		    type: 'script',
		    article: 'u:dev:MediaWiki:ShowCustomModal.js'
		});
	});
})(window.jQuery, window.mediaWiki);
// </nowiki>