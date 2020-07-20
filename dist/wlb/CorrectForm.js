/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adds a pop up modal form for wlb.wikia.com
@ License: CC-BY-NC-SA
@ License Jurisdiction: International
*/
 
// Variables for later on
// Keep these in an object for organization
var _cr = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage')
};

var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    msg = messages = {
        get: function(name) {
    return (messages[_cr.language.toUpperCase()]||messages['EN'])[name];
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
            XX: 'Other'
        },
    };

// English / default
messages['EN'] = {
    button: "Create request",
    "save-wiki": "Wiki",
    "community-url": "community",
    "form-name": "Request Form",
    "form-header": "Title of the request:",
    "form-header-placeholder": "Replace this with the title",
    "form-language": "Language to correct:",
    "form-language-choose": "Choose language",
    "form-url": "URL of the wiki:",
    "form-information-header": "Information of your request:",
    "form-information-request": "More information on how to file in your request can be found at the top of the page.",
    "form-items": "Items",
    "form-items-placeholder": "<items to correct (up to 3)>",
    "form-extrainfo": "Extra information",
    "form-extrainfo-placeholder": "<insert extra information (optional)>",
    "form-signature": "Signature",
}

// Catalan
messages['CA'] = {
    button: "Nova soŀlicitud",
    "save-wiki": "Wiki",
    "community-url": "ca.",
    "form-name": "Forma de petició",
    "form-header": "Títol de la petició:",
    "form-header-placeholder": "Reemplaça això amb el títol",
    "form-language": "Idioma per corregir:",
    "form-language-choose": "Tria idioma",
    "form-url": "URL del wiki:",
    "form-information-header": "Informació de la teva petició:",
    "form-information-request": "Més informació de com fer la teva petició es pot trobar a la part superior de la pàgina.",
    "form-items": "Items",
    "form-items-placeholder": "<coses per corregir (fins a 3)>",
    "form-extrainfo": "Informació extra",
    "form-extrainfo-placeholder": "<afegeix informació extra (opcional)>",
    "form-signature": "Signatura",
}

// German
messages['DE'] = {
    button: "Korrekturanfrage stellen",
    "save-wiki": "Wiki",
    "community-url": "de.community",
    "form-name": "Formular",
    "form-header": "Anfragentitel:",
    "form-header-placeholder": "Geben Sie hier den Titel an",
    "form-language": "Zu korrigierende Sprache:",
    "form-language-choose": "Sprache wählen",
    "form-url": "Wiki-URL hier angeben:",
    "form-information-header": "Informationen zur Anfrage:",
    "form-information-request": "Weitere Informationen darüber, wie das Formular auszufüllen ist können auf der Seite \"Correct\" gefunden werden.",
    "form-items": "Sätze/Artikel/Seiten",
    "form-items-placeholder": "<Zu korrigierende Sätze/Artikel/Seiten (bis zu drei)>",
    "form-extrainfo": "Weitere Informationen",
    "form-extrainfo-placeholder": "<Weitere Informationen angeben (optional) >",
    "form-signature": "Signatur",
}

// Spanish
messages['ES'] = {
    button: "Nueva solicitud",
    "save-wiki": "Wiki",
    "community-url": "comunidad",
    "form-name": "Formulario de solicitud de",
    "form-header": "Título de la petición:",
    "form-header-placeholder": "Sustituye esto con el título",
    "form-language": "Idioma para corregir:",
    "form-language-choose": "Elige idioma",
    "form-url": "Url de la wiki:",
    "form-information-header": "Información de tu petición:",
    "form-information-request": "Más información sobre como hacer tu petición se puede encontrar en la parte superior de la página.",
    "form-items": "Items",
    "form-items-placeholder": "<cosas a corregir (hasta 3)>",
    "form-extrainfo": "Información extra",
    "form-extrainfo-placeholder": " <información extra>",
    "form-signature": "Firma",
}

// French
messages['FR'] = {
    button: "Nouvelle requête",
    "save-wiki": "Wiki",
    "community-url": "fr.community",
    "form-name": "Formulaire de demande",
    "form-header": "Titre de votre requête:",
    "form-header-placeholder": "Remplacez ceci avec votre titre",
    "form-language": "Langue à corriger:",
    "form-language-choose": "Choisir une langue",
    "form-url": "L'URL du wiki:",
    "form-information-header": "Information de vôtre requête:",
    "form-information-request": "Plus d'information sur comment remplir votre requête ce retrouve en haut de cette page.",
    "form-items": "Items",
    "form-items-placeholder": "<items à corriger (jusqu'à 3)>",
    "form-extrainfo": "Information suplémentaire",
    "form-extrainfo-placeholder": "<insérez l'information suplémentaire ici (optionnel)>",
    "form-signature": "Signature",
}

