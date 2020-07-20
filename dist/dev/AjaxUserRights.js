/**
 * @docs   [[AjaxUserRights]]
 * @name   AjaxUserRights
 * @desc   Allows to change usergroups of users without leaving the current page
 * @author Kofirs2634
 */ 

$(function() {
    if (window.AjaxUserRightsLoaded) return;
    window.AjaxUserRightsLoaded = true;

    const rightsCanon = ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback'];
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
        }, function(data) {
            rights = data.query.users[0].groups;

            // adding the reason field
            $('#aur-wrap').empty()
            .append($('<span>', {
                style: 'font-weight: bold',
                text: i18n.msg('reason').plain()
            })).append($('<input>', { id: 'aur-reason' })).append('<br>');
            $('#aur-btn-give').removeAttr('disabled');

            // making list
            for (i = 0; i < 6; i++) {
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
                    })
                } else { // но это не ты
                    $('#aur-group-chatmoderator').removeAttr('disabled');
                    $('#aur-group-threadmoderator').removeAttr('disabled');
                }
            }
            if (!config.wgUserGroups.includes(rightsCanon[0]) && !config.wgUserGroups.includes(rightsCanon[1])) {
                if (target == config.wgUserName) {
                    config.wgUserGroups.forEach(function(e) {
                        $('#aur-group-' + e).removeAttr('disabled');
                    })
                }
            }

            // giving ticks
            rights.forEach(function(e) { if (rightsCanon.includes(e)) $('#aur-group-' + e).attr('checked', 'checked') })
        })
    }

    function giveRights() {
        // creating arrays of groups for API query
        var add = [], remove = [];
        for (i = 0; i < $('#aur-wrap input[type="checkbox"]').length; i++) {
            if ($('#aur-wrap input[type="checkbox"]')[i].checked && !$('#aur-wrap input[type="checkbox"]')[i].disabled) add[add.length] = rightsCanon[i]
            else if (!$('#aur-wrap input[type="checkbox"]')[i].checked && !$('#aur-wrap input[type="checkbox"]')[i].disabled) remove[remove.length] = rightsCanon[i];
        }
        // query itself inspired by GiveChatMod
        api.get({
            action: 'query',
            list: 'users',
            ususers: target,
            ustoken: 'userrights',
        }, function(data) {
            opts = {
                action: 'userrights',
                user: target,
                token: data.query.users[0].userrightstoken,
                reason: $('#aur-reason').val(),
                remove: remove.join('|'),
                add: add.join('|')
            };
            console.log(opts)
            api.post(opts, function(result) {
                if (!result.warnings && (result.userrights.added.length > 0 || result.userrights.removed.length > 0 )) {
                    new BannerNotification(i18n.msg('notification-success').plain(), 'confirm').show();
                } else {
                    new BannerNotification(i18n.msg('notification-error').plain(), 'error').show();
                    console.warn(result);
                }
            })
        });
    }

    function createModal() {
        modal = new window.dev.modal.Modal({
            content: '<div id="aur-modal-wrap" />',
            id: 'aur-modal',
            size: 'small',
            title: 'AjaxUserRights',
            buttons: [{
                primary: true,
                id: 'aur-btn-get',
                text: i18n.msg('button-get').plain(),
                event: 'get'
            }, {
                primary: true,
                disabled: true,
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
        })
        modal.create()
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
            modal.show()
        }))
    }

    importArticles({ type: 'script', articles: [
        'u:dev:MediaWiki:Modal.js',
        'u:dev:MediaWiki:I18n-js/code.js'
    ]});

    mw.loader.using('mediawiki.api').then(function() {
        mw.hook('dev.i18n').add(function(i18np) {
            i18np.loadMessages('AjaxUserRights').then(function(i18np) {
                i18n = i18np;
                i18n.useUserLang();
                mw.hook('dev.modal').add(function() { createModal() });
            });
        })
        appendButton();
    })
})