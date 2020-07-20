/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
importScriptPage('SocialIcons/code.js', 'dev');
 
/* Изменение плашек */
importScript('MediaWiki:Common.js/masthead.js');
 
/* Автоматическая выдача плашек по числу правок участника */
{
if (document.querySelector(".tally > em")) {
var edits = document.querySelector(".tally > em").innerHTML;
var title;
if (edits <= 100){
title = "Щенок";
} else if (edits > 100 && edits <= 500) {
title = "Ученик";
} else if (edits > 500 && edits <= 1000) {
title = "Воин";
} else {
title = "Патрульный";
}
var masthead = document.createElement('span');
masthead.className = 'tag';
masthead.innerHTML = title ;
document.getElementsByTagName("hgroup")[0].appendChild(masthead);
}
}