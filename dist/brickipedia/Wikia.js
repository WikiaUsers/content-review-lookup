//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/* AJAX */
importScriptPage('MediaWiki:AjaxRC/code.js', 'legouniverse');
ajaxPages = ["Special:RecentChanges", "User:Mythrun/Recent_Changes", "Special:WikiActivity", "Special:NewPages"];
importScript('MediaWiki:Wikia.js/test.js');

/* Commenting out switchtabs as it interferes with ad placement on Wikia (bleeding into the background skin). Please feel free to restore after repositioned to be purely in content space. Please contact [[Special:Contact|DaNASCAT]] with any questions 

$(function() {
    if (!document.getElementById("switchtabs")) {
        return;
    }
    var page = wgTitle.replace(/&/g, "%26");
    var inv = "<a id='inv' href='http://lego.wikia.com/wiki/Inventory:" + page + "'>Inventory</a>";
    var rev = "<a id='rev' href='http://lego.wikia.com/wiki/Review:" + page + "'>Reviews</a>";
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
*/

/* "Submit Review" button */

addOnloadHook(btnSubmitReview);
 
function btnSubmitReview(){
  var btn;
  var title = wgTitle.replace(/&/g, "%26");
  var url = "/index.php?title=Review:'+title+'/'+wgUserName+'&action=edit&preload=MediaWiki:Createplate-Review&redlink=1";

  if (url == "/index.php?title=Review:'+title+'/null&action=edit&preload=MediaWiki:Createplate-Review&redlink=1"){
    btn = '<center><div style="background-color:#ddddee;border:2px outset #9999bb;text-align:center;padding:2px 5px" id="sb-rev"><a href="/index.php?title=Special:UserLogin">Log in</a> to submit a review</div></center>';
  }else{
    btn = '<center><a style="background-color:#ddddee;border:2px outset #9999bb;text-align:center;padding:2px 5px; display:block;" id="sb-rev" href=url>Submit a review</a></center>';
  }
  $("#reviewBtn").html(btn);
}


$(function() {
    $(".WikiHeaderRestyle > nav li").not(".subnav-2.accent li").mouseenter(function() {
        $(this).addClass("marked");
        $(".WikiHeaderRestyle > nav li").not(this).removeClass();
    });
});

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://lego.wikia.com/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

importScriptPage('User:Monchoman45/ChatHacks.js', 'c'); 
 
importScriptPage('User:Joeytje50/ChatLogger.js', 'runescape');