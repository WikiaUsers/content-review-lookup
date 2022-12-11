/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// настройки для BackToTopButton
window.BackToTopModern = true;

/* Прогресс-бар */
window.AddRailModule = [
    { page: 'Template:RailModule1', maxAge: 60 },
    { page: 'Template:RailModule2', maxAge: 60 },
];

/* Настройка тултипов */
var tooltips_config = {
    waitForImages: true,
    noCSS: true,
}
/* Тултип предметов */
window.tooltips_list = [
    {
    	classname: 'data-tooltip',
    	parse: '{{#invoke:getdata|infobox|<#article#>|Инфобокс/Предмет}}'
	}
];