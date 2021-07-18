/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
//Стиль кнопки назад dev wiki
window.BackToTopModern = true;

//Превью избранных через модуль Getdata
window.tooltips_list = [{
    classname: 'tooltip-info',
    parse: '{{#invoke:getdata2|div|<#article#>|Инфо}}'
}
];

/*кастом модули*/
window.AddRailModule = [
    { page: 'Template:RailModule1', prepend: true },
    'Template:RailModule2',
    'Template:RailModule3',
];