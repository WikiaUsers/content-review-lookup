/**
 * Name:        HighlightUpdate
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405523@gmail.com>, Joritochip
 * Description: Adds a button for updating [[MediaWiki:Highlight.css]].
 */

(function () {
    'use strict';
    var config = mw.config.get([
        'wgArticleId',
        'wgCityId'
    ]);
    
    if (
        config.wgArticleId !== 2160 ||
        Number(config.wgCityId) !== 7931 ||
        $('#ca-highlights').length
    ) return;
    
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
            'content-volunteer': {
                color: '#ff7000',
                cssVar: 'convol'
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
            'wiki-specialist': {
                color: '#d27d2c',
                cssVar: 'ws'
            },
            'wiki-representative': {
                color: '#09e5a2',
                cssVar: 'wr'
            },
            'staff': {
                color: '#ddaa00',
                cssVar: 'staff'
            }
        },
        overrides: {
            add: {
                'SOAP_Bot': ['soap'],
                'JT222': ['staff'],
                'idekmandy': ['staff']
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
                    'wiki-representative',
                    'wiki-specialist'
                ],
                'Wiki-o-slay': ['soap']
            }
        },
        init: function() {
            this.api = new mw.Api();
            $('.page-header__actions .wds-list').append(
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
            var params = {
				uselang: 'en'
			};
            Object.keys(this.groups).forEach(function(value, index) {
				params['groups['+index+']'] = value;
            });
            $.get(mw.util.getUrl('Special:ListGlobalUsers', params), 
				$.proxy(this.parseUsers, this));
        },
        parseUsers: function(data) {
            var $data = $(data),
                users = $data.find('.list-global-users-members > li').map(function(index, child) {
                    var $child = $(child),
                        $groups = $child.contents().filter(function() {
                            return this.nodeType == 3 && !this.nextSibling;
                        });
                    return {
                        name: $child.find('bdi').text(),
                        groups: $groups.text().trim().slice(1, -1).split(', ')
                    };
                });
            this.callback(users);
        },
        callback: function(data) {
            var users = {},
                overrides = this.overrides;
            Object.keys(this.groups).forEach(function(value) {
                users[value] = [];
            });
            data.each(function(index, user) {
                var groups = user.groups;
                if (overrides.remove[user.name]) {
                    overrides.remove[user.name].forEach(function(g) {
                        if (groups.indexOf(g) !== -1) {
                            groups.splice(groups.indexOf(g), 1);
                        }
                    });
                }
                if (groups.indexOf('bot-global') !== -1) {
                    return;
                }
                groups.forEach(function(g) {
                    if (users[g]) users[g].push(user.name);
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
            this.api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                rvslots: 'main',
                indexpageids: true,
                pageids: 2160
            }).then($.proxy(function(data) {
                var content = data.query.pages[data.query.pageids[0]]
                    .revisions[0].slots.main['*'];
                
                this.api.post({
                    action: 'edit',
                    text: content.replace(
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
            }, this));
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
            return selectors;
        },
        edited: function() {
            mw.notify('Highlights successfully updated!');
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