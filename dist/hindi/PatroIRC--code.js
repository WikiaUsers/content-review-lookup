/**
 * Name:        PatrolRC
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Adds patrol links to RecentChanges
 * Version:     v1.3
 * TODO:        Merge with PatrolAll
 * TODO:        Add buttons for complete thread patrolling
 */
(function() {
    'use strict';
    var config = mw.config.get([
        'stylepath',
        'wgCanonicalSpecialPageName',
        'wgUserLanguage'
    ]);
    if (
        config.wgCanonicalSpecialPageName !== 'Recentchanges' ||
        window.PatrolRCLoaded
    ) {
        return;
    }
    window.PatrolRCLoaded = true;

    var PatrolRC = {
        preloads: 2,
        preload: function() {
            if (--this.preloads === 0) {
                this.api = new mw.Api();
                window.dev.fetch([
                    'error',                          // "error"
                    'markaspatrolleddiff',            // "mark as patrolled"
                    'visualeditor-dialog-action-done' // "done"
                ]).then($.proxy(this.cbPreload, this));
            }
        },
        cbPreload: function(msg) {
            var d = msg();
            this.i18n = {
                error: d[0],
                patrol: d[1],
                done: d[2]
            };
            window.ajaxCallAgain = window.ajaxCallAgain || [];
            window.ajaxCallAgain.push($.proxy(this.init, this));
            this.init();
        },
        init: function() {
            $('.PatrolRC').remove();
            this.api.get({
                action: 'query',
                list: 'recentchanges',
                rctype: 'new|edit',
                rclimit: 'max',
                rcnamespace: $('li.dropdown-item.selected input')
                    .get()
                    .map(function(e) {
                        return $(e).val();
                    })
                    .join('|'),
                rctoken: 'patrol',
                rcprop: 'patrolled|ids|title',
                rcshow: '!patrolled'
            }).done($.proxy(this.cbList, this));
        },
        cbList: function(d) {
            this.changes = d.query.recentchanges;
            this.token = this.changes[0].patroltoken;
            if (!this.token) {
                console.warn('[PatrolRC] Unable to obtain patrol token');
                return;
            }
            $('.rc-conntent abbr.unpatrolled').each($.proxy(this.each, this));
        },
        each: function(_, el) {
            var $ch = $(el).parent().parent().children();
            if (
                $ch.length === 2 ||
                $ch.first().html().trim().length === 0
            ) {
                $ch.last().append(
                    '&nbsp;(',
                    $('<a>', {
                        'class': 'PatrolRC',
                        text: this.i18n.patrol
                    }).click($.proxy(this.click, this)),
                    ')'
                );
            }
        },
        getLink: function($par, name) {
            return $par.find(
                '> a[href*="&' + name + '="], > a[href*="?' + name + '="]'
            ).first().attr('href');
        },
        click: function(e) {
            var $this = $(e.target),
                $par = $this.parent(),
                $rcid = this.getLink($par, 'rcid'),
                $curid = this.getLink($par, 'curid');
            $this.html($('<img>', {
                src: config.stylepath + '/common/images/ajax.gif'
            }));
            this.$this = $this;
            if ($rcid) {
                this.patrol($this, new mw.Uri($rcid).query.rcid);
            } else if ($curid) {
                var curid = new mw.Uri($curid).query.curid,
                    changes = this.changes.filter(function(el) {
                        return el.pageid === Number(curid) && el.type === 'new';
                    });
                if (changes.length === 1) {
                    this.patrol($this, changes[0].rcid);
                } else {
                    $this.text(this.i18n.error);
                }
            } else {
                this.threadsShouldGoDieInAFire($this, $par);
            }
            
        },
        threadsShouldGoDieInAFire: function($this, $par) {
            var url = new mw.Uri(
                $par.find('a').first().attr('href')
            ), t = new mw.Title(url.path.substring(6)),
            id = t.getNameText();
            this.api.get({
                action: 'query',
                pageids: t.getNameText()
            }).then($.proxy(function(d) {
                var title = new mw.Title(d.query.pages[id].title);
                return this.api.get({
                    action: 'query',
                    list: 'allpages',
                    apprefix: title.title,
                    apnamespace: title.namespace,
                    aplimit: 'max'
                });
            }, this)).then($.proxy(function(d) {
                var title = d.query.allpages.map(function(el) {
                    return el.title;
                }).sort(function(a, b) {
                    var spl1 = a.split('/')[2],
                        spl2 = b.split('/')[2];
                    if (!spl1) {
                        return -1;
                    } else if (!spl2) {
                        return 1;
                    } else {
                        return Number(spl1.split('-')[2]) -
                               Number(spl2.split('-')[2]);
                    }
                })[Number(url.fragment || 1) - 1];
                if (title) {
                    var changes = this.changes.filter(function(el) {
                        return el.title === title && el.type === 'new';
                    });
                    if (changes.length) {
                        changes.forEach(function(el) {
                            this.patrol($this, el.rcid);
                        }, this);
                    } else {
                        $this.text(this.i18n.error);
                    }
                } else {
                    $this.text(this.i18n.error);
                }
            }, this));
        },
        patrol: function($this, rcid) {
            if (rcid) {
                this.api.post({
                    action: 'patrol',
                    rcid: rcid,
                    token: this.token
                }).done(this.cbGeneratePatrol($this));
            } else {
                $this.text(this.i18n.error);
            }
        },
        cbGeneratePatrol: function($el) {
            return $.proxy(function(d) {
                if (d.error) {
                    $el.text(this.i18n.error + ': ' + d.error.code);
                } else {
                    $el.text(this.i18n.done).css({
                        color: 'gray',
                        'text-decoration': 'line-through'
                    }).off();
                }
            }, this);
        }
    };

    mw.loader.using('mediawiki.api').then($.proxy(PatrolRC.preload, PatrolRC));
    mw.hook('dev.fetch').add($.proxy(PatrolRC.preload, PatrolRC));
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });
})();