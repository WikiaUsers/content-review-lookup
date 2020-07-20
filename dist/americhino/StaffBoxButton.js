/*
 * @module              StaffBoxButton
 * @description         Open a list of user's rights when "Verify" is
 *                      clicked in {{AdminBox}} or {{ContentModBox}}
 * @author              Americhino
*/
$('#StaffBoxButton').attr('title', 'Verify this user\'s rights').click(openUserRightsLogs);
function openUserRightsLogs() {
    if (mw.libs.QDmodal) {
        // if loaded
        loadGroups();
        showGroups();
        function loadGroups() {
            var groupsModal = new mw.libs.QDmodal("usergroups-modal");
            var $user = mw.config.get('wgTitle').split('/');
            var user = $user[0];
                groupsModal.show({
                    content: "<div id=\"userGroupsModalText\"><strong>" + user + "</strong> is currently a member of the following groups: <br /></div>",
                    title: "Verify Rights: "+  user,
                    hook: "userGroupsModal"
                });
        }
        function showGroups() {
            var $user = mw.config.get('wgTitle').split('/');
            var user = $user[0];
            $.get(mw.util.wikiScript("api"), {
                action: "query",
                format: "json",
                list: "users",
                ususers: user,
                usprop: "groups"
            }).done(function(data) {
                var groups = data.query.users[0].groups;
                var $content = $('<div id="userGroups">');

                if (groups.length < 0) {
                $('#userGroupsModalText').replace('currently a member of the following groups: <br />', 'currently not a member of any user group.');
                    // likely a not-existing or invalid username
                    return;
                }

                // remove '*' and 'user' groups
                groups.splice(groups.indexOf("*"), 1);
                groups.splice(groups.indexOf("user"), 1);

                // stringify
                var $ul = $('<ul>');
                $content
                    .attr('id', 'userGroups');
                groups.forEach(function(group) {
                    $ul.append($('<li>', {text: group}));
                });
                $content.append($ul);
                $("#userGroupsModalText").append($content);
            });
            mw.util.addCSS('#userGroups ul li { list-style-type: disc; margin-left: 25px; } #userGroupsApi { margin-right: 5px; } #userGroupsApi, #userGroupsLogs { padding: 4px 18px } #userGroupsApi { border-color: #f60; color: #f60 } #userGroupsLogs { background-color: #f60; border-color:#f60 }');
        }
    } else {
        // not loaded, does exactly the same thing
        $.ajax({
            cache: true,
            dataType: "script",
            url: "//dev.wikia.com/load.php?mode=articles&only=scripts&articles=MediaWiki:QDmodal.js"
        }).done(loadGroups, showGroups);
        function loadGroups() {
            var groupsModal = new mw.libs.QDmodal("usergroups-modal");
            var $user = mw.config.get('wgTitle').split('/');
            var user = $user[0];
                groupsModal.show({
                    content: "<div id=\"userGroupsModalText\"><strong>" + user + "</strong> is currently a member of the following groups: <br /></div>",
                    title: "Verify Rights: "+  user,
                    hook: "userGroupsModal"
                });
        }
        function showGroups() {
            var $user = mw.config.get('wgTitle').split('/');
            var user = $user[0];
            $.get(mw.util.wikiScript("api"), {
                action: "query",
                format: "json",
                list: "users",
                ususers: user,
                usprop: "groups"
            }).done(function(data) {
                var groups = data.query.users[0].groups;
                var $content = $('<div id="userGroups">');

                if (groups.length < 0) {
                $('#userGroupsModalText').replace('currently a member of the following groups: <br />', 'currently not a member of any user group.');
                    // likely a not-existing or invalid username
                    return;
                }

                // remove '*' and 'user' groups
                groups.splice(groups.indexOf("*"), 1);
                groups.splice(groups.indexOf("user"), 1);

                // stringify and add content
                var $ul = $('<ul>');
                $content
                    .attr('id', 'userGroups');
                groups.forEach(function(group) {
                    $ul.append($('<li>', {text: group}));
                });
                $content.append($ul);
                $("#userGroupsModalText").append($content);
            });
            mw.util.addCSS('#userGroups ul li { list-style-type: disc; margin-left: 25px; } #userGroupsApi { margin-right: 5px; } #userGroupsApi, #userGroupsLogs { padding: 4px 18px } #userGroupsApi { border-color: #f60; color: #f60 } #userGroupsLogs { background-color: #f60; border-color:#f60 }');
        }
    }
}