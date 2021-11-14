// --------------------------------------------------------
// Дополнительные кнопки на панели редактирования
// --------------------------------------------------------


( function() {

var buttons = [
	[
		'//upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png',
		'Добавить следующую строку',
		'<br>',
		'',
		'Следующая строка',
		'mw-editbutton-string'

	],
	[
		'//upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png',
		'Вставить перенаправление',
		'#перенаправление [[',
		']]',
		'Название страницы для перенаправления',
		'mw-editbutton-redirect'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png',
		'Вставить надстрочный текст',
		'<sup>',
		'</sup>',
		'Надстрочный текст',
		'mw-editbutton-upper_letter'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png',
		'Вставить подстрочный текст',
		'<sub>',
		'</sub>',
		'Подстрочный текст',
		'mw-editbutton-lower_letter'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/5/58/Button_small.png',
		'Вставить мелкий текст',
		'<small>',
		'</small>',
		'Мелкий текст',
		'mw-editbutton-small'
	],
	[
		'/media/minecraft-ru.gamepedia.com/0/0f/Button_vq.png',
		'Вставить цветной текст',
		'{{цвет|*Цвет текста*|',
		'}}',
		'Текст',
		'mw-editbutton-color'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png',
		'Вставить скрытый комментарий',
		'<!-- ',
		' -->',
		'Комментарий',
		'mw-editbutton-comment'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
		'Вставить сноску',
		'<ref>',
		'</ref>',
		'Сноска',
		'mw-editbutton-reflink'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/2/23/Button_code.png',
		'Вставить код',
		'<code>',
		'</code>',
		'',
		'mw-editbutton-code'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
		'Вставить галерею изображений',
		'\n<gallery>\n',
		'\n</gallery>',
		'Файл:No block image.png|Подпись1\nФайл:No block image.png|Подпись2',
		'mw-editbutton-gallery'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
		'Вставить таблицу',
		'{| class="wikitable"\n!',
		'\n|}',
		' заголовок\n|-\n| ячейка',
		'mw-editbutton-table'
	]
];
$.each( buttons, function() { mw.toolbar.addButton.apply( null, this ); } );

} )();


/** 
 * Сносочные шаблоны
**/

// Значения
var action = mw.config.get("wgAction");

// Начинаем с получения даты для использования в определённых сносках
var time = new Date(),
    curday = time.getDate(),
    month = [ "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec" ],
    curmonth = month[time.getMonth()],
    nowyear = time.getYear()+1900,
    nowday = curday.toString(),
    nowmonth = curmonth.toString();

// Теперь делаем функционал
var customizeClassicToolbar = function(){
	// Простая сноска
	mw.toolbar.addButton( {
		imageFile: '/media/hytale-ru.gamepedia.com/9/92/Cite_button.png',
		speedTip: 'Простая сноска',
		tagOpen: '<ref>[‹ссылка›',
		tagClose: ' ‹заголовок›]</ref>',
		sampleText: '',
		imageId: ''
	} );
	// [[Шаблон:Источник]]
	mw.toolbar.addButton( {
		imageFile: '/media/hytale-ru.gamepedia.com/a/ac/Cite_web_button.png',
		speedTip: 'Сноска через шаблон «Источник»',
		tagOpen: '<ref>{{Источник|дата= |ссылка= ',
		tagClose: '|заголовок= |раздел= |вебсайт= |автор= |цитата= }}</ref>',
		sampleText: '',
		imageId: ''
	} );
	// [[Шаблон:Статья]]
	mw.toolbar.addButton( {
		imageFile: '/media/hytale-ru.gamepedia.com/0/09/Cite_article_button.png',
		speedTip: 'Сноска на статью блога Hytale посредством шаблона «Статья»',
		tagOpen: '<ref>{{Статья|дата= ',
		tagClose: '|ссылка= |англ= }}</ref>',
		sampleText: '',
		imageId: ''
	} );
};

var customizeWikiEditor = function () {
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		'section': 'main',
		'group': 'insert',
		'tools': {
			'Простая сноска': {
				label: 'Простая сноска',
				type: 'button',
				icon: '/media/hytale-ru.gamepedia.com/9/92/Cite_button.png',
				'action': {
					'type': 'encapsulate',
					'options': {
						'pre': '<ref>[',
						'peri': '‹ссылка›',
						'post': ' ‹заголовок›]</ref>'
					}
				}
			},
			'Сетевая сноска': {
				label: 'Сноска через шаблон «Источник»',
				type: 'button',
				icon: '/media/hytale-ru.gamepedia.com/a/ac/Cite_web_button.png',
				'action': {
					'type': 'encapsulate',
					'options': {
						'pre': '<ref>{{Источник|дата= |ссылка= ',
						'peri': '|заголовок= |раздел= |вебсайт= ',
						'post': '|автор= |цитата= }}</ref>'
					}
				}
			},
			'Сноска статьи': {
				label: 'Сноска на статью блога Hytale посредством шаблона «Статья»',
				type: 'button',
				icon: '/media/hytale-ru.gamepedia.com/0/09/Cite_article_button.png',
				'action': {
					'type': 'encapsulate',
					'options': {
						'pre': '<ref>{{Статья|дата= ',
						'peri': '|ссылка= ',
						'post': '|англ= }}</ref>'
					}
				}
			}
		}
	} );
};
 
if( $.inArray(action, ['edit', 'submit']) !== -1 ) {
	// mw.loader.using( 'user.options', function () {
		// if ( !mw.user.options.get('usebetatoolbar') ) {
			// mw.loader.using( 'mediawiki.action.edit', function() {
				// $( customizeClassicToolbar );
			// });
		// } else {
			$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-doneInitialSections', customizeWikiEditor );
		// }
	// });
}