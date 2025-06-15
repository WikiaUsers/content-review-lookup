/* Toggle spolier button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (button.length !== 1) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Show spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Hide spoilers');
        }
    }

    button.text('Show spoilers');

	button.click(toggleText);
});

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
    title: "Недавняя активность", // Название в меню
    description: "Оформление для свежих правок, соц. активности, страницы истории" // Описание гаджета в меню при наведении
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
    name: "UCXSearch",
    title: "Быстрый поиск",
    description: "Поисковая строка в локальном меню без модального окна"
}, {
    name: "ThemeToggler",
    title: "Переключатель темы",
    description: "Иконка в левой части страницы для переключения темы"
}, {
    name: "SnowStorm",
    title: "Падение снега",
    description: "Снежинки зимой на вики. Помните, было такое?"
}
];

// Настройка AddRailModule
window.AddRailModule = ['Template:Foo', 'Template:Bar', 'Template:Baz', 'Template:NewPagesModule', 'Template:Уголок'];

/*кастом модули*/
window.AddRailModule = [
    { page: 'Template:RailModule1', prepend: true },
    'Template:RailModule2',
    'Template:RailModule3',
];

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