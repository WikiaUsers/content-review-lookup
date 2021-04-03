//Кнопки для карты
$('.interplu').click(function(){
  $('.specmap').css('transform', 'scale(0.8)');
    $('.specmap').css('top', '-365px');
});

$('.intermin').click(function(){
  $('.specmap').css('transform', 'scale(0.67)');
  $('.specmap').css('top', '-585px');
});







/*превью предметов*/
window.tooltips_list = [{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Предмет}}'
}];





/*фон*/
window.bgrandom_list = [
    "https://images.wikia.nocookie.net/dead-cells/ru/images/5/54/Wall1.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/3/36/Wall2.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/9/90/Wall3.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/3/35/Wall4.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/c/cd/Wall5.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/b/bb/Wall6.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/9/9b/Wall7.jpg"];
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RandomBackground/code.js',
    ]
});