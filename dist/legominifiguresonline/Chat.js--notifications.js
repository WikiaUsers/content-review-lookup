function getCookie(a) {
    var b = document.cookie,
        c = b.indexOf(" " + a + "=");
    if (-1 == c && (c = b.indexOf(a + "=")), -1 == c) b = null;
    else {
        c = b.indexOf("=", c) + 1;
        var d = b.indexOf(";", c); - 1 == d && (d = b.length), b = unescape(b.substring(c, d))
    }
    return b
}

/* enable notifications & request permission */
function chatEnableNotification() {
    "undefined" != typeof Notification && Notification.permission ? "default" == Notification.permission || "denied" == Notification.permission ? Notification.requestPermission(function () {
        chatEnableNotification()
    }) : "granted" == Notification.permission && ($(document.head).append('<style id="chatNotificationEnabled">.UserStatsMenu .new-actions .chatEnableNotification .icon {background-position:-180px 0px !important;} .UserStatsMenu .new-actions .chatEnableNotification:hover .icon {background-position:-211px 0px !important;}</style>'), setCookie(wikiCookieName + "_ChatNotification", "enabled", 36500)) : "undefined" != typeof webkitNotifications && webkitNotifications.checkPermission && (1 == webkitNotifications.checkPermission() || 2 == webkitNotifications.checkPermission() ? Notification.requestPermission(function () {
        chatEnableNotification()
    }) : 0 === webkitNotifications.checkPermission() && ($(document.head).append('<style id="chatNotificationEnabled">.UserStatsMenu .new-actions .chatEnableNotification .icon {background-position:-180px 0px !important;} .UserStatsMenu .new-actions .chatEnableNotification:hover .icon {background-position:-211px 0px !important;}</style>'), setCookie(wikiCookieName + "_ChatNotification", "enabled", 36500)))
}

/* create notification */
function chatMsgNotification() {
    var message = $(".Chat:first li:not('.Chat:first .you, .Chat:first .inline-alert'):last"); 
   
    if ($(message).find("span").length != 0) {
    var a = new Notification(wgSiteName + " Chat:", {
        dir: "auto",
        body: $(".message", message).html().length > 26 ? $(".username", message).html().split(" <img")[0] + ": "+ $(".message", message).html().substring(0, 26).replace(/\s+/g, " ") + " ... " : $(".username", message).html().split(" <img")[0] + ": "+ $(".message", message).html().substring(0, 26).replace(/\s+/g, " "),  icon: $(".avatar", message).attr("src").replace("28px", "150px")
    });
    a.onclick = function () {
        window.focus()
    }, a.onshow = function () {
        setTimeout(function () {
            a.close()
        }, 5e3)
    }}
}

function chatNewMsg() {
    if ("enabled" == getCookie(wikiCookieName + "_ChatNotification"))
        chatMsgNotification();
    }


$("textarea[name=message]").focus();
var window_focus = true;
$(window).focus(function() {
    window_focus = true;
})
    .blur(function() {
        window_focus = false;
});


var wikiCookieName = "LMOWiki";
chatEnableNotification();
jQuery(window).load(function () {
$('.Chat').bind("DOMSubtreeModified",function(){
    if (!window_focus)    
  chatNewMsg();
});
});