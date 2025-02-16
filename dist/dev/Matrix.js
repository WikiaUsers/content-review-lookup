/**
 * Name:        Matrix
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Makes a UserAcitivity-ish table on User:Username/matrix
 *              Runs only on English Community Central
 */
(function() {
    'use strict';
    if (mw.config.get('wgCityId') !== 177 || window.MatrixLoaded) {
        mw.log('[Matrix] Not running outside of Community Central.');
        return;
    }
    window.MatrixLoaded = true;
    var Matrix = {
        config: window.MatrixConfig || {},
        toPreload: 4,
        preload: function(resource, arg) {
            switch (resource) {
                case 'i18n':
                    arg.loadMessages('Matrix')
                        .done(this.preload.bind(this, 'msg'));
                    break;
                case 'msg':
                    this.i18n = arg;
                    break;
            }
            if (--this.toPreload === 0) {
                this.init();
            }
        },
        init: function() {
            window.dev.ct.setup({
                click: this.click.bind(this),
                link: '#',
                placement: 'my-tools',
                text: this.i18n.msg('button').plain()
            });
        },
        createSpinner: function() {
            return $('<div>', {
                css: {
                    'background': 'rgba(255, 255, 255, 0.5)',
                    'position': 'fixed',
                    'height': '100%',
                    'width': '100%',
                    'left': '0',
                    'top': '0',
                    'z-index': '1000000000'
                },
                // eslint-disable-next-line max-len
                html: '<svg class="wds-spinner wds-spinner__block" width="78" height="78" viewBox="0 0 78 78" xmlns="http://www.w3.org/2000/svg"><g transform="translate(39, 39)"><circle class="wds-spinner__stroke" fill="none" stroke-width=""stroke-dasharray="238.76104167282426" stroke-dashoffset="238.76104167282426"stroke-linecap="round" r="38"></circle></g></svg>'
            });
        },
        click: function(event) {
            event.preventDefault();
            this.$spinner = this.createSpinner().appendTo(document.body);
            this.getWikis();
        },
        getWikis: function(wikis, offset) {
            return $.get(mw.util.getUrl('Special:UserActivity', {
                uselang: 'en',
                offset: offset
            }), this.fetchedActivityPage.bind(this, wikis));
        },
        fetchedActivityPage: function(wikis, data) {
            var $data = $(data);
            var nextHref = $data
                .find('.TablePager_nav')
                .first()
                .find('a')
                .eq(2)
                .prop('href');
            var newWikis = (wikis || []).concat($data
                .find('.user-activity__table-wrapper .mw-datatable > tbody > tr')
                .map(function(_, row) {
                    var $children = $(row).children();
                    var $wiki = $children.eq(0);
                    return {
                        editString: $children.eq(1).text().trim(),
                        groups: $children.eq(3).text().trim(),
                        lastEdit: $children.eq(2).text().trim(),
                        title: $wiki.text().trim(),
                        url: $wiki.find('a').attr('href').trim()
                    };
                })
                .toArray()
            );
            if (nextHref) {
                return this.getWikis(newWikis, new URL(nextHref).searchParams.get('offset'));
            } else {
                this.fetchedAllWikis(newWikis);
            }
        },
        getSortableEditDate: function(editDate) {
            if (editDate === '-') {
                return new Date(0).toISOString();
            }
            return new Date(editDate.split(', ').reverse().join(' '))
                .toISOString();
        },
        getPageContent: function(wikis, username) {
            // wikia.org and gamepedia.com wikis no longer exist, but some
            // of them can still be found on people's user activities
            // (as of 2024-10-19).
            var urlRegex = /^https?:\/\/(.*)\.(?:wikia|fandom|gamepedia)\.(?:com|org)\/(?:([^/]+)\/?)?$/;
            var privateWikis = Array.isArray(this.config.private) ?
                this.config.private :
                [];
            var tableRows = wikis.filter(function(wiki) {
                return !privateWikis.includes(wiki.url);
            }).map(function(wiki) {
                var match = urlRegex.exec(wiki.url);
                var wikiLink = match[1];
                if (match[2]) {
                    wikiLink = match[2] + '.' + wikiLink;
                }
                var editDateSortValue = this.getSortableEditDate(wiki.lastEdit);
                return '|-\n' +
                       '| \'\'\'[[w:c:' + wikiLink +
                       '|' + wiki.title + ']]\'\'\'\n' +
                       '| [[w:c:' + wikiLink + ':Special:Contribs/' + username +
                       '|' + wiki.editString + ']]\n' +
                       '| data-sort-value="' + editDateSortValue +
                       '" | ' + wiki.lastEdit + '\n' +
                       '| ' + wiki.groups;
            }, this);
            return '{{/header|' + wikis.length + '}}\n' +
                   '{| width="100%" class="wikitable mw-datatable sortable"\n' +
                   '|-\n' +
                   '! {{int:user-activity-table-title}}\n' +
                   '! data-sort-type="number" | {{#tag:nowiki|{{int:user-activity-table-edits}}}}\n' +
                   '! {{int:user-activity-table-lastedit}}\n' +
                   '! {{int:user-activity-table-rights}}\n' +
                   tableRows.join('\n') +
                   '\n|}';
        },
        fetchedAllWikis: function(wikis) {
            var username = mw.user.getName();
            var content = this.getPageContent(wikis, username);
            this.editPage(content, username)
                .done(this.editedPage.bind(this));
        },
        editPage: function(content, username) {
            return (new mw.Api()).postWithToken('csrf', {
                action: 'edit',
                title: 'User:' + username + '/matrix',
                text: content,
                summary: this.i18n.inContentLang().msg('summary').plain(),
                minor: true,
                bot: true
            });
        },
        editedPage: function(apiResponse) {
            this.$spinner.remove();
            if (apiResponse.edit.result === 'Success') {
                mw.notify(this.i18n.msg('success').plain(), {
                    type: 'success'
                });
            }
        }
    };
    importArticles({
        articles: [
            'u:dev:MediaWiki:CustomTools.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.user',
        'mediawiki.util'
    ]).then(Matrix.preload.bind(Matrix));
    mw.hook('dev.ct').add(Matrix.preload.bind(Matrix, 'ct'));
    mw.hook('dev.i18n').add(Matrix.preload.bind(Matrix, 'i18n'));
})();