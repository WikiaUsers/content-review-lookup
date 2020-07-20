/*** Oasis sitenotice *******************************************************
 * Displays sitenotice on every page
 * Displays like regular Wikia notices
 * The notice has to be updated manually
    after editing MediaWiki:Sitenotice and MediaWiki:Sitenotice id
 * Written by JBed of FFWiki
 ****************************************************************************/
//how to update the Oasis sitenotice:
//Go into a page in Monobook,
//Right click, view page source,
//Ctrl+F, "siteNoticeID",
//here you will find two lines,
//one starting "var siteNoticeID", the other "var siteNotice",
//copy both these lines and paste them over the respective lines below
/*
var siteNoticeID = "1.0";
var siteNoticeValue = "\x3cdiv id=\"localNotice\" lang=\"de\" dir=\"ltr\"\x3e\x3cp\x3eDu kommst bei einem Bossgegner nicht weiter oder brauchst an einer anderen Stelle Hilfe? Dann wirf doch einen Blick in \x3ca href=\"/wiki/Walkthrough:Index\" title=\"Walkthrough:Index\"\x3eunsere Walkthroughs\x3c/a\x3e!\n\x3c/p\x3e\x3c/div\x3e";
 
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