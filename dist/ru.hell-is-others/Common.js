// Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице

/* Убрать title в автотаблицах */
$(function() {
	var intervalNoTitle = setInterval(notitle, 500)
	function notitle() {
    	if ($('.autotable .tooltip-theme-main').parent('th.headerSort').attr('title', '')) {
    	    clearInterval(intervalNoTitle)
			$('.autotable .tooltip-theme-main').parent('th.headerSort').attr('title', '')
		}
	}
});

/* Настройки для BackToTopButton */
window.BackToTopModern = true;

/* Прогресс-бар */
window.AddRailModule = [
    // { page: 'Template:RailModule1', maxAge: 60 },
    { page: 'Template:RailModule2', maxAge: 60 },
];

/* Настройка тултипов */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
}
/* Тултип предметов */
window.tooltips_list = [
    {
    	classname: 'item-tooltip',
    	parse: '{{#invoke:getdata|infobox|<#article#>|Автоинфобокс/Предмет}}',
	}
];