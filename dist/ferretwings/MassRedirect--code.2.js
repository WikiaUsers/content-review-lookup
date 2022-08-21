/* https://dev.fandom.com/wiki/MediaWiki:MassRedirect/code.2.js
   Deleted 19:30, 8 September 2021 by KockaAdmiralac; deleted page MediaWiki:MassRedirect/code.2.js (Deleting pages that are still incompatible with the UCP after more than 1 year or marked for deletion for other reasons)
   https://dev.fandom.com/wiki/Special:Undelete?target=MediaWiki%3AMassRedirect%2Fcode.2.js&timestamp=20210713175540 (this version)
   https://dev.fandom.com/wiki/Special:Undelete?target=MediaWiki%3AMassRedirect%2Fcode.2.js (history)
*/

/**
 * @name        Mass Redirect Variant B
 * @description Redirects listed page pairs
 * @author      Ozuzanna
 */
mw.loader.using([ 'mediawiki.api', 'jquery', 'wikia.window' ]).then(function() {
    if (
        window.MassRedirect2Loaded ||
        !/sysop|content-moderator|bot|bot-global|staff|soap|helper|global-discussions-moderator|content-volunteer|wiki-representative|wiki-specialist/.test(mw.config.get('wgUserGroups').join())
    ) {
        return;
    }

    window.MassRedirect2Loaded = true;

    importArticle({
        type: 'style',
        article: 'MediaWiki:MassRedirect.css'
    });

    var api = new mw.Api();
    var delay = window.massRedirectDelay || 1000;
    var FormHTML =
        $('<form>', {
            'class': 'WikiaForm'
        }).append(
            $('<fieldset>').append(
                $('<p>', {
                    text: 'Put the name of each page you want to redirect on a separate line and the name of the page you want to redirect it to next to it. Use underscores instead of spaces except for the space between the two pages.'
                }),
                $('<textarea>', {
                    id: 'text-mass-redirect-b'
                }),
                $('<div>', {
                    id: 'text-error-output',
                    text: 'Any errors encountered will appear below'
                }).append(
                    $('<br/>')
                )
            )
        );
mw.hook('dev.placement').add(function (placement) {
    placement.script('MassRedirect/code.2');
    $(placement.element('tools'))[placement.type('prepend')](
        $('<li>').append(
            $('<a>', {
                text: 'Mass Redirect'
            })
        )
    );
});
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Placement.js'
});
/*    $('#my-tools-menu').prepend(
        $('<li>', {
            'class': 'custom'
        }).append(
            $('<a>', {
                id: 't-mred-b',
                text: 'Mass Redirect',
                click: click
            })
        )
    );*/

    function click () {
        $.showCustomModal('Mass Redirect', FormHTML, {
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
                handler: init
            }]
        });
    }

    function init() {
        var startButton = document.getElementById('startButton');
        var txt = document.getElementById('text-mass-redirect-b');
        var lines = txt.value.split('\n');
        var line = lines[0];
        var pages = line.split(' ').map(function (page) {
            return page.replace('_', ' ');
        });

        startButton.setAttribute('disabled', 'disabled');

        if (!line) {
            startButton.removeAttribute('disabled');
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
        } else if (pages.length != 2) {
            $('#text-error-output').append(line + ' is invalid input!<br>');
        } else {
            redirect(pages[0], pages[1]);
        }

        txt.value = lines.slice(1).join('\n');
    }

    function addCategoryContents() {
        var category = prompt('Please enter the category name (no category prefix):');

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

    function redirect(title, target) {
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
        setTimeout(init, delay);
    }
    
    function error(message) {
        console.log(message);
        $('#text-error-output').append(message + '<br/>');
    }
});