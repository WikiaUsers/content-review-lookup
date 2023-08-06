/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/** Кастомное подчеркивание у h2 **/
$(function() {
	$(".page").find("h2:has(.mw-headline)").wrapInner('<div class="h2-content" />');
});