/* <pre> */
 
function addFuncButton(img, tip, func){
 var toolbar = document.getElementById('toolbar')
 if (!toolbar) return
 var i=document.createElement('img')
 i.src=img; i.alt=tip;  i.title=tip; i.onclick=func; i.style.cursor='pointer'
 toolbar.appendChild(i)
}
importScript("MediaWiki:Wikifier.js");
importScript("MediaWiki:Editsumm.js");
 
/* Добавление ссылок «Ударение» и «Абсурдофикатор» под полем для редактирования */
function addWikifierButton()
{ 
   var summ = document.getElementById('wpSummaryLabel');
   if(summ) summ.innerHTML = "Специальное: <a href=\"javascript:insertTags('́','','');\" style=\"color:blue\" title=\"Ударение (акут)\"><u>Ударение</u></a>&nbsp;•&nbsp;<a href=\"javascript:Wikify();\" style=\"text-decoration: none;color:blue\" title=\"Абсурдофицировать!\" accesskey=\"w\"><u>Абсурдофикатор</u></a>&nbsp;[<a href=\"http://ru.wikipedia.org/wiki/Википедия:Викификатор\" target=\"_blank\" title=\"Справка по Абсурдофикатору\">?</a>] <br />Краткое описание:";
}
addOnloadHook(addWikifierButton);
 
/* </pre> */