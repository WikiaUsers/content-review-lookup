/**
 * @title ToDoList
 * @version v2.0.1
 * @author DarkBarbarian
 * @description Lets you edit and view your local to do page without leaving the current page
 * The init and preload functions are inspired by https://dev.fandom.com/wiki/MediaWiki:AjaxBatchDelete.js?oldid=120334
 */

mw.loader.using('mediawiki.api', function() {
    "use strict";
    
    if (window.toDoListLoaded) {
        return;
    }
    window.toDoListLoaded = true;

    var api = new mw.Api(),
        i18n,
        placement,
        preloads = 3,
        toDoModal,
        user = mw.config.get('wgUserName'),
        isUCP = mw.config.get('wgVersion') !== '1.19.24';
        
    var toDoList = $.extend({
        page: 'User:' + user + '/To do',
        size: 'medium'
    }, window.toDoList);
    
    function preload() {
        if (--preloads === 0) {
            placement = window.dev.placement.loader;
            window.dev.i18n.loadMessages('ToDoList').then(init);
        }
    }

    function init(i18nData) {
        i18n = i18nData;
        placement.script('ToDoList');
        $(placement.element('toolbar'))[placement.type('append')](
            $('<li>').append(
                $('<a>', {
                    click: showToDoModal,
                    id: 'toDoButton',
                    style: 'cursor: pointer !important',
                    text: i18n.msg('toolbarTitle').plain()
                })
            )
        );
    }
    
    function notification(type, text) {
        mw.hook('dev.banners').add(function(BannerNotification) {
            new BannerNotification(text, type, isUCP ? $('#toDoModal .oo-ui-window-head') : null, 3000).show();
        });
    }
    
    function showToDoModal() {
        if (toDoModal) {
            toDoModal.show();
            getToDoList();
            return;
        }
        toDoModal = new window.dev.modal.Modal ({
            content: '<textarea id="toDoText" style="height:' + heightCSS(toDoList.size) + '; width: 100%;"></textarea>',
            id: 'toDoModal',
            size: toDoList.size,
            title: i18n.msg('title').plain(),
            buttons: [
                {
                    event: 'updateToDoList',
                    primary: true,
                    text: i18n.msg('updateButton').plain()
                },
                {
                    event: 'getToDoList',
                    primary: true,
                    text: i18n.msg('refreshButton').plain()
                },
                {
                    href: mw.util.getUrl(toDoList.page),
                    text: i18n.msg('linkButton').plain(),
                    title: i18n.msg('linkDesc', toDoList.page).plain(),
                    type: 'link'
                }
            ],
            events: {
                getToDoList: getToDoList,
                updateToDoList: updateToDoList
            }
        });
        toDoModal.create();
        toDoModal.show();
        getToDoList();
    }
    
    function heightCSS(size) {
        switch(size) {
            case 'medium':
                return '40em';
            case 'large':
                return '100%';
            default:
                return '100%';
        }
    }
    
    function getToDoList() {
        api.get({
            action: 'query',
            titles: toDoList.page,
            prop: 'revisions',
            rvslots: '*',
            rvprop: 'content'
        }).done(function(d) {
            if (!d.error) {
                var data = d.query;
                for (var i in data.pages) {
                    if (data.pages[i].missing !== undefined) {
                        notification('error', i18n.msg('pageDoesNotExist', toDoList.page).plain());
                        return;
                    }
                    
                    if (isUCP) {
                        $('#toDoText')[0].value = data.pages[i].revisions[0].slots.main['*'];
                    } else {
                        var pageContent = data.pages[i].revisions[0];
                        $('#toDoText')[0].value = pageContent[Object.keys(pageContent)[0]];
                    }
                    notification('confirm', i18n.msg('retrievedContents').plain());
                    break;
                }
            } else {
                notification('error', i18n.msg('errorWhileRetrieving').plain());
            }
        }).fail(function() {
            notification('error', i18n.msg('errorWhileRetrieving').plain());
        });
    }
    
    function updateToDoList() {
        if ($('#toDoText')[0].value.length === 0) {
            if (!confirm(i18n.msg('emptyThePage').plain())) {
                return;
            }
        }
        var token = mw.user.tokens.get('editToken');
        api.post({
            action: 'edit',
            title: toDoList.page,
            text: $('#toDoText')[0].value,
            token: token
        }).done(function(d) {
            if (!d.error) {
                notification('confirm', i18n.msg('updatedPage').plain());
            } else {
                notification('error', i18n.msg('errorWhileUpdating').plain());
            }
        }).fail(function() {
            notification('error', i18n.msg('errorWhileUpdating').plain());
        });
    }
    
    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.modal').add(preload);
    mw.hook('dev.placement').add(preload);

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Modal.js',
            'u:dev:MediaWiki:Placement.js',
            'u:dev:MediaWiki:BannerNotification.js'
        ]
    });
});