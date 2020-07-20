/* JavaScript here is intended for use by TOC admins, but it can also be useful to regular users. */
// To use these functions, add the following line to your "user"/monobook.js: //
// importScript('MediaWiki:admin.js'); //

// --------------------------------------------------------
// Rights
// Sets a variable "rights" which will return "false" if the 
// currently logged in user is a bureaucrat, administrator, or autoconfirmed user. It will return true otherwise.
// it also defines variables which may be used elsewhere in scripts.
// --------------------------------------------------------

 var rights_isAdmin = (wgUserGroups.toString().indexOf('sysop') != -1);
 var rights_isAuto = (wgUserGroups.toString().indexOf('autoconfirmed') != -1);
 var rights_isCrat = (wgUserGroups.toString().indexOf('bureaucrat') != -1);
 var rights = true;
 if (rights_isCrat || rights_isAdmin || rights_isAuto)
 {rights=false}
//

// --------------------------------------------------------
// addLogs
// adds a 'page logs' link to the toolbox bar (if the page is a special page, then no link is displayed)
// --------------------------------------------------------
addOnloadHook(function () {
    if ( wgCanonicalNamespace == "Special" )
        return;  // don't display link for special pages

    url = wgServer + "/index.php?title=Special:Log&page=" + encodeURIComponent(wgPageName);

    addPortletLink("p-tb", url, "Page logs", "pt-logs");
});
//

// --------------------------------------------------------
// addScript
// adds a 'user scripts' link to the personal links, which links to the user's personal monobook.js page
// --------------------------------------------------------
importScript('User:Neo of ZW/ModifySidebar.js');
 
function CustomizeModificationsOfSidebar() {
    ModifySidebar("add", "personal", "my scripts", "/User:" + encodeURIComponent(wgUserName) + "/monobook.js", "My personal user scripts");
}
 
addOnloadHook(CustomizeModificationsOfSidebar);
//

// --------------------------------------------------------
// redirects
// adds a tab to the top of pages, when clicked it highlights all links on the page that are redirects.
// --------------------------------------------------------
if (wgAction != 'edit' && wgCanonicalNamespace != 'Special' && wgAction != 'history' && wgAction != 'delete' && wgAction != 'watch' && wgAction 
!= 'unwatch' && wgAction != 'protect' && wgAction != 'markpatrolled' && wgAction != 'rollback' && document.URL.indexOf('diff=') <= 0)
{
var highlightRedirects = {
 
 tab_redirects : null,
 
 addStylesheetRule : function(tag, style) {
  var ss = document.styleSheets[0];
  if (ss.insertRule) {
   ss.insertRule(tag + '{' + style + '}', ss.cssRules.length);
  } else if (ss.addRule) {
   ss.addRule(tag, style);
  }
 },
 
 run : function()
 {
  highlightRedirects.addStylesheetRule('a.mw-redirect', 'color:green');
  highlightRedirects.addStylesheetRule('a.mw-redirect:visited', 'color:darkgreen');
 },
 
 install : function()
 {
  with(highlightRedirects)
  {
   addPortletLink ('p-cactions', 'javascript:highlightRedirects.run();', 'redirects', 'ca-redirects', 'Highlights all links which are redirects', 'r') ||
   addPortletLink ('views', 'javascript:highlightRedirects.run();', 'redirects', 'ca-redirects', 'Highlights all links which are redirects', 'r');
  }
 }
 
};
 
addOnloadHook(highlightRedirects.install);
}
//

// --------------------------------------------------------
// user rights
// adds a link in the tool box while on user pages to a user's rights management page. 
// --------------------------------------------------------
addOnloadHook(function () {
     if (!rights_isAdmin)
        return; //Restrict this feature to admins.
    if (wgNamespaceNumber != "2" && wgNamespaceNumber != "3")
        return;  // restrict to User and User talk
 
    var title = wgTitle;
 
    addPortletLink('p-tb', '/Special:Userrights/'+title,
                   'User rights', 't-userrights', 'User rights for "'+title+'"');
 
});
//

