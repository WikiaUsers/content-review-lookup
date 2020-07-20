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
    i;

if (_cr.pagename === 'Correct:FakeRequests') {


    function initCorrectForm() {
// Add buttons depending on user language

        var buttonappend = '<a class="wikia-button" id="wlb-submit" onclick="openFormCorrect()">' + mw.msg('correctform-button') + '</a>';
        try {
            document.getElementById("lang-" + _cr.language.toUpperCase()).innerHTML = buttonappend;
        } catch (e) {
            document.getElementById("lang-EN").innerHTML = buttonappend;
        }
        window.dropdown = '<select name="language" id="language" value="' + mw.config.get('wgUserLanguage').toUpperCase() + '">';
        dropdown += '<option value="" selected disabled>' + mw.msg('correctform-form-language-choose') + '</option>';
        for (var i in i18n.languages) {
            dropdown += '<option value="' + i + '">' + i18n.languages[i] + '</option>';
        }
        dropdown += '</select>';

// This opens the form for the users to fill out
    }

    function openFormCorrect() {
        $.showCustomModal(mw.msg('correctform-form-name'), '<form class="WikiaForm" method="" name="" id="correctionForm"><fieldset><strong>' + mw.msg('correctform-form-header') + '</strong> <input id="request-header" type="text" placeholder="' + mw.msg('correctform-form-header-placeholder') + '" style="width: 450px"/><br/><span id="request-header-number"></span><strong><br><span style="font-size:13pt">' + mw.msg('correctform-form-information-header') + '</span><span title="' + mw.msg('correctform-form-information-request') + '" style="cursor:help; float:right; font-size:12pt; border-bottom:1px dotted">[?]</span></strong><table border="0" id="mw-correct-table"><tr><td class="mw-label">' + mw.msg('correctform-form-language') + '</td><td class="mw-input">' + window.dropdown + '</td></tr><br/><tr><td class="mw-label">' + mw.msg('correctform-form-url') + '</td><td class="mw-input">http://<input id="wiki-url" type="text" placeholder="' + mw.msg('correctform-community-url') + '" style="width:200px"/>.wikia.com</td></tr><tr><td class="mw-label">' + mw.msg('correctform-form-items') + ':</td><td class="mw-input"><textarea name="items" id="items" cols="50" rows="3" maxlength="200" placeholder="' + mw.msg('correctform-form-items-placeholder') + '"></textarea></td></tr><tr><td class="mw-label">' + mw.msg('correctform-form-extrainfo') + ':</td><td class="mw-input"><textarea name="extrainfo" id="extrainfo" cols="50" rows="2" maxlength="200" placeholder="' + mw.msg('correctform-form-extrainfo-placeholder') + '"></textarea></td></tr><tr><td class="mw-label">' + mw.msg('correctform-form-signature') + ':</td><td class="mw-input"><input id="signature-place" type="text" value="' + _cr.signature + '"style="width:200px"/></td></tr></table></fieldset></form>', {
            id: "requestWindow",
            width: 650,
            buttons: [
                {
                    id: "cancel",
                    message: "Cancel",
                    handler: function () {
                        cancelformCorrect();
                    }
                },
                {
                    id: "submit",
                    defaultButton: true,
                    message: "Submit",
                    handler: function () {
                        submitformCorrect();
                    }
                }
            ]
        });
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
        console.log('Got the url: ', url);

        $.post(url, function (r) {
            console.log('Should be done now:', r);
            cancelformCorrect();
            window.location.reload();
        });
        console.log('Sent request...');
    }

    $.when(i18n.registerMessages('correctform',
        ['correctform-button',
            'correctform-save-wiki',
            'correctform-community-url',
            'correctform-form-name',
            'correctform-form-header',
            'correctform-form-header-placeholder',
            'correctform-form-language',
            'correctform-form-language-choose',
            'correctform-form-url',
            'correctform-form-information-header',
            'correctform-form-information-request',
            'correctform-form-items',
            'correctform-form-items-placeholder',
            'correctform-form-extrainfo',
            'correctform-form-extrainfo-placeholder',
            'correctform-form-signature'])).done(i18n.require('correctform').done(initCorrectForm));
}