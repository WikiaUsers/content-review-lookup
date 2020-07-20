//Creates modal forms for use on [[w:Adoptie:Aanvragen]] and [[w:Project:Interlanguage link requests]]
//Author: @Prince(ss) Platinum
/* Special thanks to TK-999 for helping with the i18n stuff
and a special thanks to the Wikia Language Brigade for localizing the script. */

(function ($, mw) {
    // Make the languages organised please!
    var i18n = {
            'EN': {
            adopt_name: 'Name of wiki:',
            adopt_url: 'Full URL of wiki to adopt:',
            adopt_edits: 'Number of edits you have made on the wiki:',
            adopt_contribute: 'How long have you been actively contributing to the wiki:',
            adopt_sysop: 'Who was the last admin to edit and when:',
            adopt_info: 'Other information:',
            inter_info: '<span style="font-weight: bold">How to: </span>To add a request to link two wikis together using this form you must use the following syntax: <br/><pre>firstwiki -> secondwiki</pre><br/>If you want to link <a href="http://community.wikia.com">http://community.wikia.com</a> to <a href="http://de.community.wikia.com">http://de.community.wikia.com</a> you would use the following code in the textarea below: <br/><pre>community -> de.community</pre><br/>To submit multiple link requests at once put each code on a new line like such: <br/><pre>community -> de.community<br/>community -> pl.community</pre></p><span>Wikis to link: </span>',
            button_text: 'Create new request',
            success: 'Request successfully created!',
            error: 'Error while sending, try again soon.'
        }
    };

    //Language variable and the modal HTML to use
    var lang = mw.config.get('wgUserLanguage').toUpperCase(),
        wgUsername = mw.config.get('wgUserName'),
        adoption_modal = '<form class="WikiaForm" method="" name=""><fieldset><span>' + i18n[lang].adopt_name + ' </span><br /><input type="text" id="cc-form-name" style="width: 500px;" placeholder="Community Central" /><br /><span>' + i18n[lang].adopt_url + ' </span><br/><input type="text" id="cc-adopt-url" style="width: 500px;" placeholder="http://c.wikia.com"/><br /><span>' + i18n[lang].adopt_edits + ' </span><br/><input type="text" id="cc-adopt-edits" style="width: 500px;" placeholder="0"/><br /><span>' + i18n[lang].adopt_contribute + ' </span><br/><input type="text" id="cc-adopt-duration" style="width: 500px;" placeholder="30 Days"/><br /><span>' + i18n[lang].adopt_sysop + ' </span><br/><input type="text" id="cc-adopt-admin" style="width: 500px;" placeholder="Jonnie, February 7, 1527"/><br /><span>' + i18n[lang].adopt_info + ' </span><br/><textarea rows="10" cols="75" id="cc-adopt-other" placeholder="..."></textarea></fieldset></form>',
        link_modal = '<form class="WikiaForm" method="" name=""><fieldset><p>' + i18n[lang].inter_info + '<br/><textarea rows="10" cols="81" id="cc-adopt-other" placeholder="community -> de.communty"></textarea></fieldset></form>',
        signature = '~~' + '~~';

    //Simple snippet to decide whether or not the user is on the right page and acts on the results

    /****************************************************
    # This will only alter the existing form if the user
    # is using the wikia skin and will leave monobook 
    # operations unhindered.
    *****************************************************/

    if (mw.config.get('skin') == "oasis" || mw.config.get('skin') == 'wikia') {
        if (mw.config.get('wgPageName') === "Adoptie:Aanvragen") {
            var node = document.createElement('a');
            node.textContent = i18n[lang].button_text;
            node.className = 'wikia-button';
            node.id = 'cc-form-open';
            node.addEventListener('click', function () {
                generateForm(adoption_modal, 1);
            });
            $('div.createbox').html(node);
        }
        /* else if (mw.config.get('wgPageName') === "Community_Central:Interlanguage_link_requests") {
            var node = document.createElement('a');
                node.textContent = 'Create new request';
                node.className = 'wikia-button';
                node.id = 'cc-form-open';
                node.addEventListener('click', function () {
                    generateForm(link_modal, 2);
                });
            $('div.createbox').html($(node));
        }*/
    }

    /******************************************************
    # param html: HTML to populate the form with.
    # param number: Which function to call on button press.
    *******************************************************/

    function generateForm(html, number) {
        $.showCustomModal('Create Request', html, {
            id: 'cc-form',
            width: 650, //A way to add percentages would be great!
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
	var form = '<div class=\"forumheader\">[[Adoptie:Aanvragen|Adoption requests]] \'\'\'→\'\'\' {{PAGENAME}}</div>'
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
		+ '[[' + 'Category:Adoption requests' + '|{{PAGENAME}}]]';
            postToApi(true, 'Adoption: ' + wiki_name, form, wiki_name);
        }
    }

    //Gathers data from form and put's it together

    function interLink() {}

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
                            width: 300, //A way to add percentages would be great!
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
                            width: 300, //A way to add percentages would be great!
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
                            width: 300, //A way to add percentages would be great!
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
                        width: 300, //A way to add percentages would be great!
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
        /*else if (isAdoption === false) {
            $.post('/api.php', {
                action: 'edit',
                title: mw.config.get('wgPageName'),
                text: text,
                summary: 'Adding new link request (script generated)',
                token: mw.user.tokens.values.editToken
            }).done(function () {
                generateResult('Success', i18n[lang].success);
                $('#cc-form').closeModal();
            }).fail(function () {
                generateResult('Error', i18n[lang].error);
                $('#cc-form').closeModal();
            });
        }*/
        else { return; }
    }
}(jQuery, mediaWiki));