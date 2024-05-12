/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* Спойлеры */

window.AddRailModule = ['Template:RailModule'];

$(function(){
    $('.spoil').each(function(){
        $(this).click(function() {
            $(this).addClass('spoilopen')
            $(this).removeClass('spoil')
        });
    });
});
/* Нацдухи */
window.tooltips_list = [
    {
        classname: 'custom-tooltip-parse',
        parse: '{| class="tt-table"\n|style="color: #DEA400"|<b><#name#></b>\n|-\n|<#effect#>\n|{'+'{#if:{'+'{'+'{Условие|}}}|-\n{'+'{!}}<#condition#>\n{'+'{!}}|}}{'+'{#if:{'+'{'+'{Цена|}}}|-\n{'+'{!}}Стоимость ({'+'{Политическая власть||22px}}): {'+'{Цвет|Y|<#cost#>}}\n{'+'{!}}|}}{'+'{#if:{'+'{'+'{Описание|}}}|-\n{'+'{!}}<div style="border-top: 2px dashed #A2A2A2; background: #7B7B7B; width: 60px"></div>\n{'+'{!}}-\n{'+'{!}}style="white-space: normal"{'+'{!}}<#name#>\n|-}}\n|}',
    },
]
/* Моментальное обновление служебных списков */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CacheCheck/code.js',
    ]
});