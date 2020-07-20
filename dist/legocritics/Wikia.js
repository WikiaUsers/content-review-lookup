//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/* AJAX */
importScriptPage('MediaWiki:AjaxRC/code.js', 'legouniverse');
ajaxPages = ["Special:RecentChanges", "User:Mythrun/Recent_Changes", "Special:WikiActivity", "Special:NewPages"];
importScript('MediaWiki:Wikia.js/test.js');

/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('Wikia.js/cancelButton.js', 'dev');
importScript('MediaWiki:Wikia.js/UserRename.js', 'dev');
importScript('MediaWiki:Wikia.js/UserRename.js');

// Adds copyright notice to siderail in Oasis 
importScript('MediaWiki:Wikia.js/copyright.js');
importScript('MediaWiki:Wikia.js/copyright2.js');
// END Adds copyright notice to siderail in Oasis

/* Switchtabs */
$(function() {
    if (!document.getElementById("switchtabs")) {
        return;
    }
    var page = wgTitle;
    var inv = "<a id='inv' href='http://lego.wikia.com/wiki/Inventory:" + page + "'>Inventory</a>";
    var rev = "<a id='rev' href='http://legocritics.wikia.com/wiki/" + page + "'>Reviews</a>";
    var wiki = "<a id='wiki' href='http://lego.wikia.com/wiki/" + page + "'>Encyclopedia</a>";
    var string = wiki + inv + rev;
    document.getElementById("switchtabs").innerHTML = string;

    var ns = wgNamespaceNumber;
    switch (ns) {
    case 0:
        document.getElementById("wiki").className = "selected";
        break;
    case 114:
        document.getElementById("inv").className = "selected";
        break;
    case 118:
        document.getElementById("rev").className = "selected";
        break;
    }
});

/* "Submit Review" button */

addOnloadHook(btnSubmitReview);
 
function btnSubmitReview(){
  var btn;
  var title = wgTitle.replace(/&/g, "%26");
 
  if(wgUserName=='null'){
    btn = '<center><div style="background-color:#ddddee;border:2px outset #9999bb;text-align:center;padding:2px 5px" id="sb-rev"><a href="/index.php?title=Special:Login">Log in</a> to submit a review</div></center>';
  } else {
    btn = '<center><div style="background-color:#ddddee;border:2px outset #9999bb;text-align:center;padding:2px 5px" id="sb-rev"><a href="/index.php?title=Review:' + title + '/' + wgUserName + '&action=edit&preload=MediaWiki:Createplate-Review&redlink=1">Submit a review</a></div></center>';
  }
  $("#reviewBtn").html(btn);
}

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://legocritics.wikia.com/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});