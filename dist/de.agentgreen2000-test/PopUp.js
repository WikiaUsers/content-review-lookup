 
// Add buttons 
if(spa.pagename === "Report:Spam") {
    var buttonappend = '<a class="wikia-button" id="spam-submit" onclick="openFormSpam()">Report Spam</a>';
    document.getElementById("lang-EN").innerHTML = buttonappend;
}
 
 
// This opens the form for the users to fill out
 
function openFormSpam() {
    $.showCustomModal('Report Spam', '<form class="WikiaForm" method="" name="" id="spam"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Wiki Name</span><br><input id="wikiname" type="text" placeholder="VSTF Wiki" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Wiki URL</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="vstf" style="width:364px"/><span style="color:gray">.wikia.com</span><br><span style="font-weight:bold">Spammer</span><br><input id="user" type="text" placeholder="User or IP (no links)" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Reason</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Add your comments here"></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancel",
            handler: function () {
                cancelformSpam();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Save",
            handler: function () {
                submitformSpam();
            }
        }]
    });
}
 
// Closes the form
 
function cancelformSpam() {
    $("#requestWindow").closeModal();
}