/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

AjaxRCRefreshText = 'Автообновление';
AjaxRCRefreshHoverText = 'Обновлять эту страницу автоматически';
ajaxPages = ["Служебная:RecentChanges","Служебная:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

importScript('MediaWiki:Common.js/DisplayTimer.js');
importScriptPage('Voice_Output/code.js', 'dev');
importScriptPage('Voice_Dictation/voice.js', 'dev');
importScriptPage('Translator/Translator.js', 'dev');