/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */

AjaxRCRefreshText = 'Авто-оновлення';
AjaxRCRefreshHoverText = 'Автоматично оновляти цю сторінку';
ajaxPages = ["Спеціальна:RecentChanges","Спеціальна:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
importScript('MediaWiki:Common.js/DisplayTimer.js');