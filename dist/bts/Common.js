/* All code JS - By TRJ-VoRoN from The Binding of Isaac Ru Wiki */


//рецепты мешка
$(function(){
    $('.tt3').each(function(){
        $(this).click(function() {
            $('.tt4').removeClass('defaultCraft');
            $('.tt3').removeClass('defaultButton');
            $(this).find('.tt4').addClass('defaultCraft');
            $(this).addClass('defaultButton');
        });
    });
});

//Шаблон:RailModule dev wiki - Credit to Викии Вики
window.AddRailModule = [
    { page: 'Template:RailModule1', prepend: true },
    'Template:RailModule2',
    'Template:RailModule3',
];

//Стиль бек кнопки dev wiki
window.BackToTopModern = true;

//Подсветка активной статьи
if ($('#blight').length) {
   $('#blight .sn[data-title="' + mw.config.get('wgPageName') + '"]').addClass("snlight");
}

//Подсветка кнопок сортировки
$(document).on('click', '.rentable_sort span', function(){
	  $(this).addClass('active_ita').siblings().removeClass('active_ita');
});

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
window.tooltips_list = [];

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
        $("#wikia-recent-activity .has-icon").wrap("<a href='https://"+ window.location.host +"/wiki/Special:RecentChanges'>");
    else
        setTimeout(addLinkInActivityModule, 500);
}
addLinkInActivityModule();