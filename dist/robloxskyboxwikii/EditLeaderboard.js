(function() {
    'use strict';

    if (window.EditLeaderboardLoaded) {
        return;
    }

    window.EditLeaderboardLoaded = true;

    var page = mw.config.get('wgTitle');
    var namespace = mw.config.get('wgNamespaceNumber');
    var action = mw.config.get('wgAction');

    
    if (
        page !== 'EditLeaderboard' ||
        namespace !== 4 ||
        action !== 'view'
    ) {
        return;
    }

    mw.util.addCSS(`
        #EditLeaderboard {
            border-collapse: collapse;
            width: 100%;
            margin-top: 15px;
        }

        #EditLeaderboard th {
            font-weight: 600;
            padding: 8px;
            text-align: left;
            border-bottom: 2px solid var(--theme-border-color);
        }

        #EditLeaderboard td {
            padding: 8px;
            border-bottom: 1px solid var(--theme-border-color);
        }

        #EditLeaderboard tr:hover {
            background: rgba(128, 128, 128, 0.1);
        }

        #EditLeaderboard .rank {
            width: 60px;
            font-weight: 600;
        }

        #EditLeaderboard .edits {
            width: 120px;
            text-align: right;
        }

        #EditLeaderboard .loading,
        #EditLeaderboard .error {
            text-align: center;
            padding: 20px;
        }
    `);

    mw.hook('wikipage.content').add(function($content) {

        if ($content.attr('id') !== 'mw-content-text') {
            return;
        }

        if ($('#EditLeaderboard').length) {
            return;
        }

        var $contentContainer = $('#content');
        var $pageTitle = $('.page-header__title');

        
        $contentContainer.empty();

        
        $pageTitle.text('Edit Leaderboard');
        $(document).prop('title', 'Edit Leaderboard');

       
        var $table = $(
            '<table id="EditLeaderboard">' +
                '<thead>' +
                    '<tr>' +
                        '<th class="rank">Rank</th>' +
                        '<th>Username</th>' +
                        '<th class="edits">Edits</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                    '<tr>' +
                        '<td colspan="3" class="loading">' +
                            'Loading leaderboard...' +
                        '</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>'
        );

        var $tableBody = $table.find('tbody');

        $contentContainer.append($table);

        var api = new mw.Api();

        api.get({
            action: 'listuserssearchuser',
            contributed: '1',
            limit: '1000',
            order: 'edits',
            sort: 'desc',
            offset: '0'
        }).done(function(data) {

            $tableBody.empty();

            var rank = 1;
            var users = data.listuserssearchuser || {};

            Object.values(users).forEach(function(user) {

                if (
                    !user ||
                    typeof user !== 'object' ||
                    /bot|bot-global/i.test(user.groups || '') ||
                    user.blocked === ''
                ) {
                    return;
                }

                var username = user.username;
                var editCount = user.edit_count;

                var $row = $('<tr>');

                $('<td>', {
                    class: 'rank',
                    text: rank
                }).appendTo($row);

                $('<td>').append(
                    $('<a>', {
                        href: mw.util.getUrl(
                            'User:' + username
                        ),
                        text: username
                    })
                ).appendTo($row);

                $('<td>', {
                    class: 'edits'
                }).append(
                    $('<a>', {
                        href: mw.util.getUrl(
                            'Special:Contributions/' + username
                        ),
                        text: editCount
                    })
                ).appendTo($row);

                $tableBody.append($row);

                rank++;
            });

            if (rank === 1) {
                $tableBody.append(
                    $('<tr>').append(
                        $('<td>', {
                            colspan: 3,
                            class: 'error',
                            text: 'No editors found.'
                        })
                    )
                );
            }

        }).fail(function() {

            $tableBody.empty();

            $tableBody.append(
                $('<tr>').append(
                    $('<td>', {
                        colspan: 3,
                        class: 'error',
                        text: 'Unable to load the edit leaderboard.'
                    })
                )
            );

        });
    });

})();