//
// Creates "Talk" button on my pages
//
$(function(){
var tpbutton = document.createElement("a");
tpbutton.setAttribute("accesskey", "t");
tpbutton.setAttribute("href", wgServer + "/wiki/Talk:" + wgPageName);
tpbutton.setAttribute("class", "wikia-button secondary talk");
tpbutton.setAttribute("rel", "nofollow");
tpbutton.setAttribute("data-id", "comment");
tpbutton.innerHTML = "Talk";
$(tpbutton).insertAfter(".comments");
});