//Интерактивная таблица
if (mw.config.get('wgPageName') === 'Интерактивная_таблица_артефактов') {
    importArticle({ type: 'script', article: 'MediaWiki:Items.js' });
}

//Шаблон:RailModule dev wiki
window.AddRailModule = [
    { page: 'Template:Rail0', prepend: true },
    'Template:Rail1',
];

if (mw.config.get('wgPageName') != 'Интерактивная_таблица_артефактов') {
    importArticle({ type: 'script', article: 'u:dev:MediaWiki:AddRailModule/code.js' });
}

//Стиль бек кнопки dev wiki
window.BackToTopModern = true;

//Подсветка активной статьи
if ($('#blight').length) {
   $('#blight .sn[data-title="' + mw.config.get('wgPageName') + '"]').addClass("snlight");
}


//Подсветка кнопок сортировки
$(document).on('click', '.rentable_sort span', function(){
	  $(this).addClass('active_ita').siblings().removeClass('active_ita')
})

//Переключатель для инт. таблицы (и возможно для других элементов)
  $(function () {
        $('.switch-btn').click(function () {
            $(this).toggleClass('switch-on');
            if ($(this).hasClass('switch-on')) {
                $(this).trigger('on.switch');
            } else {
                $(this).trigger('off.switch');
            }
        });
        $('.switch-btn').on('on.switch', function () {
            $($(this).attr('data-id')).removeClass('bl-hide');
        });
        $('.switch-btn').on('off.switch', function () {
            $($(this).attr('data-id')).addClass('bl-hide');
        });
    });
//********конец интерактивной   


//Превью предметов через модуль Getdata
window.tooltips_list = [{
    classname: 'tooltip-monster',
    parse: '{{#invoke:getdata|infobox|<#article#>|Монстр Rebirth}}'
},

{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Предмет Rebirth}}'
},


{
    classname: 'tooltip-trinket',
    parse: '{{#invoke:getdata|infobox|<#article#>|Брелок Rebirth}}'
},

{
    classname: 'tooltip-info',
    parse: '{{#invoke:getdata2|div|<#article#>|Инфо}}'
}

];

//Кнопочки для страницы Four Souls
$('.cardb1').click(function(){
    $('.card1').show();
    $('.card2').hide();
});

$('.cardb2').click(function(){
    $('.card1').hide();
    $('.card2').show();
});


//Slider for my DC wiki
mw.loader.load('https://dead-cells.fandom.com/ru/wiki/MediaWiki:HSlider.js?action=raw&ctype=text/javascript');

 
//Кликабельная деятельность (Димон)

function addLinkInActivityModule() {
    if ($("#WikiaRail section").length >= 2)
        $("#wikia-recent-activity .has-icon").wrap("<a href='https://"+ window.location.host +"/ru/wiki/Служебная:RecentChanges'>")
    else
        setTimeout(addLinkInActivityModule, 500)
}
addLinkInActivityModule()

//сп
$(function(){
    var config = mw.config.get(['wgScriptPath']);
    $('.fandom-community-header__local-navigation .wds-dropdown:first-child ul.wds-list').prepend('<li><a href="' + config.wgScriptPath + '/wiki/Special:RecentChanges"><svg class="wds-icon wds-icon-tiny navigation-item-icon"><use xlink:href="#wds-icons-activity-small"></use></svg>Свежие правки</a></li>');
});