// Galician
messages['GL'] = {
    button: "Crear solicitude",
    "save-wiki": "Wiki",
    "community-url": "gl",
    "form-name": "Formulario de solicitude",
    "form-header": "Título da solicitude:",
    "form-header-placeholder": "Substitúe isto co título",
    "form-language": "Idioma para corrixir:",
    "form-language-choose": "Escolle o idioma",
    "form-url": "Url da wiki:",
    "form-information-header": "Información da túa solicitude:",
    "form-information-request": "Máis información sobre como facer a túa solicitude pódense atopar na parte superior da páxina.",
    "form-items": "Elementos",
    "form-items-placeholder": "<cousas para traducir (ata 3)>",
    "form-extrainfo": "Información extra",
    "form-extrainfo-placeholder": "<engade información extra (opcional)>",
    "form-signature": "Firma",
}

// Japanese
messages['JA'] = {
    button: "直すリクエストを新規作成",
    "save-wiki": "ウィキ",
    "community-url": "ja.community",
    "form-name": "伺い書",
    "form-header": "リクエストのタイトル",
    "form-header-placeholder": "こちらをタイトルに変更しなさい",
    "form-language": "訂正する言語:",
    "form-language-choose": "言語の選択",
    "form-url": "項目:",
    "form-information-header": "リクエストの情報。",
    "form-information-request": "リクエストの記入についての他の情報は、ページの上の方に書いています。",
    "form-items": "その他の情報",
    "form-items-placeholder": "<翻訳をお願いしたい項目 (3つまで)>",
    "form-extrainfo": "その他の情報",
    "form-extrainfo-placeholder": "＜その他の情報を追加してください（任意）＞",
    "form-signature": "署名",
}

// Malay
messages['MS'] = {
    button: "Permintaan baru",
    "save-wiki": "Wiki",
    "community-url": "ms.community",
    "form-name": "Borang permintaan",
    "form-header": "Tajuk:",
    "form-header-placeholder": "Gantikan ini dengan tajuk anda",
    "form-language": "Bahasa untuk diperbaiki:",
    "form-language-choose": "Pilih bahasa",
    "form-url": "URL atau laman wiki:",
    "form-information-header": "Keterangan:",
    "form-information-request": "Untuk keterangan lanjut, sila rujuk kepada segmen atas laman ini.",
    "form-items": "Sumber",
    "form-items-placeholder": "<artikel-artikel untuk diperbaiki (maksimum: 3)>",
    "form-extrainfo": "Maklumat tambahan",
    "form-extrainfo-placeholder": "<masukkan maklumat tambahan sini (tidak wajib)>",
    "form-signature": "Tandatangan",
}

// Dutch
messages['NL'] = {
    button: "Verbetering aanvragen",
    "save-wiki": "Wiki",
    "community-url": "nl.community",
    "form-name": "Aanvraagformulier",
    "form-header": "Onderwerp van de aanvraag",
    "form-header-placeholder": "Vervang dit met het onderwerp",
    "form-language": "Language to correct:", // Needs translation
    "form-language-choose": "Kies taal",
    "form-url": "Plaats hier de url van de wiki:",
    "form-information-header": "Informatie over de aanvraag:",
    "form-information-request": "Meer informatie over hoe je de aanvraag kan invullen staat aan de bovenkant van de pagina.",
    "form-items": "Items",
    "form-items-placeholder": "<te verbeteren pagina's (tot 3)>",
    "form-extrainfo": "Extra informatie",
    "form-extrainfo-placeholder": "<andere informatie (optioneel)",
    "form-signature": "Signature", // Needs translation
}

// Polish
messages['PL'] = {
    button: "Utwórz wniosek",
    "save-wiki": "Wiki",
    "community-url": "pl.community",
    "form-name": "Formularz wniosku",
    "form-header": "Tytuł wniosku:",
    "form-header-placeholder": "Zastąp ten tytuł",
    "form-language": "Język do poprawy:", 
    "form-language-choose": "Wybierz język", 
    "form-url": "Podaj adres url wiki:",
    "form-information-header": "Informacje o Twoim wniosku:",
    "form-information-request": "Więcej informacji na temat plików, można znaleźć na górze strony.",
    "form-items": "Elementy",
    "form-items-placeholder": "<elementy do poprawy (do 3)>",
    "form-extrainfo": "Dodatkowe informacje",
    "form-extrainfo-placeholder": "<wprowadź dodatkowe informacje (opcjonalne)>",
    "form-signature": "Podpis",
}

