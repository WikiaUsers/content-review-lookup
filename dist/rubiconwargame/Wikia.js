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