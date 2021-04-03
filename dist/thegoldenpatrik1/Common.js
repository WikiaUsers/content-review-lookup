/**
 * @name            HighlightUpdater
 * @version         v1.0
 * @author          KockaAdmiralac
 * @author          TheGoldenPatrik1
 * @protect         <nowiki>
 * @description     Script for quickly updating MediaWiki:Global.css
 */
require([
    'wikia.window',
    'jquery',
    'mw',
    'BannerNotification'
], function (window, $, mw, BannerNotification) {
    'use strict';
    var config = mw.config.get([
        'wgCityId',
        'wgPageName',
        'wgUserGroups'
    ]);
    if (
        config.wgPageName !== 'MediaWiki:Global.css' ||
        config.wgCityId !== '1673350' ||
        config.wgUserGroups.indexOf('sysop') === -1 ||
        window.HighlightUpdaterLoaded
    ) {
        return;
    }
    window.HighlightUpdaterLoaded = true;
    var HighlightUpdater = {
        groups: {
            'vanguard': {
                color: '#1EAF7A',
                cssVar: 'vanguard',
                name: 'Vanguard'
            },
            'voldev': {
                color: '#23C8D2',
                cssVar: 'voldev',
                name: 'Volunteer Developers'
            },
            'global-discussions-moderator': {
                color: '#4286F4',
                cssVar: 'gdm',
                name: 'Global Discussions Moderators'
            },
            'soap': {
                color: '#FF7777',
                cssVar: 'soap',
                name: 'SOAP'
            },
            'helper': {
                color: '#4C5F1D',
                cssVar: 'helper',
                name: 'Helpers'
            },
            'content-team-member': {
                color: '#D27D2C',
                cssVar: 'ctm',
                name: 'Content Team Members'
            },
            'wiki-manager': {
                color: '#09E5A2',
                cssVar: 'wiki-manager',
                name: 'Wiki Managers'
            },
            'staff': {
                color: '#DDAA00',
                cssVar: 'staff',
                name: 'Staff'
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
        init: function () {
            this.api = new mw.Api();
            $('.page-header__contribution-buttons .wds-list').append(
                $('<li>').append(
                    $('<a>', {
                        click: $.proxy(this.click, this),
                        id: 'ca-highlights',
                        text: 'Update'
                    })
                )
            );
        },
        click: function () {
            this.api.get({
                action: 'query',
                list: 'groupmembers',
                gmgroups: Object.keys(this.groups).join('|') + '|bot-global',
                gmlimit: 'max',
                pageids: 423,
                prop: 'revisions',
                rvprop: 'content',
                indexpageids: true,
                cb: Date.now()
            }).then($.proxy(this.callback, this));
        },
        callback: function (data) {
            var users = {};
            var overrides = this.overrides;
            for (var group1 in this.groups) {
                users[group1] = [];
            }
            data.users.forEach(function (u) {
                var groups = u.groups;
                if (overrides.remove[u.name]) {
                    overrides.remove[u.name].forEach(function (g) {
                        if (groups.indexOf(g) !== -1) {
                            groups.splice(groups.indexOf(g), 1);
                        }
                    });
                }
                if (groups.indexOf('bot-global') !== -1) {
                    return;
                }
                groups.forEach(function (g) {
                    users[g].push(u.name);
                });
            });
            Object.keys(overrides.add).forEach(function (name) {
                overrides.add[name].forEach(function (g) {
                    if (users[g] && users[g].indexOf(name) === -1) {
                        users[g].push(name);
                    }
                });
            });
            var that = this;
            function getText (type) {
                var text = '/* HighlightUpdate-' + (type ? 'hover' :  'default') + ' */\n';
                var styles;
                for (var group in users) {
                    if (type) {
                        styles = '    text-shadow: 0 0 ' + (group === 'global-discussions-moderator' ? '2' : '5') + 'px ' + that.groups[group].color +
                            ' !important;\n' + 
                            '    text-shadow: var(--highlight-' + that.groups[group].cssVar + '-s) !important;\n}/**/\n\n';
                    } else {
                        styles = '    color: ' + that.groups[group].color +
                            ' !important;\n' + 
                            '    color: var(--highlight-' + that.groups[group].cssVar +
                            ') !important;\n}/**/\n\n';
                    }
                    text +=
                        '/* ' + that.groups[group].name + ' */\n' +
                        that.getSelectorsFor(group, users[group].sort(), type)
                        .join(',\n') + ' {\n' + styles;
                }
                return text;
            }
            var content = data.query.pages[data.query.pageids[0]].revisions[0]['*'];
            content = content.replace(/(\/\* HighlightUpdate-hover \*\/\n)[\s\S]*$/igm, '');
            content = content.replace(/(\/\* HighlightUpdate-default \*\/\n)[\s\S]*$/igm, '') + getText() + getText(true);
            this.api.post({
                action: 'edit',
                text: content,
                title: 'MediaWiki:Global.css',
                summary: '[[MediaWiki:Common.js|Updating]]',
                minor: true,
                bot: true,
                token: mw.user.tokens.get('editToken')
            }).then($.proxy(this.edited, this));
        },
        getSelectorsFor: function (group, users, type) {
            var encode = [];
            users.forEach(function (u) {
                var regularEncode = u.replace(/\s/g, '_'),
                    wikiEncode = mw.util.wikiUrlencode(u);
                encode.push(regularEncode);
                if (regularEncode !== wikiEncode) {
                    encode.push(wikiEncode);
                }
            });
            var selectors = encode.map(function (sel) {
                var extra = '';
                if (sel === 'Ursuul') {
                    extra = 'body:not(.wiki-diepio):not(.wiki-dresdenfiles):not(.wiki-sot):not(.wiki-nightangel):not(.wiki-ringsofthemaster):not(.wiki-rudiepio):not(.wiki-lightbringerseries):not(.wiki-hordesio):not(.wiki-dediepio) #WikiaPage ';
                }
                if (type) {
                    return extra + 'a[href$=":' + sel + '"]:hover,\n' + extra + 'a[href$=":' + sel + '/Talk"]:hover,\n' + extra + '*:not(.tally) > a[href$="/' + sel + '"]:hover';
                } else {
                    return extra + 'a[href$=":' + sel + '"],\n' + extra + 'a[href$=":' + sel + '/Talk"],\n' + extra + '*:not(.tally) > a[href$="/' + sel + '"]';
                }
            });
            if (group === 'staff') {
                selectors.push('.ChatWindow .User.staff');
            }
            return selectors;
        },
        edited: function () {
            new BannerNotification(
                'CSS successfully updated!',
                'confirm'
            ).show();
            setTimeout(function () {
                window.location.reload();
            }, 3000);
        }
    };
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.user',
        'mediawiki.util'
    ]).then($.proxy(HighlightUpdater.init, HighlightUpdater));
});