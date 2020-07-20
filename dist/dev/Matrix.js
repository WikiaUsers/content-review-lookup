/**
 * Name:        Matrix
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Makes a UserAcitivity-ish table on User:Username/matrix
 *              Runs only on English Community Central
 */
require([
    'wikia.window',
    'jquery',
    'mw',
    'ext.wikia.design-system.loading-spinner'
], function(window, $, mw, Spinner) {
    'use strict';
    var config = mw.config.get([
        'wgCityId',
        'wgUserName'
    ]);
    if (config.wgCityId !== '177' || window.MatrixLoaded) {
        return;
    }
    window.MatrixLoaded = true;
    var Matrix = {
        config: window.MatrixConfig || {},
        init: function() {
            this.api = new mw.Api();
            this.spinner = new Spinner(38, 2).html
                .replace('wds-block', 'wds-spinner__block')
                .replace('wds-path', 'wds-spinner__stroke');
            $('#my-tools-menu').append(
                $('<li>').append(
                    $('<a>', {
                        'class': 'custom',
                        text: 'Publish user activity'
                    }).click($.proxy(this.click, this))
                )
            );
        },
        click: function() {
            $('<div>', {
                css: {
                    background: 'rgba(255, 255, 255, 0.5)',
                    position: 'fixed',
                    height: '100%',
                    width: '100%',
                    left: '0',
                    top: '0',
                    'z-index': '1000000000',
                },
                html: this.spinner,
                id: 'matrix-spinner'
            }).appendTo(document.body);
            $.nirvana.getJson('UserActivity\\Controller', 'index', {
                cb: Date.now(),
                uselang: 'en'
            }, $.proxy(this.cbNirvana, this));
        },
        cbNirvana: function(d) {
            var urlRegex = /^https?:\/\/(.*)\.(?:wikia|fandom)\.(?:com|org)\/(?:([^\/]+)\/?)?$/,
                str = '{{/header|' + d.total + '}}\n' +
                      '{| width="100%" class="article-table sortable"\n' +
                      '|- class="useractivity-header"\n' +
                      '! id="title-header" | {{int:user-activity-table-title}}\n' +
                      '! id="edits-header" data-sort-type="number" | # of edits\n' +
                      '! id="last-edit-header" | {{int:user-activity-table-lastedit}}\n' +
                      '! id="rights-header" | {{int:user-activity-table-rights}}\n' +
                      d.items.filter(function(item) {
                          return !(config.private instanceof Array) ||
                                 config.private.indexOf(item.url) === -1;
                      }).reverse().map(function(item) {
                          var match = urlRegex.exec(item.url),
                              wiki = match[1];
                          if (match[2]) {
                              wiki = match[2] + '.' + wiki;
                          }
                          urlRegex.lastIndex = 0;
                          return '|-\n' +
                                 '| \'\'\'[[w:c:' + wiki + '|' + item.title + ']]\'\'\'\n' +
                                 '| [[w:c:' + wiki + ':Special:Contribs/' + config.wgUserName + '|' + item.editString + ']]\n' +
                                 '| ' + item.lastEdit + '\n' +
                                 '| ' + item.groups;
                      }).join('\n') +
                      '\n|}';
            this.api.post({
                action: 'edit',
                title: 'User:' + config.wgUserName + '/matrix',
                text: str,
                token: mw.user.tokens.get('editToken'),
                summary: 'Updating wiki list with Matrix.js',
                minor: true,
                bot: true
            }).done($.proxy(this.cbAPI, this));
        },
        cbAPI: function(d) {
            $('#matrix-spinner').remove();
            if (!d.error && d.edit.result === 'Success') {
                new BannerNotification('List of wikis successfully updated!', 'confirm').show();
            }
        }
    };
    mw.loader.using(['mediawiki.api']).then($.proxy(Matrix.init, Matrix));
});