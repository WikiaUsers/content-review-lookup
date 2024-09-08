/** Altera o título da página **************************************************************
  *    Origem: [[:w:en:MediaWiki:Common.js]]
  * Descrição: A função procura por um banner como:
  * <nowiki><div id="RealTitleBanner">Div that is hidden</nowiki>
  *   <nowiki><span id="RealTitle">title</span></nowiki>
  * <nowiki></div></nowiki>
  * An element with id=DisableRealTitle disables the function.
  ********************************************************************************************/
 
 rewritePageH1 = function() {
    try {
        var realTitleBanner = document.getElementById("RealTitleBanner");
        if (realTitleBanner) {
            if (!document.getElementById("DisableRealTitle")) {
                var realTitle = document.getElementById("RealTitle");
                var h1 = document.getElementsByTagName("h1")[0];
                if (realTitle && h1) {
                    h1.innerHTML = realTitle.innerHTML;
                    realTitleBanner.style.display = "none";
                }
            }
        }
    } 
 catch (e) {
    /* Algo deu errado. */
    }
 }
 addOnloadHook(rewritePageH1);