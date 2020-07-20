/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице
   Для импорта отдельных скриптов используется страница [[MediaWiki:ImportJS]] */
   
// Дополнительные кнопки панели редактирования

   if ( mwCustomEditButtons ) 
     mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png/revision/latest?cb=20080220213803",
    "speedTip": "Добавить сноску",
    "tagOpen": "<ref>",
    "tagClose": "</ref>",
    "sampleText": "Название сноски"
};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/f/f2/Ref_name_button.png/revision/latest?cb=20131205151742",
    "speedTip": "Повторная сноска",
    "tagOpen": "<ref name=Название>",
    "tagClose": "</ref>",
    "sampleText": "Название повторной сноски"
};

    mwCustomEditButtons[mwCustomEditButtons.length] = { 
   "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/c8/Button_redirect.png/revision/latest?cb=20130630205318", 
    "speedTip": "Добавить перенаправление", 
    "tagOpen": "#Перенаправление [[", 
    "tagClose": "]]", 
    "sampleText": "Название страницы" 
};

     mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/cb/Button_wikipedia.png/revision/latest?cb=20081020115941",
    "speedTip": "Ссылка на статью в Википедии",
    "tagOpen": "[[wikipedia:ru:|",
    "tagClose": "]]",
    "sampleText": ""
};
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
    "speedTip": "Добавить галерею",
    "tagOpen": "<gallery>",
    "tagClose": "</gallery>",
    "sampleText":""
}; 
    
     mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png/revision/latest?cb=20070329065451",
    "speedTip": "Добавить шаблон",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "Название шаблона"
};

     mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anführung.png",
    "speedTip": "Добавить цитату",
    "tagOpen": "{{Цитата|",
    "tagClose": "||}}",
    "sampleText": ""
};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/b/b4/Button_category03.png/revision/latest?cb=20070329064836",
    "speedTip": "Добавить категорию",
    "tagOpen": "[[Категория:|",
    "tagClose": "]]",
    "sampleText": ""
};

     mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/a/a4/TableStart.png/revision/latest?cb=20070927085428",
    "speedTip": "Создать таблицу",
    "tagOpen": "{|",
    "tagClose": "|}",
    "sampleText": "Начало новой таблицы"
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0e/Button_acute_accent.png",
    "speedTip": "Ударение",
    "tagOpen": "́",
    "tagClose": "",
    "sampleText": ""
};
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/5/56/Button_big.png/revision/latest?cb=20081020113952",
    "speedTip": "Крупный шрифт",
    "tagOpen": "<big>",
    "tagClose": "</big>",
    "sampleText": ""
};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/5/58/Button_small.png/revision/latest?cb=20081020113836",
    "speedTip": "Мелкий шрифт",
    "tagOpen": "<small>",
    "tagClose": "</small>",
    "sampleText": ""
};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/f/fd/Button_underline.png/revision/latest?cb=20081020114112",
    "speedTip": "Подчёркнутый текст",
    "tagOpen": "<u>",
    "tagClose": "</u>",
    "sampleText": ""
};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/c9/Button_strike.png/revision/latest?cb=20070324060207",
    "speedTip": "Зачёркнутый текст",
    "tagOpen": "<s>",
    "tagClose": "</s>",
    "sampleText": ""
};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png/revision/latest?cb=20070329064320",
    "speedTip": "Нумерованный список",
    "tagOpen": "#",
    "tagClose": "",
    "sampleText": ""
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png/revision/latest?cb=20070329064826",
    "speedTip": "Маркированный список",
    "tagOpen": "*",
    "tagClose": "",
    "sampleText": ""
};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/d/d5/Button_noinclude.png/revision/latest?cb=20070329065148",
    "speedTip": "Скрыть категорию шаблона в статьях",
    "tagOpen": "<noinclude>",
    "tagClose": "</noinclude>",
    "sampleText": "На место этого текста, вставьте категорию"
};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
    "speedTip": "Перенос строки",
    "tagOpen": "<br>",
    "tagClose": "",
    "sampleText": ""
};



    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/7/74/Button_comment.png/revision/latest?cb=20070324060240",
    "speedTip": "Скрытый комментарий",
    "tagOpen": "<!--",
    "tagClose": "-->",
    "sampleText": "Добавьте комментарий"
};
  
