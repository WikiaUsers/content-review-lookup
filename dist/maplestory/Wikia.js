importScriptURI('http://apis.google.com/js/plusone.js');

/**********************/
/*TEMPORARY SITENOTICE*/
/**********************/
/*
var siteNoticeID = "1";
var siteNoticeValue = "\x3cdiv id=\"localNotice\" lang=\"en\" dir=\"ltr\"\x3e\x3cp\x3eThe wiki will experience an overhaul on the skill pages soon. Please read \x3cb\x3e\x3ca href=\"/wiki/User_blog:Richmond2010/Skills_-_To_change_or_not_to_change%3F\" title=\"User_blog:Richmond2010/Skills_-_To_change_or_not_to_change%3F\"\x3ethis\x3c/a\x3e\x3c/b\x3e and provide your opinion.\n\x3cbr /\x3e\nEvery vote would determine how it is changed, so please make sure to cast your vote before the deadline!\n\x3c/p\x3e\x3c/div\x3e";
 
if(siteNoticeValue!="")
{
  var cookieValue = "";
  var cookieName = "dismissSiteNotice=";
  var cookiePos = document.cookie.indexOf(cookieName);
 
  if (cookiePos > -1)
  {
    cookiePos = cookiePos + cookieName.length;
    var endPos = document.cookie.indexOf(";", cookiePos);
    if (endPos > -1)
    {
      cookieValue = document.cookie.substring(cookiePos, endPos);
    }
    else
    {
      cookieValue = document.cookie.substring(cookiePos);
    }
  }
  if (cookieValue != siteNoticeID)
  {
    function dismissNotice()
    {
      var date = new Date();
      date.setTime(date.getTime() + 30*86400*1000);
      document.cookie = cookieName + siteNoticeID + "; expires="+date.toGMTString() + "; path=/";
      var element = document.getElementById('mw-dismissable-notice');
      element.parentNode.removeChild(element);
    }
    var notice = document.createElement("li");
    notice.id = "mw-dismissable-notice";
    notice.innerHTML = siteNoticeValue;
    var WikiaNotif = document.getElementById("WikiaNotifications");
    if(WikiaNotif)
    {
      var belowElement = WikiaNotif.getElementsByTagName("ul")[0];
      WikiaNotif.insertBefore(notice,belowElement);
      var getNotice = document.getElementById("localNotice");
      getNotice.innerHTML = '<a class="sprite close-notification" href="javascript:dismissNotice();"></a>' + getNotice.innerHTML;
    }
    else
    {
      var barWrapper = document.getElementById("WikiaBarWrapper");
      if(barWrapper)
      {
        var WikiaNotif = document.createElement("ul");
        WikiaNotif.id = "WikiaNotifications";
        WikiaNotif.className = "WikiaNotifications";
        barWrapper.parentNode.insertBefore(WikiaNotif,barWrapper);
        WikiaNotif.appendChild(notice);
        var getNotice = document.getElementById("localNotice");
        getNotice.innerHTML = '<a class="sprite close-notification" href="javascript:dismissNotice();"></a>' + getNotice.innerHTML;
      }
    }
  }
}
*/