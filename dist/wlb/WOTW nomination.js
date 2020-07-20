/*<nowiki>
	@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
	@ Some functions added by Jr Mime (pop-up layout, variables)
	@ Adds a pop up modal form for spotlights
	@ License: CC-BY-NC-SA
	@ License Jurisdiction: International
	*/

// Keep these in an object for organization
(function ($, mw) {
    var _api = {
        edittoken: mw.user.tokens.values.editToken,
        watchtoken: mw.user.tokens.values.watchToken,
        namespace: mw.config.get('wgNamespaceNumber'),
        pagename: mw.config.get('wgPageName'),
        server: mw.config.get('wgServer'),
        signature: '~~' + '~~',
        language: mw.config.get('wgUserLanguage')
    };
    var msg = {
            get: function (name) {
                var m = '(' + name + ')';

                if (typeof msg[_api.language.toUpperCase()] !== 'undefined' && typeof msg[_api.language.toUpperCase()][name] !== 'undefined') {
                    m = msg[_api.language.toUpperCase()][name];
                } else {
                    m = msg['EN'][name];
                }
                return m;

            },

            add: function (code, obj) {
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
                VI: 'vi - Tiếng Việt',
                YI: 'yi - ייִדיש',
                ZH: 'zh - 中文',
                ZU: 'zu - isiZulu',
                XX: 'Other'
            }

        };

    // define localization
    // Should be moved somewhere (as well as the whole script needs code review)
    msg.add('EN', {
        /* general */
        'button-label-cancel': 'Cancel',

        /* , at line end works always, comments can be in here too between lines */
        'ftr-bar-show': 'Show&nbsp;',

        /* WOTW */
        'wotw-word-in-your-language-label': 'Word in your language:',
        'wotw-nominate-word-of-the-week-form-heading': 'Nominate Word of the Week',
        'wotw-your-language': 'Your language:',
        'wotw-word-translated': 'Translation (English):',
        'wotw-submit-nomination-button-label': 'Nominate!',
    });

    msg.add('DE', {
        /* general */
        'button-label-cancel': 'Abbrechen',

        /* , at line end works always, comments can be in here too between lines */
        'ftr-bar-show': 'Zeige&nbsp;',

        /* WOTW */
        'wotw-word-in-your-language-label': 'Wort in deiner Sprache:',
        'wotw-nominate-word-of-the-week-form-heading': 'Wort der Woche vorschlagen',
        'wotw-your-language': 'Deine Sprache:',
        'wotw-word-translated': 'Übersetzung (Englisch):',
        'wotw-submit-nomination-button-label': 'Nominieren!',

    });

    function hideForm() {
        $('#request-form').fadeOut();
        setTimeout(function () {
            $('#request-form').remove();
            console.log("Form removed successfully");
        }, 1000);
    }

    var language_dropdown = [];
    for (var messageIndex in msg.languages) {
        language_dropdown += '<option value="' + i + '">' + msg.languages[messageIndex] + '</option>';
    }

    // This opens the form for the users to fill out

    function openFormWOTW() {
        $("#wotw-nominate").after('<div id="request-form" style="min-width: 660px; margin: 0 auto;"><h2>' + msg.get('wotw-nominate-word-of-the-week-form-heading') + '</h2><div style="margin: 0 auto;"><div style="float: left; margin-right: 10px; width: 200px; text-align: right; min-height: 40px;">'

            + msg.get('wotw-word-in-your-language-label') + '</div><div style="float: left; min-height: 40px;"><input id="wotw-word" style="min-width: 300px;" />' + '</div><br><div style="clear: both;"></div><div style="float: left; margin-right: 10px; width: 200px; text-align: right; min-height: 40px;">' + msg.get('wotw-your-language') + '</div><div style="float: left; min-height: 40px;"><select id="wotw-your-language"><option disabled="">Select your language</option>' + language_dropdown + '</select></div><br><div style="clear: both;"></div><div style="float: left; margin-right: 10px; width: 200px; text-align: right; min-height: 40px;">' + msg.get('wotw-word-translated') + '</div><div style="float: left; min-height: 40px;"><input id="wotw-word-translated" style="min-width: 300px;" /></div></div>'

            + '</div><div style="clear: both;"></div><button onclick="submitformWOTW()">' + msg.get('wotw-submit-nomination-button-label') + '</button>&nbsp;<button onclick="hideForm()">' + msg.get('button-label-cancel') + '</button></div>');

        $('#spotlight-submit').text(msg.get('button-close'));
        $('#spotlight-submit').removeAttr("onclick").attr("onclick", "hideForm()");
    }

    function submitformWOTW() {
        console.log('Starting to submit...');
        var $form = $('#request-form'),
            wotw_word_local = $form.find('#wotw-word').val(),
            wotw_word_translated = $form.find('#wotw-word-translated').val(),
            lang = $form.find('#wotw-your-language').val(),
            /* reuse dropdown */
            page = "\n* \'\'\'" + wotw_word_local + "\'\'\' (" + lang + " for \'\'" + wotw_word_translated + "\'\') - ~~" + "~~";
        // If language or header is blank, return alerts
        if (!lang) {
            alert('Please select a language!');
        }
        console.log('Performed checks...');

        // Ajax URL
        var url = _api.server + '/api.php?action=edit&title=Language_Brigade_Wiki:Word_of_the_Week/Nominations&appendtext=' + encodeURIComponent(page) + '&summary=New+nomination+added&token=' + encodeURIComponent(_api.edittoken);
        console.log('Got the url: ', url);

        $.post(url, function () {
            $('body').css('cursor', 'wait');
            console.log('Should be done now:');
            setTimeout(function () {
                window.location = _api.server + '/wiki/Language_Brigade_Wiki:Word_of_the_Week/Nominations';
            }, 2000);
        });
        console.log('Sent request...');
    }


    // Add buttons depending on user language
    if (_api.pagename === 'Language_Brigade_Wiki:Word_of_the_Week') {

        setTimeout(function () {

            openFormWOTW();

            console.log("1");
        }, 2000);

    }
})(this.jQuery, this.mediaWiki);