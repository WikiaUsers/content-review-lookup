/* Any JavaScript here will be loaded for all users on every page load. */
if (wgAction == "history")
{
   /*div = document.getElementById("WikiaArticle");*/
   div = document.getElementById("mw-content-text");
   div.innerHTML = div.innerHTML + "<br/>Această pagină este bazată pe articolul omonim de la Wikipedia. Lista completă a autorilor articolului de pe Wikipedia este disponibilă la pagina <a href=\"//ro.wikipedia.org/w/index.php?title=" + wgPageName + "&action=history\">aceasta</a>";
}