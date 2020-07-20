/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */

 // **************************************************
 //  Автоматичне оновлення
 // **************************************************
 
window.ajaxPages = [
    "Спеціальна:Watchlist",
    "Спеціальна:Contributions",
    "Спеціальна:WikiActivity",
    "Спеціальна:RecentChanges"
];
window.AjaxRCRefreshText = 'Автооновлення';
window.AjaxRCRefreshHoverText = 'Включити автооновлення сторінки';

// Код написаний: Rappy_4187 для англовікі.
// Тільки видимий скрипт, статусів він не дає
/* Please swap this over to https://dev.fandom.com/wiki/ProfileTags
$(function() {
 var rights = {};
 rights["Mix Gerder"]     = ["БОС"];
 rights["CapoMafiozi"]    = ["КОНСИЛЬЄРІ"];
 if (typeof rights[wgTitle] != "undefined") {
 
      // прибираємо старі права
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // додаємо нові
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});
*/

/*Неактивні користувачі*/
//Inactive users
window.InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВНИЙ'
};
 
///////////////////////////////////////////////
///         Вікіфікатор в режим Вихідного коду.
///////////////////////////////////////////////

function addWikifButton() {
	var toolbar = document.getElementById('toolbar')
	if (!toolbar) return
	var i = document.createElement('img')
	i.src = '//upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
	i.alt = i.title = 'Вікіфікатор'
	i.onclick = Wikify
	i.style.cursor = 'pointer'
	toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
	importScriptURI('//ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
	addOnloadHook(addWikifButton)
}

window.PurgeButtonText = 'Оновити';

//Импорт EditIntroButton
window.EditIntroButtonText = 'Редагувати преамбулу';