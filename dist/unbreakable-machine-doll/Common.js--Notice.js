/* Any JavaScript here will be loaded for all users on every page load. */
var siteNoticeID = "1.50";
var siteNoticeValue = "\x3cdiv id=\"localNotice\" lang=\"en\" dir=\"ltr\"\x3e\x3cp\x3eTest for \x3ca href=\"/wiki/Test\"\x3eTest\x3c/a\x3e!\x3cbr\x3eTest2 \x3ca href=\"/wiki/Test\"\x3ehere.\x3c/a\x3e\x3c/p\x3e";
 
if (siteNoticeValue !== "") {
  var cookieValue = "";
  var cookieName = "dismissSiteNotice=";
  var cookiePos = document.cookie.indexOf(cookieName);
 
  if (cookiePos > -1) {
    cookiePos = cookiePos + cookieName.length;
    var endPos = document.cookie.indexOf(";", cookiePos);
    if (endPos > -1) {
      cookieValue = document.cookie.substring(cookiePos, endPos);
    } else {
      cookieValue = document.cookie.substring(cookiePos);
    }
  }
  if (cookieValue != siteNoticeID) {
    function dismissNotice() {
      var date = new Date();
      date.setTime(date.getTime() + 30 * 86400 * 1000);
      document.cookie = cookieName + siteNoticeID + "; expires=" + date.toGMTString() + "; path=/";
      var element = document.getElementById('mw-dismissable-notice');
      element.parentNode.removeChild(element);
    }
    var notice = document.createElement("li");
    notice.id = "mw-dismissable-notice";
    notice.className = "plainlinks";
    notice.innerHTML = siteNoticeValue;
    var WikiaNotif = document.getElementById("WikiaNotifications");
    if (WikiaNotif) {
      var belowElement = WikiaNotif.getElementsByTagName("ul")[0];
      WikiaNotif.insertBefore(notice, belowElement);
      var getNotice = document.getElementById("localNotice");
      getNotice.innerHTML = '<a class="sprite close-notification" href="javascript:dismissNotice();"></a>' + getNotice.innerHTML;
    } else {
      var barWrapper = document.getElementById("WikiaBarWrapper");
      if (barWrapper) {
        var WikiaNotif = document.createElement("ul");
        WikiaNotif.id = "WikiaNotifications";
        WikiaNotif.className = "WikiaNotifications";
        barWrapper.parentNode.insertBefore(WikiaNotif, barWrapper);
        WikiaNotif.appendChild(notice);
        var getNotice = document.getElementById("localNotice");
        getNotice.innerHTML = '<a class="sprite close-notification" href="javascript:dismissNotice();"></a>' + getNotice.innerHTML;
      }
    }
  }
}