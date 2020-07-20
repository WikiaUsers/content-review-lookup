imagePopupsForImages = false; // не всплывать на иллюстрациях
popupDelay = 1; // задержка на секунду перед всплытием окна
popupMaxWidth = 400; // ширина всплывающего окна
popupMaxPreviewSentences = 10; // больше предложений в окне
popupMaxPreviewCharacters = 666;// больше символов в окне
popupPreviewFirstParOnly = false; // цитируется не только первый абзац
popupPreviewKillTemplates = false; // шаблоны показывать, пусть и сырыми
popupFixDabs=false; // [[w:ВП:ИСН]]

//importScript('User:Lupin/popups.js', 'en');
//importScriptURI('//en.wikipedia.org/w/index.php?title=User:Lupin/popups.js&action=raw&ctype=text/javascript');
 
//can I just use the wikibits importStylesheetURI()?
function popups_importStylesheetURI(url) {
	return document.createStyleSheet ? document.createStyleSheet(url) : appendCSS('@import "' + url + '";');
}
 
popups_importStylesheetURI('//en.wikipedia.org/w/index.php?action=raw&ctype=text/css&title=MediaWiki:Gadget-navpop.css');
importScriptURI('//en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-popups.js&action=raw&ctype=text/javascript');
importScriptURI('//ru.wikipedia.org/w/index.php?title=Участник:Lockal/strings-ru.js&action=raw&ctype=text/javascript');