/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
window.tooltips_list = [
    {   classname: 'item-infobox',
        parse: '{'+'{ПодсказкаПредмета|<#item#>|Предмет не готов=<#unready#>|Качество=<#quality#>|NAME=<#name#>|SIGN=<#sign#>|IOU=<#iou#>|Счётчик=<#st#>|Левый текст счётчика=<#stl#>|Правый текст счётчика=<#str#>|Улучшение=<#up#>|Текстура=<#txt#>|Качество текстуры=<#qtxt#>}}'},
    {   classname: 'armor-set-infobox',
        parse: '{'+'{ТекстКачества|<#text#>|<#quality#>}}'},
    {   classname: 'illusion-item-infobox',
        parse: '{'+'{ИллюзорнаяПодсказкаПредмета|<#item#>|Качество=<#quality#>|illusion=<#if-username#>|SIGN=<#sign#>|IOU=<#iou#>|Счётчик=<#st#>|Левый текст счётчика=<#stl#>|Правый текст счётчика=<#str#>|Улучшение=<#up#>|Текстура=<#txt#>|Качество текстуры=<#qtxt#>}}'},
    {   classname: 'tooltip-infobox',
        parse: '{'+'{ПодсказкаТекст|<#text#>|<#size#>|<#wrap#>}}'},
    {   classname: 'adv-tooltip-infobox',
        parse: '{'+'{ПродвинутаяПодсказкаТекст|Header=<#header#>|desc=<#desc#>}}'},
    {   classname: 'estavita-sleeve-infobox',
        parse: '{'+'{ПодсказкаРубашкиЭставиты|<#name#>|SIGN=<#sign#>|Счётчик=<#st#>|Левый текст счётчика=<#stl#>|Правый текст счётчика=<#str#>|Текстура=<#txt#>|Качество текстуры=<#qtxt#>}}'},
        ]
 
window.tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};