(function () {
    var userGroups = mw.config.get('wgUserGroups');
    if (userGroups.includes('sysop') || userGroups.includes('content-moderator')) {
        console.log("User has the required privileges, continuing execution.");
    } else {
        console.log("User does not have the required privileges, stopping execution.");
        return;
    }
})();

window.batchDeleteDelay = 1;
window.batchUndeleteDelay = 1;
window.AjaxContentModel = {
    doKeyBind: false,
    toolbarPlacement: false
};
window.nukeDelay = 1;
window.nullEditDelay = 1;
window.MassEditConfig = {
    interval: 1,
};
window.massProtectDelay = 1;
window.massRenameDelay = 1;
window.massRollback = {
    displayText: '批量回退',
    doneText: '已完成',
    placement: '.mw-custom-rollback-link',
}
window.MessageBlock = {
    title: '你已被封禁',
    message: '封禁时长: $2。封禁原因: $1。执行者: $3。'
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:QuickDiff/code.js',
        // [[w:c:dev:QuickDiff]]
        'u:dev:MediaWiki:AjaxEditPreview.js',
        // [[w:c:dev:AjaxEditPreview]]
        'u:dev:MediaWiki:AjaxBlock/code.js',
        // [[w:c:dev:AjaxBlock]]
        'u:dev:MediaWiki:FastDelete/code.js',
        // [[w:c:dev:FastDelete]]
        'u:dev:MediaWiki:AjaxBatchDelete.js',
        // [[w:c:dev:AjaxBatchDelete]]
        'u:dev:MediaWiki:AjaxBatchUndelete.js',
        // [[w:c:dev:AjaxBatchUndelete]]
        'u:dev:MediaWiki:AjaxDelete/code.js',
        // [[w:c:dev:AjaxDelete]]
        'u:dev:MediaWiki:AjaxRename/code.js',
        // [[w:c:dev:AjaxRename]]
        'u:dev:MediaWiki:AjaxUndo/code.js',
        // [[w:c:dev:AjaxUndo]]
        'u:dev:MediaWiki:AjaxContentModel.js',
        // [[w:c:dev:AjaxContentModel]]
        'u:dev:MediaWiki:PurgeButton.js',
        // [[w:c:dev:PurgeButton]]
        'u:dev:MediaWiki:Nuke/code.js',
        // [[w:c:dev:Nuke]]
        'u:dev:MediaWiki:AnchoredRollback/code.js',
        // [[w:c:dev:AnchoredRollback]]
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
        // [[w:c:dev:MultipleFileDelete]]
        'u:dev:MediaWiki:FileTools.js',
        // [[w:c:dev:FileTools]]
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
        // [[w:c:dev:FileUsageAuto-update]]
        'u:dev:MediaWiki:DupImageList/code.js',
        // [[w:c:dev:DupImageList]]
        'u:dev:MediaWiki:NullEditButton/code.js',
        // [[w:c:dev:NullEditButton]]
        'u:dev:MediaWiki:MassNullEdit/code.js',
        // [[w:c:dev:MassNullEdit]]
        'u:dev:MediaWiki:MassEdit/code.js',
        // [[w:c:dev:MassEdit]]
        'u:dev:MediaWiki:MassProtect/code.js',
        // [[w:c:dev:MassProtect]]
        'u:dev:MediaWiki:MassRename/code.js',
        // [[w:c:dev:MassRename]]
        'u:dev:MediaWiki:MassRollback.js',
        // [[w:c:dev:MassRollback]]      
        // 'u:dev:MediaWiki:PageRenameAuto-update/code.js',
        // [[w:c:dev:PageRenameAuto-update]]
        'u:dev:MediaWiki:Rollback/code.js',
        // [[w:c:dev:Rollback]]
        'u:dev:MediaWiki:JWB/load.js',
        // [[w:c:dev:JWB/load]]
        'u:dev:MediaWiki:Stella.js',
        // [[w:c:dev:Stella]]
        'u:dev:MediaWiki:MinimalTemplateClassification.js',
        // [[w:c:dev:MinimalTemplateClassification]]
        'u:dev:MediaWiki:MorePageActions/code.js',
        // [[w:c:dev:MorePageActions]]
        'u:dev:MediaWiki:ParentPageEdit.js',
        // [[w:c:dev:ParentPageEdit]]
        'u:dev:MediaWiki:MessageBlock/code.js',
        // [[w:c:dev:MessageBlock]]
        'u:dev:MediaWiki:CopyCodeButton.js',
        // [[w:c:dev:CopyCodeButton]]
        'u:dev:MediaWiki:ImportJSPage/code.js',
        // [[w:c:dev:ImportJSPage]]
        'u:dev:MediaWiki:DisableCode/code.js',
        // [[w:c:dev:DisableCode]]
        'u:dev:MediaWiki:AddArticleToCategory/code.js',
        // [[w:c:dev:AddArticleToCategory]]
        'u:dev:MediaWiki:JSONViewer.js',
        // [[w:c:dev:JSONViewer]]
        'u:dev:MediaWiki:ThemeToggler.js'
        // [[w:c:dev:ThemeToggler]]
    ]
});