//================================================================
// Иконки в [[Template:Игры]]; автор: [[:en:User:Porter21]]
function addTitleIcons() {
	if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
		var insertTarget;

		switch (skin) {
			case 'monobook':
				insertTarget = $('#firstHeading');
				break;
			case 'oasis':
				if (wgAction != 'submit' && wgNamespaceNumber != 112) {
					insertTarget = $('#WikiaArticle');
				}
				break;
		}
		if (insertTarget) {
			$('#va-titleicons').css('display', 'block').prependTo(insertTarget);
		}
	}
}
jQuery(function($) {
	addTitleIcons();
});

//================================================================
// Вставка пользовательского имени для [[Template:Username]]
$(function() {
	if (wgUserName != 'null') {
		$('.insertusername').html(wgUserName);
	}
});
//================================================================
// Простой генератор списка заголовков на [[Special:AchievementsCustomize]]
var wgPageName;
if(wgPageName=='Служебная:AchievementsCustomize'||'Special:AchievementsCustomize') {
	$('.article-sidebar #AchievList').remove();
	$('<section class="module" id="AchievList" style="float: left;"><h2>Существующие треки</h2><ol></ol></section>').appendTo('.article-sidebar');

	var AchievHeaders = $('.customize-section h2');
	var AchievList = $('.customize-section h2');

	for (var n = AchievHeaders.length-1; n>=0; n--) {
		AchievList[n] = $(AchievHeaders[n]).text().replace(" трек изменён", "");
		$(AchievHeaders[n]).replaceWith('<h2>' + AchievList[n] + '</h2>');
	}

	AchievList.sort();

	for (var n = AchievList.length-1; n>=0; n--)
		$('<li>' + AchievList[n] + '</li>').prependTo('#AchievList ol');
}

//================================================================
// Настройки скриптов

//--------------------------------
// Неактивные пользователи (InactiveUsers)
InactiveUsers = {
	months: 3,
	text: 'НЕАКТИВЕН'
};

//--------------------------------
// Проверка подписей (SignatureCheck)
window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: '',
	epilogue: '\nНажмите кнопу «отмена» и внесите соответствующие изменения. Если же вы уверены, что данное предупреждение сработало ошибочно, то вы можете сохранить страницу, нажав кнопку «OK»',
	noForumheader: 'Вы удалили (либо забыли добавить) шапку форума. Пожалуйста, добавьте в начало страницы шаблон {{Forumheader}}.\n\n',
	noSignature: 'Вы забыли добавить подпись к своему сообщению с помощью четырёх тильда ~ ~ ~ ~ (без пробелов)\n',
		forumheader: 'Forumheader'
};
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

//--------------------------------
// Полу-автоматическая архивация (ArchiveTool)
var ArchiveToolConfig = {
	archiveListTemplate: 'Archives',
	archivePageTemplate: 'Archivepage',
	archiveSubpage: 'Archive'
};

//--------------------------------
// Автообновление служебных страниц (AJAX Recent Changes)
var ajaxPages = ["Служебная:Contributions","Служебная:NewPages","Служебная:RecentChanges","Служебная:WikiActivity","Служебная:NewFiles","Служебная:Log","Служебная:Видео"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Включить автообновление';

//--------------------------------
// Описание правок (Standard Edit Summary)
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'Шаблон:Описание правки'
};

//--------------------------------
/* Информация о последней правке (LastEdited)
window.lastEdited = {
	avatar: true,
	size: false,
	diff: true,
	comment: true,
	time: 'timeago',
	lang: 'ru',
	namespaces: {
		include: [1,3,5,6,7,8,9,10,11,13,15,113,828,829],
		exclude: [0,2,4,12,14,112]
	},
	pages: []
};
*/

//================================================================
// Импорт скриптов, некорректно работающих с [[MediaWiki:ImportJS]]

importArticles({
	type: 'script',
	articles: [
		'MediaWiki:Collapsible tables.js',                 // Сворачивающиеся таблицы.
		'MediaWiki:GetWikiStatistics.js',                  // Получение данных с других вики
		// 'u:dev:MediaWiki:LastEdited/code.js',              // Последняя правка.
		'u:dev:MediaWiki:RecentChangesMultiple/code.2.js', // Гибридные свежие правки.
		'u:dev:MediaWiki:ReferencePopups/code.js',         // Примечания.
	]
});