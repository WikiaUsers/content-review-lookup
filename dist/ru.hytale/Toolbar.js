/** 
 * Дополнительные опции классической панели инструментов
 * Описание: Добавляет дополнительные кнопки в классическую панель инструментов редактирования.
 */

( function() {

var buttons = [
	[
		'https://gamepedia.cursecdn.com/hytale_ru_gamepedia/c/c3/Newline_icon.svg',
		'Следующая строка',
		'<br>',
		'',
		'',
		'mw-editbutton-newline'

	],
	[
		'//upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png',
		'Перенаправление',
		'#перенаправление [[',
		']]',
		'Название страницы для перенаправления',
		'mw-editbutton-redirect'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png',
		'Надстрочный текст',
		'<sup>',
		'</sup>',
		'Надстрочный текст',
		'mw-editbutton-upper_letter'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png',
		'Подстрочный текст',
		'<sub>',
		'</sub>',
		'Подстрочный текст',
		'mw-editbutton-lower_letter'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/5/58/Button_small.png',
		'Мелкий текст',
		'<small>',
		'</small>',
		'Мелкий текст',
		'mw-editbutton-small'
	],
	[
		'/media/minecraft-ru.gamepedia.com/0/0f/Button_vq.png',
		'Цветной текст',
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
		'Вставить отсылку',
		'<ref>',
		'</ref>',
		'Отсылка',
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
		'Файл:No image.png|Подпись1\nФайл:No image.png|Подпись2',
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