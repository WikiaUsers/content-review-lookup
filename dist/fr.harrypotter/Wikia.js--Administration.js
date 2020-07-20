<source lang="JavaScript">
if (wgPageName === "Special:Administration") {
    if (wgUserGroups.indexOf("sysop") > -1) {
        $('#WikiaArticle').html('<a class="wikia-button" onclick="openAdminNotify()">Administration</a>');
    }
}
 
function openAdminNotify() {
    var windowHTMLWindow = $.showCustomModal("Message Form", '<form class="WikiaForm" method="" name=""><fieldset><strong>Message title:</strong><br/><input id="message-header" type="text" placeholder="Enter message title here." style="width: 500px"/><br/><br/><strong>Message:</strong><br/><textarea id="message-body" cols="80" rows="10" placeholder="Write your message to me here."></textarea></feildset></form>', {
        id: "messageWindow",
        width: 600,
        buttons: [
            {
            id: "cancel",
            message: "Cancel",
            handler: function() {
                cancelMessage();
            }
        },
            {
            id: "submit",
            defaultButton: true,
            message: "Submit",
            handler: function() {
                submitMessage();
            }
        }
        ]
    });
}
 
function cancelMessage() {
    $('#messageWindow').closeModal();
}
 
function submitMessage() {
    var adminList = ["Hulothe"],
        header = document.getElementById("message-header").value || 'null',
        body = document.getElementById("message-body").value || 'null',
        EditToken = mw.user.tokens.values.editToken,
        url;
 
    for (var i = 0; i < adminList.length; i++) {
        url = wgServer + '/api.php?action=edit&title=Mur:' + encodeURIComponent(adminList[i]);
        $.post(url);
    }
    $('#messageWindow').closeModal();
</souce>