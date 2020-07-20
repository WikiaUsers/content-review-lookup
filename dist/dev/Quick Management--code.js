/* 
 * A modified version of WHAM with use rights controls and delete comments from a specific date.
 * WHAM - https://dev.fandom.com/wiki/WHAM
 * @author Gguigui1
 */
(function ($, mw) {
    var config = mw.config.get([
        "wgPageName",
        "wgUserGroups",
        "wgCanonicalSpecialPageName"
        ]),
        username = config.wgPageName.split("/")[1],
        token = mw.user.tokens.get("editToken");
    if (
        window.QuickManagementLoaded ||
        !/content-moderator|content-volunteer|sysop|vstf|staff|helper|global-discussions-moderator|content-team-member|wiki-manager/.test(config.wgUserGroups.join()) ||
        config.wgCanonicalSpecialPageName !== "Contributions"
        ) {
        return;
    }
    window.QuickManagementLoaded = true;

    $('#contentSub').append(
        $('<a>', {
            style: 'font-size: medium',
            href: 'javascript:void(0)',
            id: 'QuickManagement',
            title: 'QuickManagement',
            text: 'Quick Management'
        })
    );
    $('#mw-content-text').find('li').prepend(
        $('<input>', {
            type: 'radio',
            name: 'firstedit',
            class: 'here'
        })
    );
    $('#QuickManagement').click(function () {
        $.showCustomModal('Quick Management', '', {
            id: 'form-main',
            width: 450,
            buttons: [{
                id: "fromherebutton",
                message: 'Delete pages from here',
                defaultButton: true,
                handler: function () {
                    if (confirm("Delete all contribs from here (excluded) ?")) {
                        fromhere();
                    }
                }
            }, {
                message: 'Block user',
                defaultButton: true,
                handler: function () {
                    doBlock();
                }
            }, {
                message: 'User rights',
                defaultButton: true,
                handler: function () {
                    $('#form-main').closeModal();
                    userrights();
                }
            }, {
                message: 'Cancel',
                handler: function () {
                    closeRefresh();
                }
            }]
        });
        var test = true;
        $(".here").each(function (index) {
            if ($(this).attr('checked')) {
                test = false;
            }
        });
        if (test == true) {
            $('#fromherebutton').remove();
        }
        mw.util.addCSS('.modalWrapper .modalContent .modalToolbar {text-align:left;}');
    });

    function fromhere() {
        var okay = false;
        $(".here").each(function (index) {
            if ($(this).attr('checked')) {
                okay = true;
            }
            if (okay == true) {
                $(this).parent().remove();
            }
        });
        doRollback();
        doDelete();
    }

    function apiDelete(page, reason) {
        new mw.Api().post({
            format: 'json',
            action: 'delete',
            title: page,
            reason: reason,
            token: token
        })
            .done(function (d) {
            if (!d.error) {
                console.log('Deletion of ' + page + ' successful!');
            } else {
                console.log('Failed to delete ' + page + ': ' + d.error.code);
            }
        })
            .fail(function () {
            console.log('Failed to delete ' + page + '!');
        });
    }

    function closeRefresh() {
        $('#form-main').closeModal();
        setTimeout((function () {
            location.reload();
        }), 1000);
    }

    function userrights() {
        var usersHTML = '\
<form method="" name="" class="WikiaForm"> \
    <fieldset> \
        <center><h2>Groups:</h2><br> \
		   <input type="checkbox" class="group" name="rollback" value="rollback">Rollback<br> \
		   <input type="checkbox" class="group" name="sysop" value="sysop">Sysop<br> \
		   <input type="checkbox" class="group" name="threadmoderator" value="threadmoderator">Discussions Moderator<br> \
		   <input type="checkbox" class="group" name="content-moderator" value="content-moderator">Content Moderator<br> \
		   <input type="checkbox" class="group" name="chatmoderator" value="chatmoderator">Chat Moderator<br> \
		   <input type="checkbox" class="group" name="bot" value="bot">Bot<br> \
		   <input type="checkbox" class="group" name="bureaucrat" value="bureaucrat">Bureaucrat<br> \
    </center></fieldset> \
</form>';
        $.showCustomModal('User rights', usersHTML, {
            id: 'form-main',
            width: 300,
            buttons: [{
                message: 'Change rights',
                defaultButton: true,
                handler: function () {
                    changerights();
                }
            }, {
                message: 'Cancel',
                handler: function () {
                    closeRefresh();
                }
            }]
        });
        mw.util.addCSS('.modalWrapper .modalContent .modalToolbar {text-align:left;}');
        $('.WikiaForm').find('input[type="checkbox"]').prop('disabled', true); //Avoid quick user rights without api requests
        var url = mw.util.wikiScript('api') + '?action=query&list=users&usprop=groups&ususers=' + username + '&ustoken=userrights&format=json';
        $.getJSON(url, function (data) {
            var groups = data.query.users[0].groups || [];
            var userrightstoken = data.query.users[0].userrightstoken;
            for (i = 0; i < groups.length; i++) {
                if ($('.WikiaForm').find('input[name="' + groups[i] + '"]').length > 0) {
                    $('.WikiaForm').find('input[name="' + groups[i] + '"]').attr('checked', true);
                }
            }
            var secondurl = mw.util.wikiScript('api') + '?action=query&meta=userinfo&uiprop=changeablegroups&format=json';
            $.getJSON(secondurl, function (datas) {
                console.log(datas);
                var addgroups = datas.query.userinfo.changeablegroups.add || {};
                var removegroups = datas.query.userinfo.changeablegroups.remove || {};
                var addgroupsself = datas.query.userinfo.changeablegroups['add-self'] || [];
                var removegroupsself = datas.query.userinfo.changeablegroups['remove-self'] || [];
                $('.WikiaForm').find('input[type="checkbox"]:checked').each(function () {
                    $(this).prop("disabled", true);
                    for (var i in removegroups) {
                        if (removegroups[i] == $(this).val()) {
                            $(this).prop("disabled", false);
                        }
                    }
                });
                $('.WikiaForm').find('input[type="checkbox"]:not(:checked)').each(function () {
                    $(this).prop("disabled", true);
                    for (var i in addgroups) {
                        if (addgroups[i] == $(this).val()) {
                            $(this).prop("disabled", false);
                        }
                    }
                });
                if (wgUserName == username) {
                    for (i = 0; i < addgroupsself.length; i++) {
                        $('.WikiaForm').find('input[name="' + addgroupsself[i] + '"]:not(:checked)').prop("disabled", false);
                    }
                    for (i = 0; i < removegroupsself.length; i++) {
                        $('.WikiaForm').find('input[name="' + removegroupsself[i] + '"]:checked').prop("disabled", false);
                    }
                }
            });
        });
    }

    function changerights() {
        var reason = prompt('Reason :', 'Cleanup');
        var url = mw.util.wikiScript('api') + '?action=query&list=users&usprop=groups&ususers=' + username + '&ustoken=userrights&format=json';
        $.getJSON(url, function (data) {
            if (reason == null) {
                reason = 'User rights';
            }
            for (var p in data.query.users) {
                break;
            };
            var token = data.query.users[p].userrightstoken;
            var groupsadd = [];
            var groupsremove = [];
            var groups = "";
            $(".group").each(function (index) {
                if ($(this).attr('checked')) {
                    groupsadd.push($(this).attr('name'));
                } else {
                    groupsremove.push($(this).attr('name'));
                }
            });
            for (i = 0; i < groupsadd.length; i++) {
                groups = groups + groupsadd[i] + "|";
            }
            groups = groups.slice(0, -1);
            groups = groups + "&remove=";
            for (i = 0; i < groupsremove.length; i++) {
                groups = groups + groupsremove[i] + "|";
            }
            groups = groups.slice(0, -1);
            var url = mw.util.wikiScript('api') + '?action=userrights&user=' + username + '&add=' + groups + '&reason=' + encodeURIComponent(reason) + '&token=' + encodeURIComponent(token);
            $.post(url, function () {
                alert('Done.');
            });
        });
    }

    function doRollback() {
        $('.mw-rollback-link a').each(function () {
            var href = $(this).attr('href');
            $.get(href);
            $(this).text('gone!').css('color', 'grey').removeAttr('href');
        });
    }

    function doDelete() {
        var deleteReason = prompt('Please enter the delete reason', 'cleanup');
        $('li .newpage ~ a').each(function () {
            var title = $(this).attr('title');
            if (title.slice(0, 12) == 'Message Wall') return;
            apiDelete(title, deleteReason);
            $(this).css({
                'color': 'grey',
                    'text-decoration': 'line-through'
            }).removeAttr('href');
        });

        $('#mw-content-text ul li a').each(function () {
            var title = $(this).attr('title');
            if (title.split('-').length == 1) return;
            if (title.slice(0, 7) == 'Thread:' || title.slice(0, 13) == 'Board Thread:') {
                apiDelete(title, deleteReason);
                $(this).css({
                    'color': 'grey',
                        'text-decoration': 'line-through'
                }).removeAttr('href');
            }
        });
    }

    function doBlock() {
        var duration = prompt('Please state the block duration', '2 weeks'),
            blockReason = prompt('Please state the block reason', 'Vandalism');
        new mw.Api().post({
            format: 'json',
            action: 'block',
            user: username,
            expiry: duration,
            nocreate: 0,
            autoblock: 0,
            reason: blockReason,
            token: token
        })
        .done(function (d) {
            if (!d.error) {
                console.log(username + ' has been blocked successfully!');
            } else {
                alert('Failed to block ' + username + ': ' + d.error.code);
            }
        })
        .fail(function () {
            alert('Failed to block ' + username + '!');
        });
    }
})(this.jQuery, this.mediaWiki);