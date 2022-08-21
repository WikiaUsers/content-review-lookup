/* https://dev.fandom.com/wiki/MediaWiki:MassRedirect/code.1.js
   Deleted 19:30, 8 September 2021 by KockaAdmiralac; deleted page MediaWiki:MassRedirect/code.1.js (Deleting pages that are still incompatible with the UCP after more than 1 year or marked for deletion for other reasons)
   https://dev.fandom.com/wiki/Special:Undelete?target=MediaWiki%3AMassRedirect%2Fcode.1.js&timestamp=20210713175539 (this version)
   https://dev.fandom.com/wiki/Special:Undelete?target=MediaWiki%3AMassRedirect%2Fcode.1.js (history)
*/

/**
 * @name        Mass Redirect Variant A
 * @description Redirect listed multiple pages to the stated page
 * @author      Ozuzanna
 */
mw.loader.using([ 'mediawiki.api', 'jquery', 'wikia.window' ]).then(function() {
    if (
        window.MassRedirect1Loaded ||
        !/sysop|content-moderator|bot|bot-global|staff|soap|helper|global-discussions-moderator|content-volunteer|wiki-representative|wiki-specialist/.test(mw.config.get('wgUserGroups').join())
    ) {
        return;
    }

    window.MassRedirect1Loaded = true;

    importArticle({
        type: 'style',
        article: 'MediaWiki:MassRedirect.css'
    });

    var api = new mw.Api();
/*window.dev = window.dev || {};
window.dev.placement = window.dev.placement || {};
window.dev.placement['MassRedirect/code.1'] = {
    element: 'tools',
    type: 'prepend'
};*/

mw.hook('dev.placement').add(function (placement) {
    placement.util({
        script: 'MassRedirect/code.1',
        element: 'tools',
        type: 'prepend',
        content: $('<li>').append(
            $('<a>', {
                text: 'Mass Redirect'
            })
        )
    });
});
/*
mw.hook('dev.placement').add(function (placement) {
    placement.script('MassRedirect/code.1');
    $(placement.element('tools'))[placement.type('prepend')](
        $('<li>').append(
            $('<a>', {
                text: 'Mass Redirect'
            })
        )
    );
});*/
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Placement.js'
});
/*    $('#my-tools-menu').prepend(
        $('<li>', {
            'class': 'custom'
        }).append(
            $('<a>', {
                id: 't-mred-a',
                text: 'Mass Redirect',
                click: click
            })
        )
    );*/
    
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
});