/*** Move languages box *****************************************************
 * Moves languages to top of WikiaRail
 * Written by JBed of FFWiki
 ****************************************************************************/
addOnloadHook(prepLangBox);
function prepLangBox()
{
  var langBox = getElementsByClassName(document,"nav","WikiaArticleInterlang")[0];
  if(langBox)
  {
    langBox.style.margin="0px";
    langBox.style.padding="10px 0 0 10px";
    var divClear = document.createElement("div");
    divClear.style.clear="both";
    langBox.id="languageBox";
     langBox.appendChild(divClear);
  }
  moveLangBox(getFirstSidebarElement());
}
 
function moveLangBox(afterBox)
{
  var langBox = document.getElementById("languageBox");
  if(!langBox){langBox = getElementsByClassName(document,"nav","WikiaArticleInterlang")[0];}
  if(langBox && afterBox)
  {
    afterBox.parentNode.insertBefore(langBox,afterBox);
  }
}