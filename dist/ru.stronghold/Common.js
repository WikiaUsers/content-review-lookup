/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

function infoboxToggle() {
	var page = window.pageName.replace(/\W/g, '_');
	var nowShown;
 
	if(document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[Show]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
		nowShown = true;
	}
 
	if(window.storagePresent) {
		var storage = globalStorage[window.location.hostname];
		storage.setItem('infoboxshow-' + page, nowShown);
	}
}
 

/*Добавляет дополнительные "статусы" участников. Однако прав не дает.*/
 
// rights[""] = [""];
 
// Код написан: Rappy_4187 для англовики.
 
$(function() {
 var rights = {};
 
 
   //Участники, имеющие более одного статуса
 rights["FRAER"]                     = ["ЛОРД,", "КОРОЛЬ"];
 rights["Vladislav4ik"]                     = ["ОСНОВОПОЛОЖНИК"];
 rights["Гриф"]                     = ["ЕГЕРЬ"];
 rights["Крестоносец"]                     = ["ЕГЕРЬ"];
 
 if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});

/*Для шаблона "Ник*/

if (wgUserName != 'null') {
    $('.insertusername').text(wgUserName);
}

/*Для изменения текста в зависимости от пола читателя*/
(function ($, mw) {
    'use strict';
    var userGender = mw.user ? mw.user.options.values.gender : 'unknown';
    if ($('.client-gender-based-text').length) {
        $('.client-gender-based-text').each(function () {
            $(this).html($(this).data(userGender));
        });
    }
}(this.jQuery, this.mediaWiki));

/*====================================================================================*/
/* ДЛЯ СТАРОГО ФОРУМА */

/**
 * Получает массив элементов по XPath (аналог $x() функции)
 */
function getByXPath(xpath) {
  var res = [];
  var nodesSnapshot = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
  for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ){
    res.push( nodesSnapshot.snapshotItem(i) );
  }
  return res;
}

/**
 * Подчищает HTML-текст от лишних тегов и минимально переводит в вики-разметку
 */
function clearUpHTML(htmlText) {
    var res = htmlText.replace(/<b>/g, "'''").replace(/<\/b>/g, "'''")
            .replace(/<i>/g, "''").replace(/<\/i>/g, "''"); //Жир и курсив - в вики-стиле
    
    var link = res.match(/<a href=".*?title="(.*?)">(.*?)\s?<\/a>/); //ссылки на вики-страницы
    //\s? - если теги в ссылках, то может перевод строки появиться
    while (link != null) {
        res = res.replace(/<a href=".*?title=".*?">.*?\s?<\/a>/, "[[" + link[1] + "|" + link[2] + "]]");
        link = res.match(/<a href=".*?title="(.*?)">(.*?)\s?<\/a>/);
    }
    
    link = res.match(/<a href="#(.*?)">(.*?)\s?<\/a>/); //ссылки на якори
    while (link != null) {
        res = res.replace(/<a href="#.*?">.*?\s?<\/a>/, "[[#" + link[1] + "|" + link[2] + "]]");
        link = res.match(/<a href="#(.*?)">(.*?)\s?<\/a>/);
    }
    
    link = res.match(/<a.*?href="http(.*?)">(.*?)\s?<\/a>/); //внешние ссылки
    while (link != null) {
        res = res.replace(/<a.*?href="http(.*?)">(.*?)\s?<\/a>/, "[http" + link[1] + " " + link[2] + "]");
        link = res.match(/<a.*?href="http(.*?)">(.*?)\s?<\/a>/);
    }
    
    link = res.match(/<a class="new".*?title="(.*?) \(.*?\).*?">(.*?)\s?<\/a>/); //ссылки на несуществующие страницы
    while (link != null) {
        res = res.replace(/<a class="new".*?title=".*? \(.*?\).*?">.*?\s?<\/a>/, "[[" + link[1] + "|" + link[2] + "]]");
        link = res.match(/<a class="new".*?title="(.*?) \(.*?\).*?">(.*?)\s?<\/a>/);
    }
    
    res = res.replace(/<p>/g, "\n").replace(/<\/p>/g, ""); //параграфы ни к чему
    res = res.replace(/<dl><dd>/g, ":").replace(/<\/dd><\/dl>/g, ""); //отступы слева
    
    return res;
}

/**
 * Копирует цитируемое сообщение форума в буфер обмена при клике на "Ответить" 
 */
function copyCite(ID) {
    var msg = getByXPath("//div[@id='cite-button-"+ ID +"']/preceding-sibling::div[@class='forum-message-text']")[0].innerHTML;
    msg = clearUpHTML(msg);

    var author = getByXPath("//div[@id='cite-button-"+ ID +"']/preceding-sibling::div[@class='forum-theme-author-nickname']")[0].innerText;

    copyText = '<div class="forum-quote">\n:' + author + " [[#" + ID +  "|пишет]]:\n\n" + msg + "\n</div>\n";

    navigator.clipboard.writeText(copyText);
    if (msg.length < 300) {
        alert("Сообщение " + author + " скопировано в буфер обмена: \n" + msg);
    }
    else {
        alert("Сообщение " + author + " скопировано в буфер обмена.");
    }
}

/**
 * Для страниц форума добавить атрибуты onclick кнопкам "Ответить"
 */
 if (wgNamespaceNumber == 110) { //Т. е. если пространство имён Форум:
     citeButtons = getByXPath("//div[@class='cite-button']");

    for(var i = 0; i < citeButtons.length; i++) {
        var nextID = citeButtons[i].id;
        nextID = nextID.replace("cite-button-", "");
        citeButtons[i].setAttribute("onclick", "copyCite(" + nextID + ");");
    }
 }