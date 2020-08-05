/* Tämän sivun koodi liitetään jokaiseen sivulataukseen */

// ==================================================================
// Added SiteNotice Functionality
// 
// Functions:
//   * Moves the dismiss link into the SiteNotice table.
//   * Saves the show/hide status of the SiteNotice in a cookie.
//   * Automatically expands the SiteNotice when the ID is updated.
// ==================================================================

addOnloadHook(editSiteNotice);
var dCookieName = "dismissSiteNotice=";
var msgClose = "älä näytä";

var hCookieName = "hideSiteNotice=";
var hCookiePos = document.cookie.indexOf(hCookieName);
var hCookieValue = "";
   
function editSiteNotice() {
    var snbox = document.getElementById('mw-dismissable-notice');
   
    if (snbox != null){
        if (hCookiePos > -1) {
            hCookiePos = hCookiePos + hCookieName.length;
            var hideEndPos = document.cookie.indexOf(";", hCookiePos);
            if (hideEndPos > -1) {
                hCookieValue = document.cookie.substring(hCookiePos, hideEndPos);
            } else {
                hCookieValue = document.cookie.substring(hCookiePos);
            }
        }
      
        var newLink = document.createElement('a');
        newLink.setAttribute('href', "javascript:dismissNotice();");
        newLink.setAttribute('title', 'Dismiss this notice.');
        newLink.innerHTML = msgClose;

        var hideLink = document.getElementById( "collapseButton" + "0" );
        hideLink.href = "javascript:hideSiteNotice();"
        hideLink.parentNode.style.width = "12em";
        hideLink.parentNode.appendChild(document.createTextNode(' [')); 
        hideLink.parentNode.appendChild(newLink);
        hideLink.parentNode.appendChild(document.createTextNode(']'));
      
        snbox.tBodies[0].rows[0].deleteCell(1);

        if (hCookieValue != siteNoticeID && hideLink.innerHTML == "suurenna") {
            collapseTable(0);
        }
        if (hCookieValue == siteNoticeID && hideLink.innerHTML == "pienennä") {
            collapseTable(0);
        }
    }
}

function hideSiteNotice() {
    var hideLink = document.getElementById( "collapseButton" + "0" );
    var date = new Date();
    
    if (hideLink.innerHTML == 'hide'){
        date.setTime(date.getTime() + 30*86400*1000);
    } else {
        date.setTime(date.getTime() - 30*86400*1000);
    }
    document.cookie = hCookieName + siteNoticeID + "; expires="+date.toGMTString() + "; path=/";
    collapseTable(0);
}

// ==================================================================
// End of Added SiteNotice Functionality
//

function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=#wikia-es" width="970" height="550"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("chat").innerHTML);

}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);