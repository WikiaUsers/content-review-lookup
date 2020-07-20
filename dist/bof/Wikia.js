/* Adds a Talk button for Wikia's using Comments */
$(function(){
 
var whitelistnamespaces = [""];
if(whitelistnamespaces.indexOf(wgCanonicalNamespace)==-1) return;
 
var talkpagename = wgFormattedNamespaces[wgNamespaceNumber + 1] + ":" + wgTitle;
 
var tpbox = document.createElement("span");
tpbox.setAttribute("class", "commentsbubble");
tpbox.innerHTML = "0";
 
var tpbutton = document.createElement("a");
tpbutton.setAttribute("accesskey", "t");
tpbutton.setAttribute("href", wgServer + "/wiki/" + talkpagename);
tpbutton.setAttribute("class", "wikia-button comments secondary talk");
tpbutton.setAttribute("rel", "nofollow");
tpbutton.setAttribute("data-id", "comment");
tpbutton.innerHTML = "Talk";
 
tpbutton.appendChild(tpbox);
 
/*Query to get up to 500 revisions of current page's talk page in next namespace ID*/
var url = wgServer + wgScriptPath + '/api.php?action=query&prop=revisions&rvlimit=500&titles=' + encodeURIComponent(talkpagename) + '&format=json';
/*AJAX function to get number of revisions returned and add to tpbox*/
var ajax = $.getJSON(url, function (data) {
  var number = data.query.pages;
  if(!number[-1]) {/*if talk page exists*/
    number = number[Object.keys(number)[0]].revisions.length;
    if(number == 500) number = "500+";
    tpbox.innerHTML = number;
  }
  $(tpbutton).insertAfter(".comments");
});
});