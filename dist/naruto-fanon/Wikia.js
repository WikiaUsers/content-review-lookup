/* SocialIcons from http://dev.wikia.com */
var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 1201];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default",
	wikiTwitterAccount: "default"
};
importScriptPage('SocialIcons/code.js','dev');

/* User rights tag to masthead */
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki, FIXED BY USER:FOODBANDLT, MLP Wiki. Taken from callofduty.wikia.com
 
//Taken By Zantetzuken2000 from Simcity Wiki.
 
 
$(function() {
 var rights = {};
 
   // BUREAUCRATS
 rights["EternalBeast"]            = ["Daimyō","Kage"]
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
if (wgPageName.indexOf("Special:Contributions") != -1){
newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
unfinishedTitle = newTitle;
 
while (unfinishedTitle.search("_") > 0){
unfinishedTitle = unfinishedTitle.replace("_", " ");
}
 
userName = unfinishedTitle;
 
}else{
userName = wgTitle;
userName.replace("User:", "");
}
 
 if (typeof rights[userName] != "undefined") {
   // remove old rights
   $('.UserProfileMasthead .masthead-info span.tag').remove();
 
   for( var i=0, len=rights[userName].length; i < len; i++) {
     // add new rights
     $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
       '</span>').appendTo('.masthead-info hgroup');
   }
 }
});
 
//

/* Code for custom edit buttons */
if ($.isArray(window.mwCustomEditButtons)) {
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
        "speedTip": "Add a Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
        "speedTip": "request delete",
        "tagOpen": "\{\{delete|",
        "tagClose": "\}\}",
        "sampleText": "your reason here"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/gintama/images/1/11/Button_category.png",
        "speedTip": "Category",
        "tagOpen": "[[Category:",
        "tagClose": "]]",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100709220258/bleach/answers/images/e/e1/O_Accent_Button.png",
        "speedTip": "Add the ō character",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100709220358/bleach/answers/images/d/db/U_Accent_Button.png",
        "speedTip": "Add the ū character",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20121122125948/naruto/answers/images/6/64/Favicon.ico",
        "speedTip": "link to Narutopedia",
        "tagOpen": "\{\{Nw|",
        "tagClose": "\}\}",
        "sampleText": ""
    };
}

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
//Replace the code with this

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