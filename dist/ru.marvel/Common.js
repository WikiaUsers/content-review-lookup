// На вики также подключены расширения "DynamicPageList" и "Variables"
// Содержание
//	1. Настройки гаджетов
//	2. Подсказка редлинков 
//  3. Шаблонное краткое описание изображений / Форум
//  4. Спойлер в статьях
//  5. Следящий глаз
//  6. Выпиливание "Категории" у Категорий
//  7. Discord Widget
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
    name: "PreviewRail",
    title: "Рельса в предпросмотре",
    description: "Имитация рельсы в предпросмотре."
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

"use strict";

var WidgetBot = document.createElement('script');
WidgetBot.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3');
WidgetBot.setAttribute('async', true);
WidgetBot.setAttribute('defer', true);
WidgetBot.onload = function () {
  return new Crate({
    server: '277509745080926220',
    channel: '534838139383054352',
    glyph: ['https://static.wikia.nocookie.net/marvel/images/c/cc/VenomDiscLogo.gif/revision/latest/scale-to-width-down/200?cb=20210120172230&path-prefix=ru', '100%']
  });
};
document.body.appendChild(WidgetBot);


/* Подключение страниц */
importArticles({
    type: 'script',
    articles: [
        'u:fallout:MediaWiki:Gadget-InterlanguageChecker.js', // InterlanguageChecker
        // 'MediaWiki:DiscordWidget.js'
    ]
});

// Настройка AddRailModule
window.AddRailModule = ['Template:Проект:Комиксы/Комиксы недели', 'Template:NewPagesModule', 'Template:Уголок'];

// Замена изображения для всплывающего окна ссылки
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/marvel/images/c/c5/Noimg.jpg/revision/latest?cb=20120406175848&path-prefix=ru';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/marvel/images/c/c5/Noimg.jpg/revision/latest?cb=20120406175848&path-prefix=ru';
window.pPreview.RegExp.onlyinclude = ['.mw-parser-output > p a'];
window.pPreview.RegExp.iparents = ['.ns-special', '.РГ', '.comics-table', '.noPreview'];

// выполнение при готовности страницы
$(document).ready(function() {
	// Перемещение эпиграфа в верх на страницах выпуска
	$('.autopream').each(function() {
	    $(this).insertAfter($(this).parent().find('.autopream + .epigraph'));
	});
	// Удаление дубля
	$('.autopream + p > span.lang').parent().css({'display' : 'none'});
	$('.autopream + p > b').parent().css({'display' : 'none'});

	// Случайная надпись
	var wiki_name_number=Math.floor(Math.random() * 12);
	var wiki_name_text=["Эксельсиор!", "Мстители, общий сбор!", "Ко мне, мои Люди-Х!", "С великой силой...", "Халк крушить!", "Пламя!", "Ваканда навсегда!", "Я - железный человек", "Я есть Грут", "Твип!", "Великая сила, никакой ответственности!", 'Посмотри правде в глаза, Тигр ... ты только что сорвал джекпот!' ][wiki_name_number];
	var elements=document.getElementsByClassName('fandom-community-header__community-name');
	var wiki_name=elements[0];
	wiki_name.textContent=wiki_name_text;

	// если открыта страница загрузки изображения
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') 
    {
        // добавление шаблона в поле краткого описания для загружаемого изображения
        $('#wpUploadDescription').val('{{Изображение \n| Описание  = \n| Источник  = \n| Появления = \n| Автор     = \n| Категория = \n}}');
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
	
	// для мультизагрузки
	$('.pfd-initialized').val('{{Изображение \n| Описание  = \n| Источник  = \n| Появления = \n| Автор     = \n| Категория = \n}}');
	
	// Форум
	if (mw.config.get('wgCanonicalNamespace') === 'Forum')
	{
		importScript('MediaWiki:Forum.js');
	}
});
    
// если открыта страница новых изображений
// при добавлении нового изображения добавляет описание файла
document.querySelector(".wds-button.add-new-image").addEventListener("click", function (e) {
  function checkModal() {
    switch (document.querySelector("#UploadImageForm .file-description-area .wds-textarea__field") !== null) {
      case true:
        $('#UploadImageForm .file-description-area .wds-textarea__field').val('{{Изображение \n| Описание  = \n| Источник  = \n| Появления = \n| Автор     = \n| Категория = \n| Лицензия  = \n}}');
        return;
      case false:
        setTimeout(checkModal, 100);
      }
    }
  setTimeout(checkModal, 100);
});

// Настройка блокировки статей от спойлеров
window.SpoilerAlertJS = {
    question: 'Эта статья содержит спойлеры. Вы уверены, что хотите продолжить чтение?',
    yes: 'Да',
    no: 'Нет',
    fadeDelay: 1600
};

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