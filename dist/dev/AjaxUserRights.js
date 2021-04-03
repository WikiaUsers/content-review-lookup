/**
 * @docs   [[AjaxUserRights]]
 * @name   AjaxUserRights
 * @desc   Allows to change usergroups of users without leaving the current page
 * @author Kofirs2634
 */ 

$(function() {
    if (window.AjaxUserRightsLoaded) return;
    window.AjaxUserRightsLoaded = true;

    const isUCP = mw.config.get('wgVersion') !== '1.19.24';
    const rightsCanon =  isUCP ?
        ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'rollback'] :
        ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback'];
    var config = mw.config.get(['wgPageName', 'wgNamespaceNumber', 'wgUserGroups', 'wgUserName']),
        target, modal, i18n,
        api = new mw.Api();

    if (config.wgUserGroups.length <= 3) return;

    function getRights() {
        target = $('#aur-target').val();
        if (!target) return;

        api.get({
            action: 'query',
            list: 'users',
            ususers: target,
            usprop: 'groups'
        }).then(function(data) {
            rights = data.query.users[0].groups;

            // adding the reason field
            $('#aur-wrap').empty()
            .append($('<span>', {
                style: 'font-weight: bold',
                text: i18n.msg('reason').plain()
            })).append($('<input>', { id: 'aur-reason' })).append('<br>');
            // $('#aur-btn-give').removeAttr('disabled');

            // making list
            for (i = 0; i < rightsCanon.length; i++) {
                $('#aur-wrap').append($('<label>', {
                    text: i18n.msg(rightsCanon[i]).plain()
                }).prepend($('<input>', {
                    type: 'checkbox',
                    id: 'aur-group-' + rightsCanon[i],
                    disabled: true
                })).after('<br>'));
            }

            // disabling and enabling checkboxes
            if (config.wgUserGroups.includes(rightsCanon[0])) {
                if (target == config.wgUserName) {
                    $('#aur-group-bureaucrat').removeAttr('disabled');
                    $('#aur-group-sysop').removeAttr('disabled');
                    $('#aur-group-content-moderator').removeAttr('disabled');
                    $('#aur-group-rollback').removeAttr('disabled');
                } else {
                    if (rights.includes(rightsCanon[0])) {
                        $('#aur-group-sysop').removeAttr('disabled');
                        $('#aur-group-content-moderator').removeAttr('disabled');
                        $('#aur-group-rollback').removeAttr('disabled');
                    } else {
                        $('#aur-group-bureaucrat').removeAttr('disabled');
                        $('#aur-group-sysop').removeAttr('disabled');
                        $('#aur-group-content-moderator').removeAttr('disabled');
                        $('#aur-group-rollback').removeAttr('disabled');
                    }
                }
            }
            if (config.wgUserGroups.includes(rightsCanon[1])) {
                if (target == config.wgUserName) {
                    $('#aur-group-sysop').removeAttr('disabled');
                    $('#aur-group-chatmoderator').removeAttr('disabled');
                    $('#aur-group-threadmoderator').removeAttr('disabled');
                    config.wgUserGroups.forEach(function(e) {
                        $('#aur-group-' + e).removeAttr('disabled');
                    });
                } else { // но это не ты
                    $('#aur-group-chatmoderator').removeAttr('disabled');
                    $('#aur-group-threadmoderator').removeAttr('disabled');
                }
            }
            if (!config.wgUserGroups.includes(rightsCanon[0]) && !config.wgUserGroups.includes(rightsCanon[1])) {
                if (target == config.wgUserName) {
                    config.wgUserGroups.forEach(function(e) {
                        $('#aur-group-' + e).removeAttr('disabled');
                    });
                }
            }

            // giving ticks
            rights.forEach(function(e) { if (rightsCanon.includes(e)) $('#aur-group-' + e).attr('checked', 'checked') });
        });
    }

    function giveRights() {
        // creating arrays of groups for API query
        var add = [], remove = [];
        for (i = 0; i < $('#aur-wrap input[type="checkbox"]').length; i++) {
            if ($('#aur-wrap input[type="checkbox"]')[i].checked && !$('#aur-wrap input[type="checkbox"]')[i].disabled) add[add.length] = rightsCanon[i];
            else if (!$('#aur-wrap input[type="checkbox"]')[i].checked && !$('#aur-wrap input[type="checkbox"]')[i].disabled) remove[remove.length] = rightsCanon[i];
        }
        // query itself inspired by GiveChatMod
        api.get({
            action: 'query',
            list: 'users',
            meta: 'tokens',
            type: 'userrights',
            ususers: target,
            ustoken: 'userrights',
        }).done(function(data) {
            opts = {
                action: 'userrights',
                user: target,
                token: (data.query.tokens || data.query.users[0]).userrightstoken,
                reason: $('#aur-reason').val(),
                remove: remove.join('|'),
                add: add.join('|')
            };
            api.post(opts).done(function(result) {
                if (!result.warnings && (Object.keys(result.userrights.added).length > 0 || Object.keys(result.userrights.removed).length > 0 )) {
                    if (isUCP) {
                        mw.notify(i18n.msg('notification-success').plain());
                    } else {
                        new BannerNotification(i18n.msg('notification-success').escape(), 'confirm').show();
                    }
                } else {
                    if (isUCP) {
                        mw.notify(i18n.msg('notification-error').plain(), {
                            type: 'error'
                        });
                    } else {
                        new BannerNotification(i18n.msg('notification-error').escape(), 'error').show();
                    }
                    console.warn(result);
                }
            });
        });
    }

    function createModal() {
        modal = new window.dev.modal.Modal({
            content: '<div id="aur-modal-wrap" />',
            id: 'aur-modal',
            size: 'medium',
            title: 'AjaxUserRights',
            buttons: [{
                primary: true,
                id: 'aur-btn-get',
                text: i18n.msg('button-get').plain(),
                event: 'get'
            }, {
                primary: true,
                // HACK: [[Modal]] does not support easily re-enabling buttons yet
                // disabled: true,
                id: 'aur-btn-give',
                text: i18n.msg('button-give').plain(),
                event: 'give'
            }, {
                id: 'aur-btn-cancel',
                text: i18n.msg('button-cancel').plain(),
                event: 'close'
            }],
            events: {
                give: giveRights,
                get: getRights
            }
        });
        modal.create();
    }

    function appendButton() {
        $('#my-tools-menu').prepend($('<li>', { 'class': 'aur-open' }).append($('<a>', {
            href: '#',
            text: 'AjaxUserRights'
        })).click(function() {
            $('#aur-modal-wrap').append($('<span>', {
                style: 'font-weight: bold',
                text: i18n.msg('username').plain()
            })).append($('<input>', { id: 'aur-target' })).append('<br>')
            .append($('<div>', { id: 'aur-wrap' }));
            modal.show();
        }));
    }

    importArticles({ type: 'script', articles: [
        'u:dev:MediaWiki:Modal.js',
        'u:dev:MediaWiki:I18n-js/code.js'
    ]});

    mw.loader.using(isUCP ? ['mediawiki.api', 'mediawiki.notify'] :'mediawiki.api').then(function() {
        mw.hook('dev.i18n').add(function(i18np) {
            i18np.loadMessages('AjaxUserRights').then(function(i18np) {
                i18n = i18np;
                i18n.useUserLang();
                mw.hook('dev.modal').add(function() { createModal() });
            });
        });
        appendButton();
    });
});