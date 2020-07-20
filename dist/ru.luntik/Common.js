/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Автор: Rendann */
/* Закрытие форума */
$(function() {
    if (mw.config.get( 'wgNamespaceNumber' ) == '2000' && mw.config.get( 'wgUserGroups' ).indexOf('sysop') === -1) {
        $('#ForumNewMessage').replaceWith('<blockquote class="message">Форум отключен. Общение участников теперь ведётся в <a href="https://luntik.fandom.com/ru/f">обсуждениях</a></blockquote>');
    }
});

// AJAX-обновление некоторых страниц (выбор страниц)
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
]; 
window.AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемая подсказка

/* Кнопки в редакторе исходного кода для тире и кавычек-ёлочек */
if ( mwCustomEditButtons ) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/sy233-ms/images/c/c2/Кавычки.png/revision/latest?cb=20180704114832&path-prefix=ru",
		"speedTip": "Кавычки",
		"tagOpen": "«",
		"tagClose": "»",
		"sampleText": "Введите текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/sy233-ms/images/5/56/Дефис.png/revision/latest?cb=20180704115844&path-prefix=ru",
		"speedTip": "Тире",
		"sampleText": "—"
	};
}