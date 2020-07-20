// 13:19, February 26, 2012 (UTC)
// <source lang="JavaScript">

// ==================================================================
// Added SiteNotice Functionality
// 
// Functions:
//   * Moves the dismiss link into the SiteNotice table.
//   * Saves the show/hide status of the SiteNotice in a cookie.
//   * Automatically expands the SiteNotice when the ID is updated.
// ==================================================================

// getElementsByClassName function for IE (should probably be 
// loaded globally if it gets used often...)

$(function() {
    if (document.getElementsByClassName == undefined) {
        document.getElementsByClassName = function(className) {
            var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
            var allElements = document.getElementsByTagName("*");
            var results = [];

            var element;
            for (var i = 0;
            (element = allElements[i]) != null; i++) {
                var elementClass = element.className;
                if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass)) results.push(element);
            }

            return results;
        }
    }
});

var dCookieName = "dismissSiteNotice=";
var msgClose = "dismiss";

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

        var newSpan = document.createElement('span');
        newSpan.id = 'siteNoticeDismiss';
        newSpan.appendChild(document.createTextNode(' ['));
        newSpan.appendChild(newLink);
        newSpan.appendChild(document.createTextNode(']'));

        var hideLink = document.getElementsByClassName( "collapseButton" )[0];
        hideLink.href = "javascript:hideSiteNotice();"
        hideLink.parentNode.style.width = "12em";    
        hideLink.parentNode.appendChild(newSpan);

        if (hCookieValue != siteNoticeID && hideLink.innerHTML == "show") {
            collapseTable(0);
        }
        if (hCookieValue == siteNoticeID && hideLink.innerHTML == "hide") {
            collapseTable(0);
        }
    }
}

function hideSiteNotice() {
    var hideLink = document.getElementsByClassName("collapseButton")[0];
    var date = new Date();
    
    if (hideLink.innerHTML == 'hide'){
        date.setTime(date.getTime() + 30*86400*1000);
    } else {
        date.setTime(date.getTime() - 30*86400*1000);
    }
    document.cookie = hCookieName + siteNoticeID + "; expires="+date.toGMTString() + "; path=/";
    collapseTable(0);
}

addOnloadHook(editSiteNotice);

// ==================================================================
// End of Added SiteNotice Functionality
// ==================================================================

// </source>