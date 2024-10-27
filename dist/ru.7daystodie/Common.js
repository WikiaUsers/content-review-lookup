/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
//Стиль бек кнопки dev wiki
window.BackToTopModern = true;





//Превью предметов через модуль Getdata
window.tooltips_list = [{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Комплект}}'
},

{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Предмет}}'
},


{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Расходник}}'
},

{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata2|infobox|<#article#>|Блок}}'
},

{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata2|infobox|<#article#>|Броня}}'
}
];