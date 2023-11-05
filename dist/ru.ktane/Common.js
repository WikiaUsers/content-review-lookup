/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/* Шаблон:Навбокс */
// Открытие таблицы кликом по заголовку
$('.navbox-table .header').click(function() {
	var navboxTable = $(this).parent('.navbox-table');
	navboxTable.find('.mw-collapsible-content').removeAttr('style')
	if (navboxTable.hasClass('mw-collapsed')) {
		navboxTable.removeClass('mw-collapsed');
		navboxTable.find('.mw-collapsible-content').show();
	}
	else {
		navboxTable.addClass('mw-collapsed');
		navboxTable.find('.mw-collapsible-content').hide();
	}
});