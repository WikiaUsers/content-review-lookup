/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
window.tooltips_config = {
    noCSS: true,
};

window.tooltips_list = [
    {
        classname: 'spell-tooltip',
        parse: '{'+'{Заклинание|<#spell-name#>}}',
    }
];