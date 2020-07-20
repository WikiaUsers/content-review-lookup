/*** SavedDrafts.js by SlyCooperFan1 ***/

require([
    'jquery',
    'mw',
    'wikia.window'
], function( $, mw, window ) {
    'use strict';

    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgMonthNames'
    ]);

    if ( window.SavedDraftsLoaded ) return;
    window.SavedDraftsLoaded = true;

    function init(i18n) {
        $('.wds-global-navigation__user-menu .wds-list li:eq(3)').after(
            $('<li>').append(
                $('<a>', {
                    text: i18n.msg( 'my-drafts' ).plain(),
                    href: mw.util.getUrl('Special:BlankPage', {
                        blankspecial: 'saveddrafts'
                    })
                })
            )
        );

        if (
            config.wgCanonicalSpecialPageName !== 'Blankpage' ||
            $.getUrlVar( 'blankspecial' ) !== 'saveddrafts'
        ) return;

        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:SavedDrafts.css'
        });

        $('.page-header__title').text(i18n.msg('title').plain());
        $('title').text($('title').text().replace(i18n.msg('blank').plain(), i18n.msg('title').plain()));

        $('#mw-content-text').empty().append(
            $('<p>', { text: i18n.msg( 'intro' ).plain() }),
            $('<p>', { text: i18n.msg( 'wiki-info' ).plain() }),
            $('<table>', {
                class: 'article-table',
                id: 'draftTable'
            }).append(
                $('<tr>').append(
                    $('<th>', { text: i18n.msg( 'discard' ).plain() }),
                    $('<th>', { text: i18n.msg( 'page-name' ).plain() }),
                    $('<th>', { text: i18n.msg( 'last-save' ).plain() })
                )
            )
        );

        function deleteDraft(x, y){
            if ( confirm( i18n.msg( 'confirm', y ).plain() ) === true ) {
                localStorage.removeItem(x);
                $('#draftTable tr[data-draft-name="' + x + '"]').fadeOut();
            }
        }

        function getStartTime(str) {
            var startTime = JSON.parse(str).startTime,
                startYear = startTime.substring(0, 4),
                startMonth = config.wgMonthNames[parseInt(startTime.substring(4, 6))],
                startDay = parseInt(startTime.substring(6, 8)),
                startHour = startTime.substring(8, 10),
                startMin = startTime.substring(10, 12),
                startSec = startTime.substring(12);
            return startMonth + ' ' + startDay + ', ' + startYear + ', ' + startHour + ':' + startMin + ':' + startSec;
        }

        for ( var i = 0; i < localStorage.length; i++ ) {
            var draftName = localStorage.key(i);
            if ( draftName.indexOf('-draft') === -1 ) {
                continue;
            }
            var startTime = getStartTime(localStorage.getItem(draftName)),
                draftDisplay = draftName.replace('-draft', ''),
                draftLink = mw.util.getUrl( draftDisplay );
            draftDisplay = draftDisplay.replace(/_/g, ' ');

            $('#draftTable').append(
                $('<tr>', { 'data-draft-name': draftName }).append(
                    $('<td>').append(
                        $('<span>', {
                            text: '❌',
                            id: 'discard_draft'
                        })
                    ),
                    $('<td>').append(
                        $('<strong>').append(
                            $('<a>', {
                                href: draftLink,
                                text: draftDisplay
                            })
                        )
                    ),
                    $('<td>', { text: startTime })
                )
            );
            $('#discard_draft').click(deleteDraft.bind(null, draftName, draftDisplay));
        }
    }

    mw.hook( 'dev.i18n' ).add(function(i18n) {
        i18n.loadMessages( 'SavedDrafts' ).then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});