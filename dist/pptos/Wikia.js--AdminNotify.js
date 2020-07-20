if (wgPageName === "Special:AdminNotify") {
    if (wgUserGroups.indexOf("sysop") > -1) {
        $('#WikiaArticle').html('<a class="wikia-button" onclick="openAdminNotify()">Notify</a>');
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
    var adminList = ["41488p", "Bushcraft Medic", "ClericofMadness", "Furbearingbrick", "Glaze112", "Kill1mes", "LOLSKELETONS", "MooseJuice", "Mr.Zalgopasta", "Princess Platinum", "Shinigami.Eyes", "Sloshedtrain", "Temmington", "WhyAmIReadingThis", "XanCrews"],
        header = document.getElementById("message-header").value || 'null',
        body = document.getElementById("message-body").value || 'null',
        EditToken = mw.user.tokens.values.editToken,
        url;
 
    for (var i = 0; i < adminList.length; i++) {
        url = wgServer + '/api.php?action=edit&title=User_talk:' + encodeURIComponent(adminList[i]) + '&section=new&sectiontitle=' + encodeURIComponent(header) + '&text=' + encodeURIComponent(body) + '&token=' + encodeURIComponent(EditToken);
        $.post(url);
    }
    $('#messageWindow').closeModal();
}