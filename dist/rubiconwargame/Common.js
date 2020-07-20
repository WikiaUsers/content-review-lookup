/* Any JavaScript here will be loaded for all users on every page load. */
/* importArticles */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:AjaxRC/code.js",
        "u:dev:StarRatings/code.js",
        "u:dev:StarRatings/ui.js",
        "u:dev:StarRatings/stats.js",
        "u:dev:View_Source/code.js",
        "w:c:dev:RevealAnonIP/code.js"   // adding RevealAnonIP/code.js to the array
    ]
});
/*** Allow JS-less publishing ***********************************************
 * Enable Publish button
 * Remove loading screen
 * Makes work savable without Wikia's JS fully loading
 * Written by JBed of FFWiki
 ****************************************************************************/
function fixEditor()
{
  if(wgAction=="edit")
  {
    document.getElementById('wpSave').disabled=false;
    var loader = getElementsByClassName(document, "div", "loading-indicator")[0];
    if(loader)
    {
      loader.parentNode.removeChild(loader);
    }
  }
}

addOnloadHook(fixEditor);