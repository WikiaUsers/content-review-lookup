/**
 * Name:        HighlightUpdate
 * Author:      KockaAdmiralac <wikia@kocka.tech>, Joritochip
 * Description: Adds a button for updating [[MediaWiki:Highlight.css]].
 */
(function () {
    'use strict';
    var config = mw.config.get([
        'wgArticleId',
        'wgCityId'
    ]);

    if (config.wgArticleId !== 2160 || config.wgCityId !== 7931 || $('#ca-highlights').length) {
        return;
    }

    var HighlightUpdater = {
        preload: function() {
            this.api = new mw.Api();
            this.getContent(32635).then(this.init.bind(this));
        },
        init: function(content) {
            this.api = new mw.Api();
            this.config = JSON.parse(content);
            $('.page-header__actions .wds-list').append(
                $('<li>').append(
                    $('<a>', {
                        click: this.click.bind(this),
                        id: 'ca-highlights',
                        text: 'Update highlights',
                        href: '#'
                    })
                )
            );
        },
        click: function(event) {
            event.preventDefault();
            var params = {
				uselang: 'en'
			};
            Object.keys(this.config.groups).forEach(function(value, index) {
				params['groups[' + index + ']'] = value;
            });
            $.when(
                $.get(mw.util.getUrl('Special:ListGlobalUsers', params)),
                this.getContent(2160)
            ).then(this.parseUsers.bind(this));
        },
        getContent: function(pageid) {
            return this.api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                rvslots: 'main',
                pageids: pageid
            }).then(function(data) {
                return data.query.pages[pageid].revisions[0].slots.main['*'];
            });
        },
        parseUsers: function(data, content) {
            this.users = {};
            var $data = $(data[0]);
            var overrides = this.config.overrides;
            Object.keys(this.config.groups).forEach(function(value) {
                this.users[value] = [];
            }, this);
            $data.find('.list-global-users-members > li').each(this.parseUser.bind(this));
            Object.keys(overrides.add).forEach(function(name) {
                overrides.add[name].forEach(function(g) {
                    if (this.users[g] && this.users[g].indexOf(name) === -1) {
                        this.users[g].push(name);
                    }
                }, this);
            }, this);
            var text = '';
            for (var group in this.users) {
                if (this.users[group].length === 0) {
                    continue;
                }
                text +=
                    '/* ' + group + ' */\n' +
                    this.getSelectorsFor(group, this.users[group].sort())
                    .join(',\n') + ' {\n' + 
                    '    color: ' + this.config.groups[group].color +
                    ' !important;\n' + 
                    '    color: var(--highlight-' + this.config.groups[group].cssVar +
                    ') !important;\n}\n\n';
            }
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
                token: mw.user.tokens.get('csrfToken')
            }).then(this.edited.bind(this));
        },
        parseUser: function(index, child) {
            var $child = $(child);
            var $groups = $child.contents().filter(function() {
                return this.nodeType === 3 && !this.nextSibling;
            });
            var overrides = this.config.overrides;
            var name = $child.find('bdi').text();
            var groups = $groups.text().trim().slice(1, -1).split(', ');
            if (overrides.remove[name]) {
                overrides.remove[name].forEach(function(g) {
                    if (groups.indexOf(g) !== -1) {
                        groups.splice(groups.indexOf(g), 1);
                    }
                });
            }
            if (groups.indexOf('bot-global') !== -1) {
                return;
            }
            groups.forEach(function(g) {
                if (this.users[g]) {
                    this.users[g].push(name);
                }
            }, this);
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
    ]).then(HighlightUpdater.preload.bind(HighlightUpdater));
})();