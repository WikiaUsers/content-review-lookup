/**
 * Name:        Matrix
 * Version:     v1.1
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Makes a UserAcitivity-ish table on User:Username/matrix
 *              Runs only on English Community Central
 */
(function($, mw) {
    'use strict';
    var config = mw.config.get([
        'wgCityId',
        'wgUserName'
    ]);
    if (config.wgCityId !== 177 || window.MatrixLoaded) {
        return;
    }
    window.MatrixLoaded = true;
    var Matrix = {
        config: window.MatrixConfig || {},
        init: function() {
            this.api = new mw.Api();
            // eslint-disable-next-line max-len
            this.spinner = '<svg class="wds-spinner wds-spinner__block" width="78" height="78" viewBox="0 0 78 78" xmlns="http://www.w3.org/2000/svg"><g transform="translate(39, 39)"><circle class="wds-spinner__stroke" fill="none" stroke-width=""stroke-dasharray="238.76104167282426" stroke-dashoffset="238.76104167282426"stroke-linecap="round" r="38"></circle></g></svg>';
            $('#my-tools-menu').append(
                $('<li>').append(
                    $('<a>', {
                        'class': 'custom',
                        'text': 'Publish user activity'
                    }).click(this.click.bind(this))
                )
            );
        },
        click: function() {
            $('<div>', {
                css: {
                    'background': 'rgba(255, 255, 255, 0.5)',
                    'position': 'fixed',
                    'height': '100%',
                    'width': '100%',
                    'left': '0',
                    'top': '0',
                    'z-index': '1000000000'
                },
                html: this.spinner,
                id: 'matrix-spinner'
            }).appendTo(document.body);
            this.wikis = [];
            this.getWikis();
        },
        getWikis: function(offset) {
            $.get(mw.util.getUrl('Special:UserActivity', {
                uselang: 'en',
                offset: offset
            }), this.cbWikis.bind(this));
        },
        cbWikis: function(data) {
            var $data = $(data),
                nextHref = $data.find('.TablePager_nav')
                    .first()
                    .find('a')
                    .eq(2)
                    .attr('href');
            $data.find('.user-activity__table-wrapper .mw-datatable > tbody > tr').each((function(_, row) {
                var $children = $(row).children(),
                    $wiki = $children.eq(0);
                this.wikis.push({
                    editString: $children.eq(1).text().trim(),
                    groups: $children.eq(3).text().trim(),
                    lastEdit: $children.eq(2).text().trim(),
                    title: $wiki.text().trim(),
                    url: $wiki.find('a').attr('href').trim()
                });
            }).bind(this));
            if (nextHref) {
                this.getWikis(new mw.Uri(nextHref).query.offset);
            } else {
                this.cbNirvana({
                    items: this.wikis,
                    total: this.wikis.length,
                    totalReturned: this.wikis.length
                });
            }
        },
        cbNirvana: function(d) {
            var urlRegex = /^https?:\/\/(.*)\.(?:wikia|fandom|gamepedia)\.(?:com|org)\/(?:([^/]+)\/?)?$/,
                str = '{{/header|' + d.total + '}}\n' +
                      '{| width="100%" class="wikitable mw-datatable sortable"\n' +
                      '|-\n' +
                      '! {{int:user-activity-table-title}}\n' +
                      '! data-sort-type="number" | {{#tag:nowiki|{{int:user-activity-table-edits}}}}\n' +
                      '! {{int:user-activity-table-lastedit}}\n' +
                      '! {{int:user-activity-table-rights}}\n' +
                      d.items.filter(function(item) {
                          return !(this.config.private instanceof Array) ||
                                 this.config.private.indexOf(item.url) === -1;
                      }, this).map(function(item) {
                          var match = urlRegex.exec(item.url),
                              wiki = match[1];
                          if (match[2]) {
                              wiki = match[2] + '.' + wiki;
                          }
                          urlRegex.lastIndex = 0;
                          return '|-\n' +
                                 '| \'\'\'[[w:c:' + wiki + '|' + item.title + ']]\'\'\'\n' +
                                 '| [[w:c:' + wiki + ':Special:Contribs/' + config.wgUserName +
                                 '|' + item.editString + ']]\n' +
                                 '| ' + item.lastEdit + '\n' +
                                 '| ' + item.groups;
                      }).join('\n') +
                      '\n|}';
            this.api.post({
                action: 'edit',
                title: 'User:' + config.wgUserName + '/matrix',
                text: str,
                token: mw.user.tokens.get('csrfToken'),
                summary: 'Updating wiki list with Matrix.js',
                minor: true,
                bot: true
            }).done(this.cbAPI.bind(this));
        },
        cbAPI: function(d) {
            $('#matrix-spinner').remove();
            if (!d.error && d.edit.result === 'Success') {
                mw.notify('List of wikis successfully updated!', {
                    type: 'success'
                });
            }
        }
    };
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.Uri'
    ]).then(Matrix.init.bind(Matrix));
})(window.jQuery, window.mediaWiki);