// На вики также подключены расширения "DynamicPageList" и "Variables"
// Содержание
//	1. Настройки гаджетов
//	2. Подсказка редлинков 
//  3. Шаблонное краткое описание изображений / Форум
//  4. Спойлер в статьях
//  5. Следящий глаз
//  6. Выпиливание "Категории" у Категорий

//------------------------------------//
nkch_gst_gadgets = [{
    name: "RWA", // название гаджета с MediaWiki:Gadget-Название; обязательно
    title: "Недавняя вики-деятельность", // Название в меню
    description: "Недавняя вики-деятельность" // Описание гаджета в меню при наведении
}, {
    name: "UWStyle",
    title: "Единый стиль вики",
    description: "Общее оформление вики-проектов"
}, {
    name: "Quick-insert",
    title: "Быстрая вставка в редакторах",
    description: "Быстрая вставка в редакторах"
}, {
    name: "RemoveCatSpoiler",
    title: "Прежние Категории",
    description: "Прежние Категории"
}, {
    name: "Cursor",
    title: "Тематичческий курсор",
    description: "Тематические курсор"
}];

// Всплывающая подсказка красных ссылок
mw.loader.using("mediawiki.api").then(
	function() {
		if (mw.config.get("skin") !== "fandomdesktop"){
			return;
			} else {
				document.querySelectorAll("a.new").forEach(
				    function (i) {
				        i.setAttribute("title", decodeURI(new mw.Uri(i.href).path.replace(mw.config.get("wgScriptPath"), "").replace("/wiki/", "").replace(/_/g, " ")));
				    }
				);
			}
		}
);

// Случайная надпись
var wiki_name_number=Math.floor(Math.random() * 12);
var wiki_name_text=["Эксельсиор!", "Мстители, общий сбор!", "Ко мне, мои Люди-Х!", "С великой силой...", "Халк крушить!", "Пламя!", "Ваканда навсегда!", "Я - железный человек", "Я есть Грут", "Твип!", "Великая сила, никакой ответственности!" ][wiki_name_number];
var elements=document.getElementsByClassName('fandom-community-header__community-name');
var wiki_name=elements[0];
wiki_name.textContent=wiki_name_text;

// выполнение при готовности страницы
$(document).ready(function()
{      
    // если открыта страница загрузки изображения
    if (wgCanonicalSpecialPageName === 'Upload') 
    {
        // добавление шаблона в поле краткого описания для загружаемого изображения
        $('#wpUploadDescription').val('{{Изображение \n| Описание  = \n| Источник  = \n| Появления = \n| Автор     = \n| Категория = \n| Лицензия  = \n}}');
        // перемещение выпадающего списка лицензий и блока для шаблона выбранной лицензии 
        $("tr.mw-htmlform-field-HTMLTextAreaField").after( $("tr.mw-htmlform-field-Licenses, tr.mw-htmlform-field-Licenses + tr") );
        
        $('#wpDestFile').before( $('label[for=wpDestFile]' ) )
          .after( 
          '<div id="UploadDescriptionContainersAll">'+
            '<div id="UploadDescriptionContainer1"></div>'+
          '</div>'+
          '<div id="LicensesContainer"></div>'
        );
        $('#UploadDescriptionContainer1').append(
            $('label[for=wpUploadDescription], #wpUploadDescription' )
        );

        // перемещение выпадающего списка лицензий и блока для шаблона выбранной лицензии 
        $('#LicensesContainer').append( $('label[for=wpLicense]' ), $('#wpLicense' ) );
        $('#wpLicense' ).wrap('<div></div>') ;
    }
	
	if (wgCanonicalNamespace === 'Forum')
	{
		importScript('MediaWiki:Forum.js');
	}
});

// Настройка блокировки статей от спойлеров
window.SpoilerAlertJS = {
    question: 'Эта статья содержит спойлеры. Вы уверены, что хотите продолжить чтение?',
    yes: 'Да',
    no: 'Нет',
    fadeDelay: 1600
};


/* Настройка для dev:PreloadTemplates */ 
preloadTemplates_subpage =  "case-by-case" ;


// Глаз на странице поиска
// $(document).ready(function() {
// 	$('<div class="error"><div class="error-image"><div class="error-image-animate"></div></div></div>').appendTo('.unified-search__layout__left-rail');

//     // если открыта страница поиска
//     if (wgCanonicalSpecialPageName === 'Search') 
//     {
//         document.onmousemove = function (event) {
// 		    var width  = window.innerWidth,
// 				height = window.innerHeight,
// 		        x = event.x - 450,
// 				y = event.y - height + 275;
// 			document.querySelector('.error-image-animate').style.transform = 'rotate(' + 57.2958 * arcctg(x, y) + 'deg';

// 			function arcctg(x, y) {
// 				if (x > 0 && y > 0) return Math.PI / 2 - Math.atan(x / y);
// 				if (x < 0 && y > 0) return Math.PI / 2 - Math.atan(x / y);
// 				if (x < 0 && y < 0) return Math.PI + Math.atan(y / x);
// 				if (x > 0 && y < 0) return 3 * Math.PI / 2 + Math.abs(Math.atan(x / y));
// 			}
// 		}
//     }
// });

// "Категории"
	// Перемещает ссылки, удаляя ненужный контент
	// $(function() {
	// 	$(".mw-normal-catlinks ul").replaceWith(
	// 		$(".mw-normal-catlinks").contents()
	// 	);
	// 	$(".mw-normal-catlinks").replaceWith(
	// 		$(".mw-normal-catlinks").contents()
	// 	);
	// 	$("#mw-hidden-catlinks ul").replaceWith(
	// 	    $("#mw-hidden-catlinks").contents()
	// 	);
	// });