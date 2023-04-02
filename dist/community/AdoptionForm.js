/**
 * Adoption Form - An automated ajax for for Community Central
 *
 * @author - Lil' Miss Rarity
 *
 * @license - GNU GPL v3.0
 */

(function ($, mw) {
    var cat;
    // Make the languages organised please!
    var i18n = { //removing languages other than EN (outdated, incomplete translations for some other languages are in the page history) ~Sophie
        'EN': {
            adopt_name: 'Name of wiki:',
            adopt_url: 'Full URL of wiki to adopt:',
            adopt_edits: 'Number of edits you have made on the wiki:',
            adopt_contribute: 'How long have you been actively contributing to the wiki:',
            adopt_sysop: 'Who was the last admin to edit and when:',
            adopt_info: 'Other information:',
            button_text: 'Create new request',
            success: 'Request successfully created!',
            error: 'Error while sending, try again soon.'
        }
    };

    //Language variable and the modal HTML to use
    var lang = mw.config.get('wgUserLanguage').toUpperCase(),
        wgUsername = mw.config.get('wgUserName'),
        adoption_modal = '<form class="WikiaForm" method="" name=""><fieldset><span>' + i18n[lang].adopt_name + ' </span><br /><input type="text" id="cc-form-name" style="width: 500px;" placeholder="Community Central" /><br /><span>' + i18n[lang].adopt_url + ' </span><br/><input type="text" id="cc-adopt-url" style="width: 500px;" placeholder="https://community.fandom.com"/><br /><span>' + i18n[lang].adopt_edits + ' </span><br/><input type="text" id="cc-adopt-edits" style="width: 500px;" placeholder="0"/><br /><span>' + i18n[lang].adopt_contribute + ' </span><br/><input type="text" id="cc-adopt-duration" style="width: 500px;" placeholder="30 Days"/><br /><span>' + i18n[lang].adopt_sysop + ' </span><br/><input type="text" id="cc-adopt-admin" style="width: 500px;" placeholder="Jonnie, February 7, 1527"/><br /><span>' + i18n[lang].adopt_info + ' </span><br/><textarea rows="10" cols="75" id="cc-adopt-other" placeholder="..."></textarea></fieldset></form>';

    //Simple snippet to decide whether or not the user is on the right page and acts on the results

    /****************************************************
    # This will only alter the existing form if the user
    # is using the wikia skin and will leave monobook 
    # operations unhindered.
    *****************************************************/

    if (mw.config.get('skin') == "oasis" || mw.config.get('skin') == 'wikia') {
        if (
            mw.config.get('wgPageName') === 'Adoption:Other_requests' ||
            mw.config.get('wgPageName') === 'Adoption:Gaming_requests' ||
            mw.config.get('wgPageName') === 'Adoption:TV-Movie_requests' ||
            mw.config.get('wgPageName') === 'Adoption:Anime_requests'
        ) {
            var node = document.createElement('a');
            node.textContent = i18n[lang].button_text;
            node.className = 'wikia-button';
            node.id = 'cc-form-open';
            node.addEventListener('click', function () {
                generateForm(adoption_modal, 1);
            });
            $('.createbox').html(node);
            cat = mw.config.get('wgTitle').replace(/ requests$/, '').replace(/-/, '/');
        }
    }

    /******************************************************
    # param html: HTML to populate the form with.
    # param number: Which function to call on button press.
    *******************************************************/

    function generateForm(html, number) {
        $.showCustomModal('Create Request', html, {
            id: 'cc-form',
            width: 650,
            buttons: [{
                id: 'cc-form-cancel',
                message: 'Cancel',
                handler: function () {
                    $('#cc-form').closeModal();
                }
            }, {
                id: 'cc-form-submit',
                defaultButton: true,
                message: 'Submit',
                handler: function () {
                    if (number === 1) {
                        adoption();
                    } else if (number === 2) {
                        interLink();
                    } else {
                        return;
                    }
                }
            }]
        });
    }

    //Gathers data from form and puts it together

    function adoption() {
        var url = document.getElementById("cc-adopt-url").value || 'null',
            wiki_name = document.getElementById("cc-form-name").value || 'null',
            user_edits = document.getElementById("cc-adopt-edits").value || 'null',
            days_contributed = document.getElementById("cc-adopt-duration").value || 'null',
            last_sysop = document.getElementById("cc-adopt-admin").value || 'null',
            other_info = document.getElementById("cc-adopt-other").value || 'null';
        if (url == 'null' || wiki_name == 'null') {
            alert('Please ensure the url and wiki name fields are filled out.');
        } else {
    var form = '<div class=\"forumheader\">[[Adoption:Requests|Adoption requests]] \'\'\'→\'\'\' {{PAGENAME}}</div>'
        + '<!-- Please put your request under this line. Be sure to sign your request with four tildes: ~~~~ -->\n\n'
        + '\'\'\'Username:\'\'\'\n[[User:'
        + wgUsername
        + '|'
        + wgUsername
        + ']]\n\n'
        + '\'\'\'Wiki URL:\'\'\'\n'
        + url
        + '\n\n'
        + '\'\'\'Current edit count:\'\'\'\n'
        + user_edits
        + '\n\n'
        + '\'\'\'How long I have edited there:\'\'\'\n'
        + days_contributed
        + '\n\n'
        + '\'\'\'Last admin to edit and when:\'\'\'\n'
        + last_sysop
        + '\n\n'
        + '\'\'\'Other information:\'\'\'\n'
        + other_info
        + '\n\n'
        + '[[' + 'Category:' + cat + ' adoption requests' + '|{{PAGENAME}}]]';
            postToApi(true, 'Adoption: ' + wiki_name, form, wiki_name);
        }
    }

    /*************************************************************
    # param isAdoption: true for adoption, false for language link
    # param page: page to edit/create
    # param text: text to add/create with
    **************************************************************/

    function postToApi(isAdoption, page, text, wiki) {
        if (isAdoption === true) {
            $.ajax({
                url: mw.util.wikiScript('api'),
                data: {
                    format: 'json',
                    action: 'edit',
                    title: page,
                    summary: 'New adoption request',
                    text: text,
                    createonly: true,
                    token: mw.user.tokens.values.editToken
                },
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data && data.edit && data.edit.result == 'Success') {
                        $('#cc-form').closeModal();
                        $.showCustomModal("Success", '<p>' + i18n[lang].success + '</p>', {
                            id: 'cc-result',
                            width: 300,
                            buttons: [{
                                id: 'cc-result-cancel',
                                defaultButton: true,
                                message: 'Close',
                                handler: function () {
                                    $('#cc-result').closeModal();
                                }
                            }]
                        });
                    } else if (data && data.error) {
                        $('#cc-form').closeModal();
                        $.showCustomModal("Error", '<p>' + i18n[lang].error + '<br /><br />Error: ' + data.error.info + '. <br /><br />Please add a number inside of parenthesis when trying again like so: ' + wiki + ' (2)</p>', {
                            id: 'cc-result',
                            width: 300,
                            buttons: [{
                                id: 'cc-result-cancel',
                                defaultButton: true,
                                message: 'Close',
                                handler: function () {
                                    $('#cc-result').closeModal();
                                }
                            }]
                        });
                    } else {
                        $('#cc-form').closeModal();
                        $.showCustomModal("Error", '<p>' + i18n[lang].error + '</p>', {
                            id: 'cc-result',
                            width: 300,
                            buttons: [{
                                id: 'cc-result-cancel',
                                defaultButton: true,
                                message: 'Close',
                                handler: function () {
                                    $('#cc-result').closeModal();
                                }
                            }]
                        });
                    }
                },
                error: function (xhr) {
                    generateResult('Error', i18n[lang].error);
                    $.showCustomModal("Error", '<p>' + i18n[lang].error + '</p>', {
                        id: 'cc-result',
                        width: 300,
                        buttons: [{
                            id: 'cc-result-cancel',
                            defaultButton: true,
                            message: 'Close',
                            handler: function () {
                                $('#cc-result').closeModal();
                            }
                        }]
                    });
                }
            });
        }
        else { 
            return; 
        }
    }
}(jQuery, mediaWiki));