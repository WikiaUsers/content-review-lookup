/*
Issue submission form
*/

;(function($, mw) {
    mw.loader.using(['mediawiki.api', 'mediawiki.util'], function() {
        var issuepage = "RuneScape:Issues";
        var maxsize = 500;
        var $IssueForm, $fieldset, $txtarea, $txtareacount, $msgs, $openForm, pagename;
        var status = 0; //0 ready, 1 submitting, 2 submitted
        var userSettings;
        var settingsName = 'rsw-issue-form';
        var defaultSettings = { form: {}, tracked: {} };



        function msg(message) {
            $msgs.append('<li>' + message+'</li>');
        }

        function internallink(link,txt) {
            var t = link;
            if (txt) {
                t = txt;
            }
            return '<a href="'+mw.util.wikiGetlink(link)+'">' + t + '</a>';
        }

        // fetch settings from localStorage
        function getSettings() {
            var settings;
            try {
                // just in case something goes wrong
                settings = JSON.parse(window.localStorage.getItem(settingsName));
            }
            catch (err) {
                settings = {};
            }
            if (settings === null) {
                settings = {};
            }
            userSettings = $.extend({}, defaultSettings, settings);
        }

        // update cached settings and put them back into localStorage
        // use this over directly setting to userSettings
        function updateStorage() {
            window.localStorage.setItem(settingsName, JSON.stringify(userSettings));
        }
        function updateFormData(k,v) {
            userSettings.form[k] = v;
            updateStorage();
        }
        function removeFormData(k) {
            delete userSettings.form[k];
            updateStorage();
        }
        function addTracked(k) {
            userSettings.tracked[k] = false;
        }

		//TODO: interface to view previously submitted issues


        function init () {
            pagename = mw.config.get('wgPageName');
            var pagetitle = pagename.replace(/_/g, ' ');
            $txtarea = $('<textarea>')
                .attr({
                'id': 'issue-form-box',
                'autofocus': true,
                'maxlength': maxsize,
                'minlength': 1,
                'name': 'issue-form-box',
                'placeholder': 'Enter your issue here',
            });

            $txtareacount = $('<div>')
                .attr({
                'id': 'issue-form-count'
            })
                .append('0/'+maxsize);

            $txtarea.keyup(function() {
                $txtareacount.text($txtarea.val().length + '/'+maxsize);
            });

            $msgs = $('<ul>')
                .attr({
                'id': 'issue-form-msg'
            });
            //    .append('<li>Waiting to submit...</li>');

            $fieldset = $('<fieldset>')
                .append('<p class="issue-form-text">Describe your problem with <strong>' + pagetitle + '</strong> below. Your response will be publicly visible, so please do not enter any personal information.</p>')
                .append('<p class="issue-form-text">For general help or questions about the wiki, visit ' + internallink('RuneScape:User help','this page') + ' instead. Remember that the RuneScape Wiki is ' + internallink('RuneScape:RuneScape_Wiki_is_not...#..._Jagex', 'not Jagex') + ', so we cannot help you with in-game issues.</p>')
                .append($txtarea)
                .append($txtareacount)
                //.append('<strong style="font-weight:bold;">Status messages:</strong>')
                .append($msgs);

            $IssueForm = $('<form>')
                .attr({
                'id': 'issue-form-wrapper',
                'method': '',
                'name': 'issue-form-wrapper',
            })
                .addClass('WikiaForm')
                .append($fieldset);

            $openForm = $('<li class="custom"><a style="cursor:pointer" id="t-issues-form">Quick issue form</a></li>');
            $('.toolbar ul.tools').append($openForm);


            $openForm.click(function () {
                $.showCustomModal('Report an issue', $IssueForm, {
                    id: 'issues-form-modal',
                    width: 500,
                    buttons: [{
                        id: 'issueFormCancelButton',
                        message: 'Cancel',
                        handler: function() {
                            $('#issues-form-modal').closeModal();
                        }
                    }, {
                        id: 'issueFormSubmitButton',
                        message: 'Submit',
                        defaultButton: true,
                        handler: function () {
                            submitForm();
                        }
                    }]
                });
                $('#issueFormSubmitButton').addClass('wds-button wds-is-squished').removeClass('wikia-button');
                $('#issueFormCancelButton').addClass('wds-button wds-is-secondary wds-is-squished').removeClass('wikia-button secondary');
            });
        }

        function setIssueFormStatus(s) {
            status = s;
            switch (status) {
                case 0:
                    $('#issueFormSubmitButton').removeAttr('disabled').text('Submit');
                    $txtarea.prop('disabled', false);
                    break;
                case 1:
                    $('#issueFormSubmitButton').attr('disabled', 'disabled').text('Submitting...');
                    $txtarea.prop('disabled', true);
                    break;
                case 2:
                    $('#issueFormSubmitButton').attr('disabled', 'disabled').text('Submitted!');
                    $txtarea.prop('disabled', true);
                    break;
            }
        }

        function submitForm() {
            if (status > 0) {
                return;
            }
            if ($txtarea.val().length === 0) {
                msg('You didn\'t enter anything!');
                return;
            }
            setIssueFormStatus(1);
            msg('Submitting...');
            var now = Date.now();
            var curissuepagename = issuepage + '/' + pagename + '/' + now;

            var username = mw.config.get('wgUserName');

            function getTxt(time) {
                return [
                    '{{Issue',
                    '|time=' + Math.floor(time/1000),
                    '|user=' + (username === null ? '{{Signatures/Gaz Lloyd}}' : '[[Special:Contributions/' + username + '|' + username + ']]'),
                    '|issue=<nowiki>'+$txtarea.val()+'</nowiki>',
                    '|resolved=false',
                    '}}'
                ].join('\n');
            }



            function callAPI(data, method, callback) {
                data['format'] = 'json';
                $.ajax({
                    data: data,
                    dataType: 'json',
                    url: mw.config.get('wgScriptPath') + '/api.php',
                    type: method,
                    success: function(response) {
                        if (response.error)
                            msg('API error: ' + response.error.info);
                        else 
                            callback(response);
                    },
                    error: function(xhr, error) { msg('AJAX error: ' + error); }
                })
                    .fail();
            }

            function edit( title, txt, callback ) {
                curissuepagename = title;
                var basetimestamp, curtimestamp;
                return callAPI( {
                    action: 'query',
                    prop: 'info|revisions',
                    rvprop:  'content|timestamp' ,
                    titles: String( title ),
                    rvlimit: 1,
                    indexpageids: true,
                    format: 'jsonfm',
                    intoken: 'edit',
                }, 'GET', function ( data ) {
                    console.log(data);
                    if ( !data.query || !data.query.pages ) {
                        return $.Deferred().reject( 'unknown' );
                    }
                    curtimestamp = data.starttimestamp;

                    callAPI({
                        action: 'edit',
                        title: title,
                        formatversion: '2',
                        token: mw.user.tokens.get('editToken'),
                        summary: 'Submit new issue',
                        text: txt,

                        // Protect against errors and conflicts
                        starttimestamp: curtimestamp,
                        createonly: true

                    }, 'POST', callback);
                } );
            }

            function editcallback(data) {
                if (data.error) {
                    msg("Oops, an error occured when trying to submit the issue. Details to follow...");
                    switch (data.error.code) {
                        case "blocked":
                        case "autoblocked":
                            msg("Sorry, you can't submit an issue if you are blocked. If you believe this is in error, place the {{Unblock}} template on " + internallink('Special:MyTalk','your talk page') + " to request an unblock.");
                            break;
                        case "ratelimited":
                            msg("Whoa! Slow down your issue submissions. You've triggered the rate limit – wait a few minutes before submitting again.");
                            break;
                        case "readonly":
                            msg("The RuneScape Wiki's database is in read-only mode. This shouldn't last too long – an hour at most. Try submitting again later.");
                            break;
                        case "articleexists":
                            edit(issuepage + '/' + pagename + '/' + (now+1), getTxt(now), editcallback);
                            return;
                        default:
                            msg("An unknown error occured. Please pass this error information on to an administrator " + internallink('RuneScape:Administrative requests','here') + ":");
                            msg("Error code:" + data.error.code);
                            msg("Error info:" + data.error.info);
                            break;
                    }
                    setIssueFormStatus(0);
                } else {
                    //msg('Submitted!');
                    msg('Your issue has been recorded ' + internallink(curissuepagename, 'here.') + ' Please check back later to see if it has been resolved, or to answer any followup questions users may have for you.');
                    setIssueFormStatus(2);
                }
            }

            edit(curissuepagename, getTxt(now), editcallback);
        }
        $(init);
    });
})(window.jQuery, window.mw);