// Portuguese
messages['PT'] = {
    button: "Novo pedido",
    "save-wiki": "Wiki",
    "community-url": "pt.",
    "form-name": "Formulário de solicitação",
    "form-header": "Título do pedido:",
    "form-header-placeholder": "Substitui isto com o título",
    "form-language": "Língua para corrigir:",
    "form-language-choose": "Escolhe a língua",
    "form-url": "Url da wiki:",
    "form-information-header": "Informação do teu pedido:",
    "form-information-request": "Mais informações sobre como fazer o teu pedido podem-se encontrar na parte superior da página.",
    "form-items": "Itens",
    "form-items-placeholder": "<coisas para traduzir (até 3)>",
    "form-extrainfo": "Informação extra",
    "form-extrainfo-placeholder": "<adiciona informção extra (opcional)>",
    "form-signature": "Assinatura",
}

// Add buttons depending on user language
if(_cr.pagename === 'Correct:Requests') {
    var buttonappend = '<a class="wikia-button" id="wlb-submit" onclick="openFormCorrect()">' + msg.get('button') + '</a>';
    document.getElementById("lang-" + _cr.language.toUpperCase()).innerHTML = buttonappend;

    window.dropdown = '<select name="language" id="language" value="'+mw.config.get('wgUserLanguage').toUpperCase()+'">';
    dropdown += '<option value="" selected disabled>' + msg.get('form-language-choose') + '</option>';
    for (var i in msg.languages) {
        dropdown += '<option value="'+i+'">'+msg.languages[i]+'</option>';
    }
    dropdown += '</select>';

// This opens the form for the users to fill out
 
function openFormCorrect() {
    $.showCustomModal(msg.get('form-name'), '<form class="WikiaForm" method="" name="" id="correctionForm"><fieldset><strong>' + msg.get('form-header') + '</strong> <input id="request-header" maxlength="40" type="text" placeholder="' + msg.get('form-header-placeholder') + '" style="width: 450px"/><br/><span id="request-header-number"></span><strong><br><span style="font-size:13pt">' + msg.get('form-information-header') + '</span><span title="' + msg.get('form-information-request') + '" style="cursor:help; float:right; font-size:12pt; border-bottom:1px dotted">[?]</span></strong><table border="0" id="mw-correct-table"><tr><td class="mw-label">' + msg.get('form-language') + '</td><td class="mw-input">' + window.dropdown + '</td></tr><br/><tr><td class="mw-label">' + msg.get('form-url') + '</td><td class="mw-input">http://<input id="wiki-url" type="text" placeholder="' + msg.get('community-url') + '" style="width:200px"/>.wikia.com</td></tr><tr><td class="mw-label">' + msg.get('form-items') + ':</td><td class="mw-input"><textarea name="items" id="items" cols="50" rows="5" maxlength="200" placeholder="' + msg.get('form-items-placeholder') + '"></textarea></td></tr><tr><td class="mw-label">' + msg.get('form-extrainfo') + ':</td><td class="mw-input"><textarea name="extrainfo" id="extrainfo" cols="50" rows="4" maxlength="200" placeholder="' + msg.get('form-extrainfo-placeholder') + '"></textarea></td></tr><tr><td class="mw-label">' + msg.get('form-signature') + ':</td><td class="mw-input"><input id="signature-place" type="text" value="' + _cr.signature + '"style="width:200px"/></td></tr></table></fieldset></form>', {
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
}

// Closes the form
 
function cancelformCorrect() {
    $("#requestWindow").closeModal();
}
 
// Submits the form

function submitformCorrect() {
console.log('Starting to submit...');
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
console.log('Performed checks...');
 
    // Ajax URL
    var url = _cr.server + '/api.php?action=edit&title=Correct:' + encodeURIComponent(header) + ' (' + encodeURIComponent(lang) + ')&text=' + encodeURIComponent(page) + '&summary=New+correct+request+(' + encodeURIComponent(lang) + ')&token=' + encodeURIComponent(_cr.edittoken);
console.log('Got the url: ',url);
 
    $.post(url, function (r) {
console.log('Should be done now:',r);
	cancelformCorrect();
        window.location.reload();
    });
console.log('Sent request...');
}