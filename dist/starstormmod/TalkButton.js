/**
 * Talk Button Script
 * Adds a custom talk button allowing users to access the talk page of an article.
 */
 
 $(function(){
  if($('a').is('.talk')){
  }
  else
  {
    var tpbutton = document.createElement("a");
    tpbutton.setAttribute("accesskey", "t");
    tpbutton.setAttribute("href", wgServer + "/wiki/Talk:" + wgPageName);
    tpbutton.setAttribute("class", "wikia-button secondary talk");
    tpbutton.setAttribute("rel", "nofollow");
    tpbutton.setAttribute("data-id", "comment");
    tpbutton.innerHTML = "Talk";
    $(tpbutton).insertAfter(".comments");
  }
});