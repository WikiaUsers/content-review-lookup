/*
 * Copyright © 2009, Daniel Friesen
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the script nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY DANIEL FRIESEN ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL DANIEL FRIESEN BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * <nowiki>
 */
(function($) {
    'use strict';
    var config = mw.config.get([
        'stylepath',
        'wgAction',
        'wgArticleId',
        'wgNamespaceNumber',
        'wgPageName',
        'wgTitle'
    ]);
    if (
        // If the script has already loaded..
        window.ArchiveToolLoaded ||
        (
            // ...or if we're in a subject namespace...
            config.wgNamespaceNumber % 2 === 0 ||
            // ...or Special namespace...
            config.wgNamespaceNumber === -1
        ) &&
        // ...and not in Forum namespace...
        config.wgNamespaceNumber !== 110 ||
        // ...or not viewing or purging,
        config.wgAction !== 'view' &&
        config.wgAction !== 'purge'
    ) {
        // ...there's no need to run further
        return;
    }
    window.ArchiveToolLoaded = true;
    var ArchiveTool = {
        config: $.extend(true, {
            archiveListTemplate: window.archiveListTemplate || 'ArchiveList',
            archivePageTemplate: window.archivePageTemplate || 'ArchivePage',
            archiveSubpage: 'Archive',
            userLang: true
        }, window.ArchiveToolConfig),
        hook: function(i18n) {
            $.when(
                i18n.loadMessages('ArchiveTool'),
                mw.loader.using('mediawiki.api')
            ).then($.proxy(this.init, this));
        },
        init: function(i18n) {
            this.i18n = i18n;
            if (!this.config.userLang) {
                i18n.useContentLang();
            }
            this.api = new mw.Api();
            var controls = (
                $('#WikiaUserPagesHeader').length ?
                    '.UserProfileActionButton' :
                    '#PageHeader'
            ) + ' .wds-dropdown__content > ul';
            if (config.wgNamespaceNumber === 3) {
                controls = (
                    $('#WikiaUserPagesHeader').length ?
                    '.UserProfileActionButton' :
                    '#WikiaPageHeader'
                ) + ' > .wikia-menu-button > ul';
            }
            $('<li>', {
                id: 'control_archive',
                click: $.proxy(this.click, this)
            }).append(
                $('<a>', {
                    id: 'ca-archive',
                    rel: 'nofollow',
                    text: i18n.msg('button').plain()
                })
            ).appendTo(controls);
        },
        click: function() {
            this.regex = new RegExp(
                '\\{\\{' +
                $.escapeRE(this.config.archiveListTemplate) +
                '\\}\\}'
            );
            this.$container = $('#WikiaArticle')
                .addClass('archiving')
                .empty();
            this.$loading = $('<img>', {
                'alt': this.i18n.msg('loading').plain(),
                'class': 'ajax',
                'src': config.stylepath + '/common/progress-wheel.gif'
            }).appendTo(this.$container);
            this.api.get({
                action: 'query',
                prop: 'revisions',
                titles: config.wgPageName,
                rvprop: 'timestamp|content'
            }).done($.proxy(this.cbRevisions, this));
        },
        cbRevisions: function(q) {
            this.$loading.hide();
            var lines = q.query.pages[config.wgArticleId]
                .revisions[0]['*']
                .split('\n'),
                $table = $('<table>', {
                    mousedown: $.proxy(this.tableClick, this),
                    mouseup: $.proxy(this.tableUnclick, this)
                }).append(
                    $('<thead>').append(
                        $('<tr>').append(
                            $('<th>', {
                                text: this.i18n.msg('lines').plain()
                            }),
                            $('<th>', {
                                title: this.i18n.msg('sections').plain(),
                                text: '{…}'
                            })
                        )
                    )
                ).appendTo(this.$container),
                $body = $('<tbody>').appendTo($table),
                sections = [];
            lines.forEach(function(line, i) {
                $body.append(
                    $('<tr>', {
                        'class': this.regex.test(line) ? 'noarchive' : '',
                        'line': line
                    }).append(
                        $('<td>', {
                            'class': 'line',
                            'text': line
                        }).append('&nbsp;')
                    )
                );
                if (i === 0 || /^=.+?=/.test(line)) {
                    if (i !== 0) {
                        var last = sections[sections.length - 1];
                        last.end = i - 1;
                        last.length = i - last.start;
                    }
                    sections.push({
                        start: i
                    });
                }
            }, this);
            var last = sections[sections.length - 1];
            last.end = lines.length - 1;
            last.length = lines.length - last.start;
            sections.forEach(function(section) {
                var tr = $body.children().eq(section.start);
                $('<td>', {
                    'class': 'section',
                    'rowspan': section.length
                }).appendTo(tr);
            });
            this.$body = $body;
            $('<div>', {
                'class': 'buttons'
            }).append(
                $('<a>', {
                    'class': 'wikia-button secondary',
                    'click': $.proxy(this.clickSelect, this),
                    'text': this.i18n.msg('select').plain()
                }),
                ' ',
                $('<a>', {
                    'class': 'wikia-button secondary',
                    'click': $.proxy(this.clickDeselect, this),
                    'text': this.i18n.msg('deselect').plain()
                }),
                ' ',
                $('<a>', {
                    'class': 'wikia-button',
                    'click': $.proxy(this.archive, this),
                    'text': this.i18n.msg('save').plain()
                }),
                ' ',
                $('<a>', {
                    'class': 'wikia-button',
                    'click': $.proxy(this.clickAbort, this),
                    'text': this.i18n.msg('abort').plain()
                })
            ).prependTo(this.$container)
            .clone(true)
            .appendTo(this.$container);
            this.clicked = false;
            $('body').mouseup($.proxy(this.bodyUnclick, this));
        },
        clickAbort: function() {
            this.$loading.hide();
            location.href = mw.util.getUrl(config.wgPageName, {
                action: 'purge'
            });
        },
        clickSelect: function(e) {
            e.preventDefault();
            this.$body.children('tr').addClass('archive');
        },
        clickDeselect: function(e) {
            e.preventDefault();
            this.$body.children('tr').removeClass('archive');
        },
        tableClick: function(e) {
            e.preventDefault();
            var $li = $(e.target).closest('tr');
            if (!$li.length) {
                return;
            }
            var $section = $(e.target).closest('.section');
            if ($section.length) {
                var slist = $li.nextAll(
                    ':lt(' +
                    (parseInt($section.attr('rowspan'), 10) - 1) +
                    ')'
                ).andSelf();
                slist.toggleClass('archive', Boolean(slist.filter(function() {
                    return !$(this).hasClass('archive');
                }).length));
                return;
            }
            this.clicked = true;
            this.add = !$li.hasClass('archive');
            $li.toggleClass('archive', Boolean(this.add));
        },
        tableUnclick: function(e) {
            if (!this.clicked) {
                return;
            }
            var $li = $(e.target).closest('tr');
            if (!$li.length) {
                return;
            }
            $li.toggleClass('archive', Boolean(this.add));
        },
        bodyUnclick: function() {
            this.clicked = false;
        },
        archive: function() {
            var talkLines = [];
            var archiveLines = [];
            this.$body.children().each(function() {
                var $this = $(this),
                    arr = $this.hasClass('noarchive') ||
                         !$this.hasClass('archive') ?
                             talkLines :
                             archiveLines;
                arr.push($this.attr('line'));
            });
            if (!this.regex.test(talkLines[0])) {
                talkLines = [
                    '{{' + this.config.archiveListTemplate + '}}', ''
                ].concat(talkLines);
            }
            archiveLines = [
                '{{' + this.config.archivePageTemplate + '}}', ''
            ].concat(archiveLines);
            this.$container.empty();
            this.$loading.show();
            this.talkContent = talkLines.join('\n');
            this.archiveContent = archiveLines.join('\n');
            this.run();
        },
        run: function() {
            this.archiveNo = 1;
            this.$m = $('<p>', {
                text: this.i18n.msg('finding').plain()
            }).appendTo(this.$container);
            this.api.get({
                action: 'query',
                list: 'allpages',
                apnamespace: config.wgNamespaceNumber,
                apprefix: config.wgTitle + '/' + this.config.archiveSubpage,
                aplimit: 'max',
                apdir: 'ascending'
            }).done($.proxy(this.cbRun, this));
        },
        cbRun: function(q) {
            $.each(q.query.allpages, $.proxy(function(_, value) {
                var qt = parseInt(
                    value.title.substr(
                        config.wgPageName.length +
                        ('/' + this.config.archiveSubpage).length
                    ),
                    10
                );
                if (qt >= this.archiveNo) {
                    this.archiveNo = qt + 1;
                }
            }, this));
            this.archiveTitle = config.wgPageName + '/' +
                                this.config.archiveSubpage + ' ' +
                                this.archiveNo;
            this.$m.append(
                this.i18n.msg('done-using', this.archiveNo).escape()
            );
            this.saveArchive();
        },
        saveArchive: function() {
            this.$m = $('<p>', {
                text: this.i18n.msg('saving').plain()
            }).appendTo(this.$container);
            this.api.post({
                action: 'edit',
                title: this.archiveTitle,
                text: this.archiveContent,
                token: mw.user.tokens.get('editToken'),
                summary: this.i18n
                    .inContentLang()
                    .msg('summary-from', config.wgPageName)
                    .plain(),
                minor: true,
                createonly: true
            }).done($.proxy(this.cbSaveArchive, this));
        },
        cbSaveArchive: function(q) {
            if (q.error && q.error.code === 'articleexists') {
                this.$m.append(this.i18n.msg('failed').escape());
                this.$container.append(
                    $('<p>', {
                        text: this.i18n.msg('exists').plain()
                    })
                );
                return this.abort();
            }
            this.$m.append(this.i18n.msg('done').escape());
            this.saveTalk();
        },
        saveTalk: function() {
            this.$m = $('<p>', {
                text: this.i18n.msg('updating').plain()
            }).appendTo(this.$container);
            this.api.post({
                action: 'edit',
                title: config.wgPageName,
                text: this.talkContent,
                token: mw.user.tokens.get('editToken'),
                summary: this.i18n
                    .inContentLang()
                    .msg('summary-to', this.archiveTitle)
                    .plain(),
                minor: true
            }).done($.proxy(this.cbSaveTalk, this));
        },
        cbSaveTalk: function(q) {
            if (q.edit.result === 'Success') {
                this.$m.append(this.i18n.msg('done').escape());
                this.$loading.hide();
                location.href = mw.util.getUrl(config.wgPageName, {
                    action: 'purge'
                });
            } else {
                this.$m.append(this.i18n.msg('failed').escape());
                this.$container.append(
                    $('<p>', {
                        text: this.i18n.msg('failed-delete').plain()
                    })
                );
                this.abort();
            }
        },
        abort: function() {
            console.log(this);
            this.$loading.hide();
            this.$container.append(
                $('<p>', {
                    text: this.i18n.msg('aborting').plain()
                }),
                $('<p>', {
                    html: this.i18n.msg('refresh', config.wgPageName).parse()
                })
            );
        }
    };
    mw.hook('dev.i18n').add($.proxy(ArchiveTool.hook, ArchiveTool));
    importArticles(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:ArchiveTool.css'
        }
    );
})(jQuery);