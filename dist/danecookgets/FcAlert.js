var FcDate = new Date();
if (FcDate.getDay()<=2 && $.cookie("HPW_FC-notification-dismissed")!=="1") {
    if ($("#WikiaNotifications").length==0) {
        $("body").append('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>');
    }
    $("#WikiaNotifications").append('<li><div id="fc-weekchange-alert"><a class="sprite close-notification" onclick="closeFcAlert()"></a><p>Oh look, time to update the Featured Content!</p><p>1.&nbsp;&nbsp;Update the <a href="/wiki/Hitler_Parody_Wiki:Featured_Archive?action=edit">archive</a></p><p>2.&nbsp;&nbsp;Look through the <a onclick="gotoFcThread()" style="cursor:pointer">suggestions</a></p><p>3.&nbsp;&nbsp;<a href="/wiki/Hitler_Parody_Wiki:Featured?action=edit">Update the FC</a></p></div></li>');
}
function closeFcAlert(){
    $.cookie("HPW_FC-notification-dismissed", "1", { path:"/", expires:3 });
    $("#fc-weekchange-alert").parent().remove();
}
function gotoFcThread() {
    $.get("/wiki/MediaWiki:FcThread?action=raw", function(data, status) {
        window.location = "/wiki/" + data;
    });
}