// --------------------------------------------------------
// adminrights.js          (adapted from http://en.wikipedia.org/wiki/User:Ais523/adminrights.js)
// This script changes the color of links to admins' userpages in the bodyContent of Special, History pages, diff pages,
// and old page revisions.
// ("bodyContent" being everything but the tabs,personal links at the top of the screen and sidebar).
// --------------------------------------------------------

var adminrights=new Array();
 
importScript('MediaWiki:Adminlist.js');
 
//Highlighting script. Based on [[User:ais523/highlightmyname.js]].
 
function highlightadmins(n,p) //node, parent node
{
  while(n!=null)
  {
    if(n.nodeType==1&&n.tagName.toLowerCase()=="a") //anchor
    {
      if(n.href.indexOf("/User:")!=-1)
      {
        var u=n.href.split("/User:")[1];
        if(adminrights[u.split("_").join("%20")]==1)
        {
          n.style.color="#00CC00";
          if(n.className==null||n.className=="") n.className="ais523_adminrights_admin";
          else n.className+="ais523_adminrights_admin";
        }
        n=n.nextSibling;
      }
      else if(n.href.indexOf("/index.php?title=User:")!=-1)
      {
        var u=n.href.split("/index.php?title=User:")[1];
        if(adminrights[u.split("_").join("%20")]==1)
        {
          n.style.color="#00CC00";
          if(n.className==null||n.className=="") n.className="ais523_adminrights_admin";
          else n.className+=" ais523_adminrights_admin";
        }
        n=n.nextSibling;
      }
      else
      {
        if(n.firstChild!=null) highlightadmins(n.firstChild,n);
        n=n.nextSibling;
      }
    }
    else
    {
      if(n.firstChild!=null) highlightadmins(n.firstChild,n);
      n=n.nextSibling;
    }
  }
}


if (wgCanonicalNamespace == 'Special' || wgAction == 'history' || document.URL.indexOf('diff=') > 0 || document.URL.indexOf('oldid=') > 0)
{
addOnloadHook(function() {
    highlightadmins(document.getElementById('bodyContent').firstChild,
                    document.getElementById('bodyContent'));
});
}
 
//

// --------------------------------------------------------
// Patrol tab
// adds a "marked as patrolled" tab to pages that have that link already on it.
// Once patrolled, the button turns into a button to go to the recent changes
// with patrolled edits hidden. Further speeding up patrolling.
// The second function of the button has the same access key.
// --------------------------------------------------------
function patroltab() {
if (document.URL.indexOf('&rcid=') > 0 && wgAction != 'markpatrolled')
{
 addPortletLink ('p-cactions', "/index.php?title=" + encodeURIComponent(wgPageName) + "&action=markpatrolled&rcid=" + document.location.toString().split('&rcid=')[1].split('&'), 'patrol', 'ca-patrol', 'Mark as patrolled', '1');
}
else if (document.URL.indexOf('&rcid=') > 0 && wgAction == 'markpatrolled')
{
 addPortletLink ('p-cactions', "/index.php?title=Special:RecentChanges&hidepatrolled=1", 'return', 'ca-return', 'Return to unpatrolled recent changes', '1');
}
}
addOnloadHook(patroltab);
//

// --------------------------------------------------------
// last diff
// Adds a tab which gives the latest diff for a page.
// --------------------------------------------------------
function lastdiff() {
	addPortletLink("p-cactions", wgServer +  "/index.php?title=" + encodeURIComponent(wgPageName) + "&diff=cur&oldid=prev", 
        "last", "ca-last", "Show most recent diff", '2');
}
if (wgCanonicalNamespace != 'Special' && wgAction != 'edit' && wgAction != 'delete' && wgAction != 'watch' && wgAction 
!= 'unwatch' && wgAction != 'protect'){ 
addOnloadHook(lastdiff);
}
//

// --------------------------------------------------------
// Recent Changes Edit Colors
// Colors the page size changes on the recent changes
// --------------------------------------------------------
importStylesheetURI(wgServer +"/User:Neo_of_ZW/RC_Colors.css" + "&ctype=text/css&action=raw");
//