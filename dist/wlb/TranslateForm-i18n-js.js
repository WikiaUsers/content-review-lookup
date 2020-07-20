/*<nowiki>
 @ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
 @ further customised by sactage for compatibility with i18n.js
 @ Some functions added by Jr Mime (pop-up layout, variables)
 @ Adds a pop up modal form for wlb.wikia.com
 @ License: CC-BY-NC-SA
 @ License Jurisdiction: International
 */

// Variables for later on
// Keep these in an object for organization
var _tr = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get( 'wgNamespaceNumber' ),
    pagename: mw.config.get( 'wgPageName' ),
    server: mw.config.get( 'wgServer' ),
    signature: '~~' + '~~',
    language: mw.config.get( 'wgUserLanguage' )
};

var $ = this.jQuery,
    mw = this.mediaWiki,
    i;

if (_tr.pagename === 'Translate:FakeRequests') {


    function initTranslateForm() {
// Add buttons depending on user language
        if (_tr.pagename === 'Translate:Requests') return;
        var buttonappend = '<a class="wikia-button" id="wlb-submit" onclick="openFormTranslate()">' + mw.msg( 'i18n-button' ) + '</a>';
        try {
            document.getElementById("lang-" + _tr.language.toUpperCase()).innerHTML = buttonappend;
        } catch (e) {
            document.getElementById("lang-EN").innerHTML = buttonappend;
        }
        window.dropdown = '<select name="language" id="language" value="' + mw.config.get( 'wgUserLanguage' ).toUpperCase() + '">';
        dropdown += '<option value="" selected disabled>' + mw.msg( 'i18n-form-language-choose' ) + '</option>';
        for (var i in i18n.languages) {
            dropdown += '<option value="' + i + '">' + i18n.languages[i] + '</option>';
        }
        dropdown += '</select>';

        window.dropdown2 = '<select name="language2" id="language2" value="' + mw.config.get( 'wgUserLanguage' ).toUpperCase() + '">';
        dropdown2 += '<option value="" selected disabled>' + mw.msg( 'i18n-form-language-choose' ) + '</option>';
        for (var i in i18n.languages) {
            dropdown2 += '<option value="'+i+'">'+i18n.languages[i]+'</option>';
        }
        dropdown2 += '</select>';
// This opens the form for the users to fill out
    }

    function openFormTranslate() {
        $.showCustomModal(mw.msg( 'i18n-form-name' ), '<form class="WikiaForm" method="" name="" id="translationForm"><fieldset><strong>' + mw.msg( 'i18n-form-header' ) + '</strong> <input id="request-header" type="text" placeholder="' + mw.msg( 'i18n-form-header-placeholder' ) + '" style="width: 450px"/><br/><strong><br><span style="font-size:13pt">' + mw.msg( 'i18n-form-information-header' ) + '</span><span title="' + mw.msg( 'i18n-form-information-request' ) + '" style="cursor:help; float:right; font-size:12pt; border-bottom:1px dotted">[?]</span></strong><table border="0" id="mw-translate-table"><tr><td class="mw-label">' + mw.msg( 'i18n-form-translate-language' ) + '</td><td class="mw-input">' + window.dropdown + ' ' + mw.msg( 'i18n-form-language-to' ) + ' ' + window.dropdown2 + mw.msg( 'i18n-form-language-after' ) + '</td></tr><tr><td class="mw-label">' + mw.msg( 'i18n-form-url' ) + '</td><td class="mw-input">http://<input id="wiki-url" type="text" placeholder="community" style="width:200px"/>.wikia.com</td></tr><tr><td class="mw-label">' + mw.msg( 'i18n-form-items' ) + ':</td><td class="mw-input"><textarea name="items" id="items" cols="50" rows="3" maxlength="200" placeholder="' + mw.msg( 'i18n-form-translate-items-placeholder' ) + '"></textarea></td></tr><tr><td class="mw-label">' + mw.msg( 'i18n-form-extrainfo' ) + ':</td><td class="mw-input"><textarea name="extrainfo" id="extrainfo" cols="50" rows="2" maxlength="200" placeholder="' + mw.msg( 'i18n-form-extrainfo-placeholder' ) + '"></textarea></td></tr><tr><td class="mw-label">' + mw.msg( 'i18n-form-signature' ) + ':</td><td class="mw-input"><input id="signature-place" type="text" value="' + _tr.signature + '"style="width:200px"/></td></tr></table></fieldset></form>', {
            id: "requestWindow",
            width: 650,
            buttons: [
                {
                    id: "cancel",
                    message: "Cancel",
                    handler: function () {
                        cancelformTranslate();
                    }
                },
                {
                    id: "submit",
                    defaultButton: true,
                    message: "Submit",
                    handler: function () {
                        submitformTranslate();
                    }
                }
            ]
        });
    }

// Closes the form

    function cancelformTranslate() {
        $("#requestWindow").closeModal();
    }

// Submits the form

    function submitformTranslate() {
        console.log('Starting to submit...');
        var $form = $('#translationForm'),
            header = $form.find('#request-header').val(),
            lang = $form.find('#language').val(),
            lang2 = $form.find('#language2').val(),
            wikiurl = $form.find('#wiki-url').val(),
            items = $form.find('#items').val(),
            extrainfo = $form.find('#extrainfo').val(),
            signatureplace = $form.find('#signature-place').val(),
            page = '{{Translate header}}\n{{Translation|' + lang + '|' + lang2 + '}}\n\n\'\'\'{{int:i18n-form-wiki}}:\'\'\' [[w:c:' + wikiurl + ']]\n\n\'\'\'{{int:i18n-form-items}}:\'\'\' ' + items + '\n\n\'\'\'{{int:i18n-form-extrainfo}}:\'\'\' ' + extrainfo + '\n\n\'\'\'{{int:i18n-form-signature}}:\'\'\' ' + signatureplace + '\n[[Category:New translations]]';

        // Making sure the header isn't blank, and a language has been filled in
        if (!header) {
            alert("Please title your request!");
            return;
        }
        if (!lang||!lang2) {
            alert('Please select a language!');
            return;
        }
        console.log('Performed checks...');

        // Ajax URL
        var url = _tr.server + '/api.php?action=edit&title=Translate:FAKE ' + encodeURIComponent(header) + ' (' + encodeURIComponent(lang) + '+%E2%86%92+' + encodeURIComponent(lang2) + ')&text=' + encodeURIComponent(page) + '&summary=New+translate+request+(' + encodeURIComponent(lang) + '+%E2%86%92+' + encodeURIComponent(lang2) + ')&token=' + encodeURIComponent(_tr.edittoken);
        console.log('Got the url: ',url);

        $.post(url, function (r) {
            console.log('Should be done now:', r);
            cancelformTranslate();
            window.location.reload();
        });
        console.log('Sent request...');
    }

    $.when(
        i18n.registerMessages('form-common',
            [
                'i18n-button',
                'i18n-form-name',
                'i18n-form-header',
                'i18n-form-header-placeholder',
                'i18n-form-language-choose',
                'i18n-form-url',
                'i18n-form-information-header',
                'i18n-form-information-request',
                'i18n-form-items',
                'i18n-form-extrainfo',
                'i18n-form-extrainfo-placeholder',
                'i18n-form-signature'
            ]
        ),
        i18n.registerMessages('translateform',
            [
                'i18n-form-translate-language',
                'i18n-form-translate-items-placeholder',
                'i18n-form-language-to'
            ]
        )
    ).done(i18n.require('form-common').done(i18n.require('translateform').done(initTranslateForm)));
}