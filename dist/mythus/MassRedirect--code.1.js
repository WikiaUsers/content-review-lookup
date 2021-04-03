/**
 * @name        Mass Redirect Variant A
 * @description Redirect listed multiple pages to the stated page
 * @author      Ozuzanna
 */
(function ($, mw) {
    if (
        window.MassRedirect1Loaded ||
        !/sysop|content-moderator|bot|bot-global|staff|soap|helper|global-discussions-moderator|content-volunteer|wiki-manager|content-team-member/.test(mw.config.get('wgUserGroups').join())
    ) {
        return;
    }
 
    window.MassRedirect1Loaded = true;
 
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:MassRedirect.css'
    });
 
    var api = new mw.Api();
 
    $('#my-tools-menu').prepend(
        $('<li>', {
            'class': 'custom'
        }).append(
            $('<a>', {
                id: 't-mred-a',
                text: 'Mass Redirect',
                click: click
            })
        )
    );
 
    function formHtml () {
        return $('<form>', {
            'class': 'WikiaForm'
        }).append(
            $('<fieldset>').append(
                $('<p>', {
                    text: 'Page to redirect to:'
                }).append(
                    $('<input>', {
                        type: 'text',
                        id: 'redirect-page'
                    })
                ),
                $('<p>', {
                    text: 'Put the name of each page you want to redirect on a separate line. Remember to include the namespace too if it is not in main.'
                }),
                $('<textarea>', {
                    id: 'text-mass-redirect-a'
                }),
                $('<div>', {
                    id: 'text-error-output',
                    text: 'Any errors encountered will appear below'
                }).append(
                    $('<br/>')
                )
            )
        ).prop('outerHTML');
    }
 
    function click () {
        $.showCustomModal('Mass Redirect', formHtml(), {
            id: 'mass-redirect',
            width: 500,
            buttons: [{
                message: 'Cancel',
                handler: function () {
                    $('#mass-redirect').closeModal();
                }
            }, {
                message: 'Add category contents',
                defaultButton: true,
                handler: addCategoryContents
            }, {
                id: 'startButton',
                message: 'Initiate',
                defaultButton: true,
                handler: process
            }]
        });
    }
 
    function process () {
        var startButton = document.getElementById('startButton');
        var txt = document.getElementById('text-mass-redirect-a');
        var destination = document.getElementById('redirect-page').value;
        var pages = txt.value.split('\n');
        var page = pages[0];
 
        if (page) {
            redirect(page, destination);
        } else {
            $.showCustomModal('Finished!', 'Nothing left to do, or next line is blank.', {
                id: 'mass-redirect-complete',
                width: 200,
                buttons: [{
                    message: 'Close',
                    defaultButton: true,
                    handler: function () {
                        $('#mass-redirect-complete').closeModal();
                    }
                }]
            });
        }
 
        txt.value = pages.slice(1).join('\n');
    }
 
    function addCategoryContents () {
        var category = prompt('Please enter the category name (no category prefix):');
        if (!category) {
            return;
        }
        api.get({
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:' + category,
            cmlimit: 'max'
        })
        .done(function (d) {
            if (d.error) {
                error('Failed to get contents of ' + category + ' : ' + d.error.code);
            } else {
                for (var i in d.query.categorymembers) {
                    $('#text-mass-redirect-a').append(d.query.categorymembers[i].title + '\n');
                }
            }
        })
        .fail(function () {
            error('Failed to get contents of ' + category + '!');
        });
    }
 
    function redirect (title, target) {
        api.post({
            action: 'edit',
            title: title,
            watchlist: 'nochange',
            text: '#REDIRECT [[' + target + ']]',
            bot: true,
            token: mw.user.tokens.get('editToken')
        })
        .done(function (d) {
            if (d.error) {
                error('Failed to redirect ' + title + ': ' + d.error.code);
            } else {
                console.log('Redirection of ' + title + ' successful!');
            }
        })
        .fail(function () {
            error('Failed to redirect ' + title + '!');
        });
        setTimeout(process, window.massRedirectDelay || 1000);
    }
 
    function error (message) {
        console.log(message);
        $('#text-error-output').append(message + '<br/>');
    }
})(this.jQuery, this.mediaWiki);