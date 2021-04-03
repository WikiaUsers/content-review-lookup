/**
 * Name:        HighlightUpdate
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405523@gmail.com>
 * Description: Adds a button for updating [[MediaWiki:Highlight.css]].
 */
(function () {
    'use strict';
    var config = mw.config.get([
        'wgArticleId',
        'wgCityId',
        'wgVersion'
    ]);
    if (
        config.wgArticleId !== 2160 ||
        Number(config.wgCityId) !== 7931 ||
        $('#ca-highlights').length
    ) {
        return;
    }
    var HighlightUpdater = {
        groups: {
            'vanguard': {
                color: '#1eaf7a',
                cssVar: 'vanguard'
            },
            'voldev': {
                color: '#23c8d2',
                cssVar: 'voldev'
            },
            'global-discussions-moderator': {
                color: '#4286f4',
                cssVar: 'gdm'
            },
            'soap': {
                color: '#ff7777',
                cssVar: 'soap'
            },
            'helper': {
                color: '#4c5f1d',
                cssVar: 'helper'
            },
            'content-team-member': {
                color: '#d27d2c',
                cssVar: 'ctm'
            },
            'wiki-manager': {
                color: '#09e5a2',
                cssVar: 'wiki-manager'
            },
            'staff': {
                color: '#ddaa00',
                cssVar: 'staff'
            }
        },
        overrides: {
            add: {
                'SOAP_Bot': ['soap']
            },
            remove: {
                'CT1000': ['soap'],
                'Data-engineering-bot': ['global-discussions-moderator'],
                'DSlayful': [
                    'staff',
                    'helper',
                    'soap'
                ],
                'Noreports': ['global-discussions-moderator'],
                'Socvoluntary': ['soap'],
                'Testludwikvs': ['soap'],
                'Ucpnltest2': ['soap'],
                'Ursuula': [
                    'wiki-manager',
                    'content-team-member'
                ],
                'Wiki-o-slay': ['soap']
            }
        },
        init: function() {
            this.api = new mw.Api();
            $('.page-header__contribution-buttons .wds-list').append(
                $('<li>').append(
                    $('<a>', {
                        click: $.proxy(this.click, this),
                        id: 'ca-highlights',
                        text: 'Update highlights',
                        href: '#'
                    })
                )
            );
        },
        click: function() {
            this.api.get({
                action: 'query',
                list: 'groupmembers',
                gmgroups: Object.keys(this.groups).join('|') + '|bot-global',
                gmlimit: 'max',
                pageids: 2160,
                prop: 'revisions',
                rvprop: 'content',
                indexpageids: true,
                cb: Date.now()
            }).then($.proxy(this.callback, this));
        },
        callback: function(data) {
            var users = {};
            var overrides = this.overrides;
            for (var group1 in this.groups) {
                users[group1] = [];
            }
            data.users.forEach(function(u) {
                var groups = u.groups;
                if (overrides.remove[u.name]) {
                    overrides.remove[u.name].forEach(function(g) {
                        if (groups.indexOf(g) !== -1) {
                            groups.splice(groups.indexOf(g), 1);
                        }
                    });
                }
                if (groups.indexOf('bot-global') !== -1) {
                    return;
                }
                groups.forEach(function(g) {
                    users[g].push(u.name);
                });
            });
            Object.keys(overrides.add).forEach(function(name) {
                overrides.add[name].forEach(function(g) {
                    if (users[g] && users[g].indexOf(name) === -1) {
                        users[g].push(name);
                    }
                });
            });
            var text = '';
            for (var group in users) {
                text +=
                    '/* ' + group + ' */\n' +
                    this.getSelectorsFor(group, users[group].sort())
                    .join(',\n') + ' {\n' + 
                    '    color: ' + this.groups[group].color +
                    ' !important;\n' + 
                    '    color: var(--highlight-' + this.groups[group].cssVar +
                    ') !important;\n}\n\n';
            }
            this.api.post({
                action: 'edit',
                text: data.query.pages[data.query.pageids[0]]
                    .revisions[0]['*']
                    .replace(
                        /(\/\* HighlightUpdate-start \*\/\n)[\s\S]*$/igm,
                        function(_, m) {
                            return m + text;
                        }
                    ),
                title: 'MediaWiki:Highlight.css',
                // eslint-disable-next-line max-len
                summary: 'Automatically updating via [[MediaWiki:Highlight.js|Highlight.js]]',
                minor: true,
                bot: true,
                token: mw.user.tokens.get('editToken')
            }).then($.proxy(this.edited, this));
        },
        getSelectorsFor: function(group, users) {
            var encode = [];
            users.forEach(function(u) {
                var regularEncode = u.replace(/\s/g, '_'),
                    wikiEncode = mw.util.wikiUrlencode(u);
                encode.push(regularEncode);
                if (regularEncode !== wikiEncode) {
                    encode.push(wikiEncode);
                }
            });
            var selectors = encode.map(function(sel) {
                return 'a[href$=":' + sel + '"]';
            });
            if (group === 'staff') {
                selectors.push('.ChatWindow .User.staff');
            }
            return selectors;
        },
        edited: function() {
            if (config.wgVersion === '1.19.24') {
                new BannerNotification(
                    'Highlights successfully updated!',
                    'confirm'
                ).show();
            } else {
                mw.loader.using('mw.notification').then(function () {
                    mw.notify('Highlights successfully updated!');
                });
            }
            setTimeout(function() {
                window.location.reload();
            }, 3000);
        }
    };
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.user',
        'mediawiki.util'
    ]).then($.proxy(HighlightUpdater.init, HighlightUpdater));
})();