importScript('User:0.Phixley/scripts/ForMassEdit.js');
// [[User:0.Phixley/scripts/ForMassEdit.js]]

importScript('User:0.Phixley/scripts/ForTPUndo.js');
// [[User:0.Phixley/scripts/ForTPUndo.js]]

/* [[w:c:dev:MediaWiki:PageRenameAuto-update/code.js]]，去除用户组检测 */
/* eslint-disable max-statements */
/* eslint-disable no-alert */
/**
 * Name:        PageRenameAuto-update
 * Version:     v2.0
 * Description: Updates page links in use on the wiki when the page is renamed.
 * Authors:     Foodbandlt
 *              Jr Mime
 *              KockaAdmiralac
 * Used files:  [[File:Circle throbber.gif]]
 */
(function () {
    'use strict';
    // if (window.PRA || !/content-moderator|staff|bot|sysop|content-volunteer|wiki-specialist|global-edit-reviewer/g.test(mw.config.get('wgUserGroups').join('|'))) {
    //     return;
    // }
    var PRA = {
        started: false,
        options: window.PRAoptions || {},
        wg: mw.config.get([
            'wgCanonicalSpecialPageName',
            'wgNamespaceIds',
            'wgNamespaceNumber',
            'wgPageName'
        ]),
        updateStatus: function (gifDisplay, message) {
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
        start: function (callback) {
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
            }).then(function (result) {
                if (result.query.pages[-1]) {
                    return PRA.getUsage(PRA.oldName);
                }
                PRA.started = false;
                PRA.updateStatus(false, PRA.i18n.msg('destInUse').escape());
                PRA.toggleInputs(true);
                if (typeof callback === 'function') {
                    callback(false, 'destinuse');
                }
            }).then(function (result) {
                if (!result) {
                    return;
                }
                var transUsage = result.query.embeddedin;
                var pageLinks = result.query.backlinks;
                var catMembers = result.query.categorymembers || [];
                var imageUsages = result.query.imageusage || [];
                var pageUsage = transUsage.concat(pageLinks).concat(catMembers).concat(imageUsages);
                console.log('Usage successfully retrieved');
                if (pageUsage.length > 0) {
                    PRA.queueData = pageUsage.map(function (page) {
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
        getUsage: function (page) {
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
            } else if (mw.util.getParamValue('namespace') === '6') {
                options.list += '|imageusage';
                options.iutitle = page;
                options.iulimit = 'max';
            }
            return PRA.api.get(options);
        },
        processQueue: function () {
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
            PRA.movePage(function () {
                PRA.processPageContent(function () {
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
        processPageContent: function (callback) {
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
                while (tempArray.length > 0) {
                    promises.push(PRA.api.post({
                        action: 'query',
                        prop: 'revisions',
                        rvprop: 'content',
                        titles: tempArray.splice(0, 50)
                    }).then(PRA.processPageCallback));
                }
            }
            $.when.apply(this, promises).then(function () {
                console.log('Page contents retrieved and saved. Begin processing page content.');
                // Replacing image name on each page
                var escapeRegExp = mw.RegExp.escape || mw.util.escapeRegExp;
                var escapedName = escapeRegExp(PRA.oldName).replace(/( |_)/g, '[ _]*?');
                if (escapedName.slice(0, 1).match(/[A-Za-z]/i)) {
                    escapedName = '[' + escapedName.slice(0, 1).toUpperCase() +
                        escapedName.slice(0, 1).toLowerCase() + ']' + escapedName.slice(1);
                }
                // Support variations (i.e. canonical, localized, image alias) for file namespace
                var escapedFileNamespaceNames = Object.entries(PRA.wg.wgNamespaceIds).flatMap(function (entry) {
                    if (entry[1] !== 6) return [];
                    var escapedFileNamespaceName = escapeRegExp(entry[0]) + ':';
                    // TODO: Confirm naive capitalisation works on all supported localisations
                    escapedFileNamespaceName = '[' + escapedFileNamespaceName.slice(0, 1).toUpperCase() +
                        escapedFileNamespaceName.slice(0, 1).toLowerCase() + ']' +
                        escapedFileNamespaceName.slice(1);
                    return [escapedFileNamespaceName];
                });
                var isFile = false;
                if (escapedFileNamespaceNames.some(function (escapedFileNamespaceName) { return escapedName.startsWith(escapedFileNamespaceName); })) {
                    // Optionally match file namespace (as portable infoboxes and galleries
                    // typically reference files without the namespace prefix)
                    var escapedName = '(' + escapedFileNamespaceNames.join('|') + ')?' +
                        escapedName.slice(escapedName.indexOf(':') + 1);
                    isFile = true;
                    PRA.newNameWithoutNamespace = PRA.newName.slice(PRA.newName.indexOf(':') + 1);
                }
                var pageReplacement = new RegExp(
                    '(:?|=[ ]*?|\\||\\[|\\{)' + escapedName + '(.*?\\n|[ ]*?\\||\\]|\\})',
                    'g'
                );
                var replacementReg = new RegExp(escapedName, 'g');
                PRA.pageData.forEach(function (data) {
                    if (data.content.search(pageReplacement) === -1) {
                        PRA.failedLog(data.title);
                    } else {
                        data.changed = true;
                        console.log(PRA.oldName, 'replaced on page', data.title);
                        var regExec;
                        while ((regExec = pageReplacement.exec(data.content)) !== null) {
                            var newName = (isFile && !regExec[2]) ? PRA.newNameWithoutNamespace : PRA.newName;
                            var replaced = regExec[0].replace(replacementReg, newName);
                            data.content = data.content.replace(regExec[0], replaced);
                            pageReplacement.lastIndex += replaced.length - regExec[0].length;
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
                var throttle = setInterval(function () {
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
        processPageCallback: function (result) {
            for (var i in result.query.pages) {
                var keyNum = PRA.queueData.indexOf(result.query.pages[i].title);
                PRA.pageData[keyNum] = {
                    title: PRA.queueData[keyNum],
                    content: result.query.pages[i].revisions[0]['*'],
                    changed: false
                };
            }
        },
        submitChangedPages: function (pageKey, callback) {
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
            }).then(function () {
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
            }).fail(function (code) {
                alert(PRA.i18n.msg('notSubmitted', data.title, code).plain());
                PRA.failedLog(data.title);
            });
        },
        movePage: function (callback) {
            PRA.api.post({
                action: 'move',
                from: PRA.oldName,
                to: PRA.newName,
                reason: PRA.reason,
                movetalk: false,
                noredirect: true,
                ignorewarnings: true,
                token: mw.user.tokens.get('csrfToken')
            }).then(function () {
                console.log('Moved page', PRA.oldName);
                if (typeof callback === 'function') {
                    callback();
                }
            }).fail(function (code) {
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
        toggleInputs: function (toggle) {
            $('#wpNewTitleMain, #wpReason').attr('disabled', toggle === false);
        },
        failedLog: function (page) {
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
        updateQueueListing: function () {
            var ui = window.dev.dorui;
            if (!PRA.queueData || PRA.queueData.length < 1) {
                $('#PRAQueue').html(ui.div({
                    text: PRA.i18n.msg('nothingInQueue').plain()
                }));
                $('#PRAQueueLengthBox').text('0');
                return false;
            }
            $('#PRAQueue').html(PRA.queueData.map(function (page) {
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
        labelAndInput: function (ui, labelMsg, input) {
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
        initialize: function (i18n) {
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
                                                                src: 'https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif'
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
        preload: function () {
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

/* 预览JS */
(function () {
    "use strict";
    var page = mw.config.get('wgPageName');
    var model = mw.config.get('wgPageContentModel');
    if (!page || model !== 'javascript') return;
    var SKIP_PAGES = {
        'User:0.Phixley/common.js': true,
        'MediaWiki:Common.js': true,
        'MediaWiki:Custom-ImprovedProfileTags.js': true
    };
    if (SKIP_PAGES[page]) {
        console.log('已跳过: ', page);
        return;
    }
    window.__fandom_injected_js_pages = window.__fandom_injected_js_pages || Object.create(null);
    if (window.__fandom_injected_js_pages[page]) return;
    window.__fandom_injected_js_pages[page] = 'pending';
    var rawUrl = mw.util.getUrl(page, { action: 'raw', ctype: 'text/javascript' });
    fetch(rawUrl, { credentials: 'same-origin' })
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        })
        .then(function (jsText) {
            if (!jsText) {
                window.__fandom_injected_js_pages[page] = 'done';
                return;
            }
            if (document.querySelector('script[data-injected-from="' + page + '"]')) {
                window.__fandom_injected_js_pages[page] = 'done';
                return;
            }
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.setAttribute('data-injected-from', page);
            try { script.appendChild(document.createTextNode(jsText)); }
            catch (e) { script.text = jsText; }
            (document.head || document.documentElement).appendChild(script);
            window.__fandom_injected_js_pages[page] = 'done';
        })
        .catch(function (err) {
            console.error('注入JS源失败: ', page, err);
            if (window.__fandom_injected_js_pages[page] === 'pending') { delete window.__fandom_injected_js_pages[page]; }
        });
}());

/* HTMLEscape */
(function () {
    'use strict';
    var NAMESPACE = 'HTMLEscape';
    var MAX_WAIT_MS = 10000;
    var CHECK_INTERVAL = 100;
    function _makeEscapeImplementation($) {
        if ($ && $.fn && typeof $('<div/>').text === 'function') {
            return function escapeHTMLWithjQuery(input) {
                try {
                    var s = input === null || input === undefined ? '' : String(input);
                    return $('<div/>').text(s).html();
                } catch (e) {
                    return escapeHTMLBasic(input);
                }
            };
        } else if (typeof document !== 'undefined' && document.createTextNode) {
            return function escapeHTMLWithDOM(input) {
                try {
                    var s = input === null || input === undefined ? '' : String(input);
                    var tn = document.createTextNode(s);
                    var div = document.createElement('div');
                    div.appendChild(tn);
                    return div.innerHTML;
                } catch (e) {
                    return escapeHTMLBasic(input);
                }
            };
        } else {
            return escapeHTMLBasic;
        }
    }
    function escapeHTMLBasic(input) {
        var s = input === null || input === undefined ? '' : String(input);
        return s.replace(/[&<>"'`=\/]/g, function (c) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#47;',
                '`': '&#96;',
                '=': '&#61;'
            }[c];
        });
    }
    function installEscape(impl) {
        try {
            if (typeof mw === 'object' && typeof mw.htmlEscape !== 'function') {
                mw.htmlEscape = impl;
                console.log('[Polyfill][' + NAMESPACE + '] installed mw.htmlEscape');
            }
            if (typeof window !== 'undefined') {
                if (typeof window.escapeHTML !== 'function') window.escapeHTML = impl;
                if (typeof window[NAMESPACE] !== 'function') window[NAMESPACE] = impl;
            }
        } catch (e) {
            console.error('[Polyfill][' + NAMESPACE + '] Error installing escape function', e);
        }
    }
    function waitForEnvAndInstall() {
        var waited = 0;
        var intervalId = setInterval(function () {
            waited += CHECK_INTERVAL;
            var haveMW = typeof mw !== 'undefined' && mw !== null;
            var haveJQ = typeof jQuery !== 'undefined' && jQuery !== null;
            if (haveMW || haveJQ || waited >= MAX_WAIT_MS) {
                clearInterval(intervalId);
                var impl = _makeEscapeImplementation(haveJQ ? jQuery : null);
                installEscape(impl);
                if (waited >= MAX_WAIT_MS) {
                    console.warn('[Polyfill][' + NAMESPACE + '] timed out waiting for mw/jQuery — installed best-effort implementation');
                }
            }
        }, CHECK_INTERVAL);
    }
    try {
        waitForEnvAndInstall();
    } catch (e) {
        installEscape(escapeHTMLBasic);
    }
    try {
        if (typeof window !== 'undefined') {
            window[NAMESPACE + '_getImpl'] = function () {
                if (typeof mw === 'object' && typeof mw.htmlEscape === 'function') return mw.htmlEscape;
                if (typeof window[NAMESPACE] === 'function') return window[NAMESPACE];
                return escapeHTMLBasic;
            };
        }
    } catch (e) { /* ignore */ }
})();

/* 清空页面 */
(function () {
    if (mw.config.get('wgIsProbablyEditable') !== true) return;
    if (mw.config.get('wgUserName') === null) return;
    $(function () {
        var $menu = $('#p-cactions > ul');
        if (!$menu.length) return;
        var $li = $('<li>');
        var $a = $('<a>', {
            id: 'ca-clearall',
            href: '#clear',
            text: '清空'
        });
        $li.append($a);
        $menu.append($li);
        $a.on('click', function (e) {
            e.preventDefault();
            var api = new mw.Api();
            var title = mw.config.get('wgPageName');
            var revId = mw.config.get('wgCurRevisionId');
            api.postWithToken('csrf', {
                action: 'edit',
                title: title,
                text: '',
                summary: '清空页面内容',
                minor: true,
                baserevid: revId
            }).done(function () {
                location.reload();
            }).fail(function (err) {
                console.error('清空失败:', err);
            });
        });
    });
})();