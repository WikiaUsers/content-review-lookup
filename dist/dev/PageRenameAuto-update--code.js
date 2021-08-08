/* eslint-disable max-statements */
/* eslint-disable no-alert */
/**
 * Name:        PageRenameAuto-update
 * Version:     v2.0
 * Description: Updates page links in use on the wiki when the page is renamed.
 * Authors:     Foodbandlt
 *              Jr Mime
 *              KockaAdmiralac
 */
(function() {
    'use strict';
    if (window.PRA || !/content-moderator|helper|staff|sysop|content-volunteer|wiki-representative|wiki-specialist/g.test(mw.config.get('wgUserGroups').join('|'))) {
        return;
    }
    var PRA = {
        started: false,
        options: window.PRAoptions || {},
        wg: mw.config.get([
            'wgCanonicalSpecialPageName',
            'wgNamespaceNumber',
            'wgPageName'
        ]),
        updateStatus: function(gifDisplay, message) {
            if ($('#PRAStatus').length === 0) {
                return false;
            }
            var newMessage = message;
            if (typeof gifDisplay === 'string') {
                newMessage = gifDisplay;
            } else if (typeof gifDisplay === 'boolean') {
                $('#liveLoader').css('display', gifDisplay ? 'inline-block' : 'none');
            } else {
                return false;
            }
            if (typeof newMessage === 'string') {
                $('#PRAStatus').html(' ' + newMessage);
            }
            return true;
        },
        start: function(callback) {
            if (PRA.started) {
                return false;
            }
            PRA.started = true;
            PRA.updateStatus(true, PRA.i18n.msg('processing').escape());
            $('#PRAprocess').css('display', 'none');
            PRA.toggleInputs(false);
            PRA.oldName = mw.util.getParamValue('pagename');
            PRA.newName = $('#wpNewTitleMain').val();
            PRA.reason = $('#wpReason').val();
            PRA.pageKey = [];
            // Check if destination page name is in use
            PRA.api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                titles: PRA.newName
            }).then(function(result) {
                if (result.query.pages[-1]) {
                    return PRA.getUsage(PRA.oldName);
                }
                PRA.started = false;
                PRA.updateStatus(false, PRA.i18n.msg('destInUse').escape());
                PRA.toggleInputs(true);
                if (typeof callback === 'function') {
                    callback(false, 'destinuse');
                }
            }).then(function(result) {
                if (!result) {
                    return;
                }
                var transUsage = result.query.embeddedin;
                var pageLinks = result.query.backlinks;
                var catMembers = result.query.categorymembers || [];
                var pageUsage = transUsage.concat(pageLinks).concat(catMembers);
                console.log('Usage successfully retrieved');
                if (pageUsage.length > 0) {
                    PRA.queueData = pageUsage.map(function(page) {
                        return page.title;
                    });
                    PRA.pageKey = [];
                    PRA.updateStatus(false, PRA.i18n.msg('successful').escape());
                    PRA.started = false;
                    PRA.toggleInputs(true);
                    $('#PRAprocess').css('display', 'inline-block');
                    PRA.updateQueueListing();
                } else {
                    // Else, prompt to use normal renaming, since this is kind of pointless otherwise
                    PRA.started = false;
                    PRA.updateStatus(false, PRA.i18n.msg('notUsed').escape());
                    PRA.toggleInputs(true);
                    if (typeof callback === 'function') {
                        callback(false, 'filenotused');
                    }
                }
            });
        },
        getUsage: function(page) {
            var options = {
                action: 'query',
                list: 'backlinks|embeddedin',
                bltitle: page,
                bllimit: 'max',
                eititle: page,
                eilimit: 'max'
            };
            if (mw.util.getParamValue('namespace') === '14') {
                options.list += '|categorymembers';
                options.cmtitle = page;
                options.cmlimit = 'max';
            }
            return PRA.api.get(options);
        },
        processQueue: function() {
            // Check if operation already started
            if (PRA.started) {
                return false;
            }
            // Variable redeclaration
            PRA.started = true;
            PRA.toggleInputs(false);
            PRA.requestCompleted = [];
            PRA.pageData = [];
            PRA.updateStatus(true, PRA.i18n.msg('processing').escape());
            // Queue retrieval, returns false if no queue
            PRA.movePage(function() {
                PRA.processPageContent(function() {
                    var ui = window.dev.dorui;
                    PRA.queueData = [];
                    PRA.updateStatus(false, PRA.i18n.msg('successful').escape() + ' ' + ui.a({
                        attrs: {
                            href: mw.util.getUrl(PRA.newName),
                            target: '_blank'
                        },
                        text: PRA.i18n.msg('linkNewPage').plain()
                    }).outerHTML);
                    PRA.updateQueueListing();
                });
            });
        },
        processPageContent: function(callback) {
            /* Sets progress checking variables */
            for (var i = 0; i < PRA.queueData.length; i++) {
                PRA.requestCompleted[i] = false;
            }
            var promises = [];
            console.log('Getting page contents');
            for (var j = 0; j < Math.floor(PRA.queueData.length / 500) + 1; j++) {
                var tempArray = [];
                for (var k = j * 500; k < j * 500 + 500 && k < PRA.queueData.length; k++) {
                    tempArray.push(PRA.queueData[k]);
                }
                if (tempArray.length === 0) {
                    break;
                }
                promises.push(PRA.api.post({
                    action: 'query',
                    prop: 'revisions',
                    rvprop: 'content',
                    titles: tempArray.join('|')
                }).then(PRA.processPageCallback));
            }
            $.when.apply(this, promises).then(function() {
                console.log('Page contents retrieved and saved. Begin processing page content.');
                // Replacing image name on each page
                var escapeRegExp = mw.RegExp.escape || mw.util.escapeRegExp;
                var escapedName = escapeRegExp(PRA.oldName).replace(/( |_)/g, '[ _]*?');
                if (escapedName.substr(0, 1).match(/[A-Za-z]/i)) {
                    escapedName = '[' + escapedName.substr(0, 1).toUpperCase() +
                                  escapedName.substr(0, 1).toLowerCase() + ']' + escapedName.substr(1);
                }
                var pageReplacement = new RegExp(
                    '(:?|=[ ]*?|\\||\\[|\\{)' + escapedName + '(.*?\\n|[ ]*?\\||\\]|\\})',
                    'g'
                );
                var replacementReg = new RegExp(escapedName, 'g');
                PRA.pageData.forEach(function(data) {
                    if (data.content.search(pageReplacement) === -1) {
                        PRA.failedLog(data.title);
                    } else {
                        data.changed = true;
                        console.log(PRA.oldName, 'replaced on page', data.title);
                        var regExec;
                        while ((regExec = pageReplacement.exec(data.content)) !== null) {
                            var replaced = regExec[0].replace(replacementReg, PRA.newName);
                            data.content = data.content.replace(regExec[0], replaced);
                            pageReplacement.lastIndex += replaced.length - regExec[0].length - regExec[2].length;
                        }
                    }
                });
                console.log('Begin submitting pages');
                // Adds progress bar for page submission
                var ui = window.dev.dorui;
                $('.PRAinfo').append(ui.div({
                    attrs: {
                        id: 'PRAQueueProgress'
                    },
                    child: ui.div({
                        attrs: {
                            id: 'PRAProgressInd'
                        }
                    })
                }));
                PRA.queueProgress = 0;
                var l = 0;
                var throttle = setInterval(function() {
                    if (PRA.pageData[l].changed === true) {
                        PRA.submitChangedPages(l, callback);
                    } else {
                        PRA.requestCompleted[l] = true;
                    }
                    l++;
                    if (l === PRA.pageData.length) {
                        clearInterval(throttle);
                    }
                }, PRA.options.interval || 500);
            });
        },
        processPageCallback: function(result) {
            for (var i in result.query.pages) {
                var keyNum = PRA.queueData.indexOf(result.query.pages[i].title);
                PRA.pageData[keyNum] = {
                    title: PRA.queueData[keyNum],
                    content: result.query.pages[i].revisions[0]['*'],
                    changed: false
                };
            }
        },
        submitChangedPages: function(pageKey, callback) {
            var data = PRA.pageData[pageKey];
            PRA.api.post({
                action: 'edit',
                title: data.title,
                summary: PRA.options.editSummary || PRA.i18n.inContentLang().msg('summary').plain(),
                text: data.content,
                minor: true,
                nocreate: true,
                redirect: false,
                bot: true,
                token: mw.user.tokens.get('csrfToken')
            }).then(function() {
                PRA.requestCompleted[pageKey] = true;
                console.log('Posted page', data.title);
                $('#PRAProgressInd').css('width', ++PRA.queueProgress / PRA.pageData.length * 100 + '%');
                if (PRA.requestCompleted.indexOf(false) === -1) {
                    PRA.started = false;
                    $('#PRAQueueProgress').remove();
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }).fail(function(code) {
                alert(PRA.i18n.msg('notSubmitted', data.title, code).plain());
                PRA.failedLog(data.title);
            });
        },
        movePage: function(callback) {
            PRA.api.post({
                action: 'move',
                from: PRA.oldName,
                to: PRA.newName,
                reason: PRA.reason,
                movetalk: false,
                noredirect: true,
                ignorewarnings: true,
                token: mw.user.tokens.get('csrfToken')
            }).then(function() {
                console.log('Moved page', PRA.oldName);
                if (typeof callback === 'function') {
                    callback();
                }
            }).fail(function(code) {
                var errorMsg = PRA.i18n.msg('articleExistsPrompt', PRA.oldName, PRA.newName, code).plain();
                if (code === 'articleexists' || code === 'invalidtitle') {
                    var promptResponse = prompt(errorMsg + '\n' + PRA.i18n.msg('anotherDestName'.plain()));
                    if (promptResponse) {
                        PRA.newName = promptResponse;
                        PRA.movePage(callback);
                    } else {
                        PRA.started = false;
                        PRA.toggleInputs(true);
                    }
                } else {
                    alert(errorMsg);
                    PRA.started = false;
                    PRA.toggleInputs(true);
                }
            });
        },
        toggleInputs: function(toggle) {
            $('#wpNewTitleMain, #wpReason').attr('disabled', toggle === false);
        },
        failedLog: function(page) {
            var ui = window.dev.dorui;
            $('#PRAFailedLog').append(ui.div({
                child: ui.a({
                    attrs: {
                        href: mw.util.getUrl(page),
                        target: '_blank'
                    },
                    text: page
                })
            }));
        },
        updateQueueListing: function() {
            var ui = window.dev.dorui;
            if (!PRA.queueData || PRA.queueData.length < 1) {
                $('#PRAQueue').html(ui.div({
                    text: PRA.i18n.msg('nothingInQueue').plain()
                }));
                $('#PRAQueueLengthBox').text('0');
                return false;
            }
            $('#PRAQueue').html(PRA.queueData.map(function(page) {
                return ui.div({
                    attrs: {
                        href: mw.util.getUrl(page),
                        target: '_blank'
                    },
                    text: page
                });
            }));
            $('#PRAQueueLengthBox').text(PRA.queueData.length);
        },
        labelAndInput: function(ui, labelMsg, input) {
            return ui.tr({
                children: [
                    ui.td({
                        classes: ['mw-label'],
                        text: PRA.i18n.msg(labelMsg).plain()
                    }),
                    ui.td({
                        classes: ['mw-input'],
                        child: input
                    })
                ]
            });
        },
        initialize: function(i18n) {
            var ui = window.dev.dorui;
            PRA.api = new mw.Api();
            PRA.i18n = i18n;
            importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:PageRenameAuto-update.css'
            });
            if (
                PRA.wg.wgCanonicalSpecialPageName === 'Blankpage' &&
                mw.util.getParamValue('blankspecial') === 'pageusageupdate'
            ) {
                var page = mw.util.getParamValue('pagename');
                $('.page-header__title').text(i18n.msg('header', page).plain());
                $('#content').html(ui.frag([
                    ui.p({
                        html: i18n.msg('infoText').parse()
                    }),
                    ui.p({
                        html: i18n.msg('notMovedNote').parse()
                    }),
                    ui.p({
                        html: i18n.msg('warning').parse()
                    }),
                    ui.fieldset({
                        children: [
                            ui.legend({
                                text: i18n.msg('fieldTitle').plain()
                            }),
                            ui.table({
                                attrs: {
                                    id: 'mw-renamepage-table'
                                },
                                children: [
                                    PRA.labelAndInput(ui, 'currentName', ui.a({
                                        attrs: {
                                            href: mw.util.getUrl(page)
                                        },
                                        text: page
                                    })),
                                    PRA.labelAndInput(ui, 'newNameField', ui.input({
                                        attrs: {
                                            name: 'wpNewTitleMain',
                                            value: page,
                                            type: 'text',
                                            id: 'wpNewTitleMain',
                                            maxlength: 255
                                        }
                                    })),
                                    PRA.labelAndInput(ui, 'reason', ui.textarea({
                                        attrs: {
                                            name: 'wpReason',
                                            id: 'wpReason',
                                            cols: 60,
                                            rows: 2,
                                            maxlength: 255
                                        }
                                    })),
                                    ui.tr({
                                        children: [
                                            ui.td({
                                                html: '&#160;'
                                            }),
                                            ui.td({
                                                classes: ['mw-submit'],
                                                children: [
                                                    ui.a({
                                                        attrs: {
                                                            id: 'PRAstart'
                                                        },
                                                        classes: ['wds-button'],
                                                        events: {
                                                            click: PRA.start
                                                        },
                                                        text: i18n.msg('populateListButton').plain()
                                                    }),
                                                    ui.a({
                                                        attrs: {
                                                            id: 'PRAprocess'
                                                        },
                                                        classes: ['wds-button'],
                                                        events: {
                                                            click: PRA.processQueue
                                                        },
                                                        style: {
                                                            display: 'none'
                                                        },
                                                        text: i18n.msg('processQueueButton').plain()
                                                    }),
                                                    ui.span({
                                                        attrs: {
                                                            id: 'liveLoader'
                                                        },
                                                        child: ui.img({
                                                            attrs: {
                                                                // eslint-disable-next-line max-len
                                                                src: 'https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif'
                                                            }
                                                        }),
                                                        style: {
                                                            display: 'none'
                                                        }
                                                    }),
                                                    ui.span({
                                                        attrs: {
                                                            id: 'PRAStatus'
                                                        }
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    PRA.labelAndInput(ui, 'queuedItems', ui.div({
                                        attrs: {
                                            id: 'PRAQueue'
                                        }
                                    })),
                                    ui.tr({
                                        children: [
                                            ui.td({
                                                classes: ['mw-label'],
                                                html: '&#160;'
                                            }),
                                            ui.td({
                                                classes: [
                                                    'mw-input',
                                                    'PRAinfo'
                                                ],
                                                child: ui.div({
                                                    attrs: {
                                                        id: 'PRAQueueLength'
                                                    },
                                                    // TODO: Hack?
                                                    html: i18n.msg('pagesInQueue').escape().replace('$1', ui.span({
                                                        attrs: {
                                                            id: 'PRAQueueLengthBox'
                                                        }
                                                    }).outerHTML)
                                                })
                                            })
                                        ]
                                    }),
                                    PRA.labelAndInput(ui, 'failedItems', ui.div({
                                        attrs: {
                                            id: 'PRAFailedLog'
                                        },
                                        text: i18n.msg('failedItemsInfo').plain()
                                    }))
                                ]
                            })
                        ]
                    })
                ]));
                document.title = i18n.msg('title').plain();
                PRA.updateQueueListing();
            } else {
                $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list').append(ui.li({
                    child: ui.a({
                        attrs: {
                            href: mw.util.getUrl('Special:BlankPage', {
                                blankspecial: 'pageusageupdate',
                                pagename: PRA.wg.wgPageName,
                                namespace: PRA.wg.wgNamespaceNumber
                            }),
                            title: i18n.msg('buttonText').plain()
                        },
                        text: i18n.msg('buttonText').plain()
                    })
                }));
            }
        },
        preload: function() {
            $.when(
                window.dev.i18n.loadMessages('PageRenameAuto-update'),
                mw.loader.using([
                    'mediawiki.api',
                    'mediawiki.user',
                    'mediawiki.util'
                ])
            ).then(PRA.initialize);
        }
    };
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Dorui.js'
        ]
    }).then(PRA.preload);
    window.PRA = PRA;
})();