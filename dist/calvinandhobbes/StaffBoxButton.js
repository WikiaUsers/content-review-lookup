
/*
 * @module              StaffBoxButton
 * @description         Open a list of user's rights when "Verify" is
 *                      clicked in {{AdminBox}} or {{ContentModBox}}
 * @author              Americhino
 * @version             1.1.0
 * @license             CC-BY-SA 3.0
 * @todo                Publish to Dev Wiki? I18n-js-ize it in that case
*/ /*
 (function ($, mw) {
    "use strict"; */
    $('#StaffBoxButton').attr('title', 'Verify this user\'s rights');
    $('#StaffBoxButton').click(openUserRightsLogs);
    function openUserRightsLogs() {
    // Load QDModal
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
                    content: "<div id=\"userGroupsModalText\"></div>",
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
                var $content = $("<div id=\"userGroups\">");
                if ($(data.query.users).length === 0) {
        	        $('#userGroupsModalText').html('<strong>' + user + '</strong> is currently not a member of any user group.');
                    console.log('[StaffBoxButton] ' + user + ' is not part of any user group.')
                    // likely a non-existent or invalid username
                    return;
                } else {
                var groups = data.query.users[0].groups;
                $('#userGroupsModalText').html('<strong>' + user + '</strong> is currently a member of the following groups: <br />');
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
                    console.log('[StaffBoxButton] ' + user + ' is currently a member of the following groups: '); 
                    groups.forEach(
                        function(group) {
                            console.log('- ' + group)
                        });
                }
            });
	        mw.util.addCSS('#userGroups ul li { list-style-type: disc; margin-left: 25px; } #userGroupsApi { margin-right: 5px; }');
        } 
    } /*
}); */