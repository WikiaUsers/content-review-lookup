/**
* Данный скрипт добавляет пункт меню для просмотра журналов (Special:Log) в верх страницы рядом с кнопками и счетчиком правок.
* 
* Version: 1.0
* Author: Kofirs2634
*/
$(function() {
    if (window.logsButtonLoaded) return;
    window.logsButtonLoaded = true;
    $('.wds-community-header .wds-button-group > .wds-dropdown .wds-dropdown__content.wds-is-not-scrollable .wds-list').append($('<li>').append($('<a>', {
        href: '/ru/wiki/Special:Log',
        text: 'Последние журналы'
    })))
})