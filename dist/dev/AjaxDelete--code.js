/**
 * AjaxDelete
 *
 * Allows to delete pages (through ?action=delete links) without leaving the current page.
 * Supports deleting revisions and restoring pages (does not support restoring individual revisions)
 * For personal use
 * @author Dorumin
 * @author KockaAdmiralac
 */
(function() {
    'use strict';
    var config = mw.config.get([
        'wgArticlePath',
        'wgContentLanguage',
        'wgFormattedNamespaces',
        'wgNamespaceNumber',
        'wgUserGroups',
        'wgVersion'
    ]);
    if (
        window.AjaxDeleteLoaded ||
        (
            !$('#ca-delete').length &&
            !/sysop|content-moderator|content-volunteer|staff|helper|wiki-manager|content-team-member|soap/.test(config.wgUserGroups.join())
        )
    ) {
        return;
    }
    window.AjaxDeleteLoaded = true;
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Modal.js'
        ]
    });
    var AjaxDelete = {
        config: window.AjaxDelete || {},
        undelete: ['Undelete'],
        toLoad: 2,
        preload: function() {
            if (--this.toLoad === 0) {
                $.when(
                    window.dev.i18n.loadMessages('AjaxDelete'),
                    mw.loader.using(['mediawiki.api', 'mediawiki.Title'])
                ).then($.proxy(this.init, this));
            }
        },
        init: function(i18n) {
            this.i18n = i18n;
            this.acw = typeof this.config.autoCheckWatch === 'undefined' ?
                mw.user.options.get('watchdeletion') :
                this.config.autoCheckWatch;
            this.api = new mw.Api();
            this.createModal();
            this.buildDeleteReasons();
            this.fetchUndeleteAliases();
            $(document).click($.proxy(this.click, this));
            if (
                [-1, 1201, 2001].indexOf(config.wgNamespaceNumber) === -1 &&
                !this.config.disableShortcut
            ) {
                var bindShortcut = $.proxy(this.bindShortcut, this);
                if (config.wgVersion === '1.19.24') {
                    require(['Mousetrap'], bindShortcut);
                } else {
                	var moduleName = mw.loader.getModuleNames().find(function(name) {
                        return name.indexOf('GlobalShortcuts-') === 0;
                    });
                    if (moduleName) {
                    	mw.loader.using(moduleName).then(function() {
                    	    bindShortcut(window.Mousetrap);
                    	});
                    }
                }
            }
        },
        createModal: function() {
            this.modals = {};
            ['delete', 'undelete'].forEach(function(action) {
                var cap = action.charAt(0).toUpperCase() + action.substring(1);
                var events = {};
                events[action] = this['handle' + cap];
                this.modals[action] = new window.dev.modal.Modal({
                    buttons: [
                        {
                            event: action,
                            id: 'Ajax' + cap + 'Button',
                            primary: true,
                            text: this.msg(action)
                        }
                    ],
                    content: '',
                    context: this,
                    events: events,
                    id: 'Ajax' + cap + 'Modal'
                });
                this.modals[action].create();
            }, this);
        },
        buildDeleteReasons: function() {
            var dr = this.config.deleteReasons,
                idr = this.config.imageDeleteReasons;
            this.reasons = ['', ''];
            if (!dr || !idr) {
                this.fetchDeleteReasons();
            }
            if (dr) {
                this.reasons[0] = this.makeReasonsHTML1(dr);
            }
            if (idr) {
                this.reasons[1] = this.makeReasonsHTML1(idr);
            }
        },
        fetchUndeleteAliases: function() {
            this.api.get({
                action: 'query',
                meta: 'siteinfo',
                siprop: 'specialpagealiases'
            }).done($.proxy(this.cbAliasFetch, this));
        },
        fetchDeleteReasons: function() {
            this.api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: 'deletereason-dropdown|filedelete-reason-dropdown',
                amlang: config.wgContentLanguage
            }).done($.proxy(this.cbFetch, this));
        },
        cbFetch: function(d) {
            if (d.error) {
                console.error(this.msg('errorfetch') + ': ' + d.error.code);
                return;
            }
            var am = d.query.allmessages;
            this.makeReasonsHTML2(am, 0);
            this.makeReasonsHTML2(am, 1);
        },
        cbAliasFetch: function(d) {
            var aliases = d.query.specialpagealiases;
            
            for (var i in aliases) {
                if (aliases[i].realname == 'Undelete') {
                    this.undelete = aliases[i].aliases;
                }
            }
        },
        makeReasonsHTML: function() {
            var $select = $('<select>', {
                id: 'AjaxDeleteReasonSelect'
            });
            if (!this.config.noOther) {
                $select.append(
                    $('<option>', {
                        value: 'other',
                        text: this.i18n.msg('other').plain()
                    })
                );
            }
            return $select;
        },
        makeReasonsHTML1: function(obj) {
            var $select = this.makeReasonsHTML();
            // Don't use $.each or $.map here because if the
            // user specifies a "length" parameter in the configuration
            // and some other stuff jQuery will interpret it
            // as an array and bad things can happen
            for (var i in obj) {
                $select.append(
                    $('<option>', {
                        value: i,
                        text: obj[i]
                    })
                );
            }
            return $select;
        },
        makeReasonsHTML2: function(obj, index) {
            if (this.reasons[index]) {
                return;
            }
            var $select = this.makeReasonsHTML();
            obj[index]['*'].trim().split('\n').forEach(function(line) {
                line = line.trim(); // In case of \r or something dumb
                if (line.charAt(1) === '*') {
                    var text = line.substring(2).trim();
                    $select.append(
                        $('<option>', {
                            value: text,
                            text: text
                        })
                    );
                } else if (line.charAt(0) === '*') {
                    $select.append(
                        $('<optgroup>', {
                            label: line.substring(1).trim()
                        })
                    );
                }
            });
            this.reasons[index] = $select;
        },
        click: function(e) {
            var $target = $(e.target);
            if (
                e.ctrlKey || e.shiftKey ||
                !$target.is('a[href]') ||
                $('[data-tab-body="about"]').html() === ''
            ) {
                return;
            }
            var url;
            try {
                url = new mw.Uri($target.attr('href'));
            } catch(e) {
                return;
            }
            if (!$target.is('.ignoreAjDel')) {
                if (url.query.action === 'delete') {
                    e.preventDefault();
                    this.doDelete(url, $target);
                } else if (this.isUndelete(url)) {
                    e.preventDefault();
                    this.doUndelete(url, $target);
                }
            }
        },
        isUndelete: function(url) {
            var special = config.wgFormattedNamespaces[-1];
            return this.undelete.some(function(alias) {
                return (
                    url.path.indexOf(mw.util.getUrl('Special:' + alias + '/')) === 0 ||
                    url.path.indexOf(mw.util.getUrl(special + ':' + alias + '/')) === 0 ||
                    url.path === mw.util.getUrl('Special:' + alias) ||
                    url.path === mw.util.getUrl(special + ':' + alias)
                ) &&
                url.query.target;
            }) &&
            !this.config.noUndelete &&
            // URLs on undeletion history should not open the modal
            !url.query.timestamp;
        },
        doDelete: function(url, $target) {
            this.action = 'delete';
            var isImg = $target.is('a[href*="/wiki/File:"]'),
                isRevImg = url.query.oldimage ? url.query.oldimage : false,
                page = decodeURIComponent(url.path).replace(config.wgArticlePath.replace('$1', ''), '').replace(/_/g, ' '),
                text = isImg ?
                    isRevImg ?
                        this.i18n.msg('deleteimgrev', isRevImg.split('!')[0], page) :
                        this.i18n.msg('deleteimg', page.replace('File:', '')) :
                    this.i18n.msg('deletepage', page);
            this.page = page;
            this.rev = isRevImg;
            this.showModal([
                $('<p>', {
                    id: 'AjaxDeleteText',
                    text: text.plain()  
                }),
                $('<label>', {
                    id: 'AjaxDeleteReasonLabel',
                    'for': 'AjaxDeleteReasonSelect',
                    text: this.msg('reason') + ' '
                }),
                this.reasons[Number(isImg)],
                $('<br>'),
                $('<input>', {
                    id: 'AjaxDeleteCustomReason',
                    type: 'text'
                }).attr('size', 50),
                $('<br>'),
                $('<input>', {
                    id: 'AjaxDeleteWatch',
                    type: 'checkbox'
                }),
                $('<label>', {
                    'for': 'AjaxDeleteWatch',
                    id: 'AjaxDeleteWatchLabel',
                    text: this.msg('watch')
                })
            ]);
            $('#AjaxDeleteWatch').prop('checked', this.acw);
        },
        showModal: function(elements) {
            this.modals[this.action]
                .setTitle(this.i18n.msg('title-' + this.action, this.page).plain())
                .setContent($('<div>').append(elements).html())
                .show();
            // User who wanted to delete something would probably
            // want these focused
            var $reason = $('#AjaxDeleteCustomReason, #AjaxUndeleteReason');
            if ($('#AjaxDeleteReasonSelect option').length < 2) {
                $reason.focus();
            } else {
                $('#AjaxDeleteReasonSelect').focus();
            }
            // When Enter is pressed, execute the deletion
            $reason.keydown($.proxy(this.keydown, this));
        },
        keydown: function(event) {
            if (event.which === 13 || event.which === 11) {
                if (this.action === 'delete') {
                    this.handleDelete();
                } else {
                    this.handleUndelete();
                }
            }
        },
        handleDelete: function() {
            var customReason = $('#AjaxDeleteCustomReason').val(),
                selectedReason = $('#AjaxDeleteReasonSelect').val();
            this.apiCall(
                selectedReason === 'other' ?
                    customReason :
                    customReason ?
                        selectedReason + ': ' + customReason :
                        selectedReason,
                $('#AjaxDeleteWatch').prop('checked')
            );
            this.close();
        },
        apiCall: function(reason, watchlist) {
            var params = {
                action: this.action,
                bot: true,
                reason: reason,
                title: this.page,
                token: mw.user.tokens.get('editToken')
            };
            if (this.rev) {
                params.oldimage = this.rev;
            }
            if (watchlist) {
                params.watchlist = 'watch';
            }
            this.api.post(params).done($.proxy(this.cbDone, this)).fail($.proxy(this.cbFail, this));
        },
        cbDone: function(d) {
            if (d.error) {
                this.banner('error', d.error.code);
            } else {
                if (this.config.reload) {
                    location.reload();
                } else {
                    this.banner('confirm');
                    $.get('/wiki/Special:BlankPage');
                }
            }
        },
        cbFail: function(code) {
            this.banner('error', code || 'http');
        },
        banner: function(type, code) {
            var msg = this.action;
            if (this.rev) {
                msg += 'rev';
            }
            msg = this.i18n.msg(type + msg, this.page).parse() + ' ';
            if (code === 'http') {
                msg += $('<a>', {
                    href: this.action === 'delete' ?
                        mw.util.getUrl(this.page, {
                            action: 'delete'
                        }) :
                        mw.util.getUrl('Special:Undelete/' + this.page),
                    text: this.msg('retry')
                }).prop('outerHTML');
            } else if (code) {
                msg += ' (' + code + ')';
            }
            if (window.BannerNotification) {
                new BannerNotification(msg, type).show();
            } else {
                mw.loader.using('mediawiki.notify').then(function () {
                    mw.notify($(msg), {
                        type: type
                    });
                });
            }
        },
        close: function() {
            this.modals[this.action].close();
        },
        doUndelete: function(url) {
            this.action = 'undelete';
            if (url.query.target) {
                this.page = url.query.target
                    .replace(/_/g, ' ');
            } else {
                this.page = decodeURIComponent(url.path)
                    .replace(/_/g, ' ');
                this.undelete.forEach(function(alias) {
                    this.page = this.page
                        .replace(mw.util.getUrl('Special:' + alias + '/'), '');
                }, this);
            }
            this.showModal([
                $('<p>', {
                    id: 'AjaxDeleteText',
                    html: this.i18n.msg('undeletepage', this.page).parse()
                }),
                $('<input>', {
                    id: 'AjaxUndeleteReason',
                    type: 'text'
                }).attr('size', 40)
            ]);
        },
        handleUndelete: function() {
            this.apiCall($('#AjaxUndeleteReason').val().trim());
            this.close();
        },
        bindShortcut: function(Mousetrap) {
            Mousetrap.bind('d', this.shortcut);
        },
        shortcut: function() {
            $('#ca-delete').click();
        },
        msg: function(code) {
            return this.i18n.msg(code).plain();
        }
    };
    var preload = $.proxy(AjaxDelete.preload, AjaxDelete);
    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.modal').add(preload);
})();