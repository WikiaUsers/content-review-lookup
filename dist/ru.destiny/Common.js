importArticles({
    type: "script",
    articles: [
        "u:dev:DISPLAYTITLE/code.js",
        "u:dev:DupImageList/code.js"
    ]
});

//Добавление расширения на 4-й и 5-й уровень НавМеню Вики
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});
 
/*Цвет стрелки для перехода в 4-й или 5-й уровень*/
$('.chevron-right').css('border-left-color', '#fff');
 
//Links divs with CategoryHover class using data-url attribute
$('.CategoryHover').click(function() {
	if (($(this).data("url")).match("^/wiki/")) {
		window.location.href = ($(this).data("url"));
	}
});