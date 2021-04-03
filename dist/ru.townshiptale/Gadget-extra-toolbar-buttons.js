/** 
 * Extra classic toolbar options
 *
 * Description: Adds extra buttons to the classic editing toolbar.
 * Due to the way this works, it has to be loaded before the
 * toolbar loads (so it can't be in the onload function).
 *  
 * Maintainers: [[wikipedia:User:MarkS]], [[wikipedia:User:Voice of All]], [[wikipedia:User:R. Koot]]
 */
( function() {

var buttons = [
	[
		'//upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png',
		'Следующая строка',
		'<br>',
		'',
		'',
		'mw-editbutton-string'

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
		'Вставить примечание',
		'<ref>',
		'</ref>',
		'Примечание',
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
	],
	[
		'/media/minecraft-ru.gamepedia.com/3/3a/Button_crafting.png',
		'Вставить сетку крафта',
		'{'+'{Крафт\n|A1= |B1= |C1=\n|A2= |B2= |C2=\n|A3= |B3= |C3=\n|Выход=\n|показатьимя=1\n}}',
		'',
		'',
		'mw-editbutton-crafting'
	],
	[
		'/media/minecraft-ru.gamepedia.com/e/e7/Button_smelting.png',
		'Вставить сетку печки',
		'{'+'{Обжиг\n|\n|\n|Топливо=\n|показатьимя=1\n}}',
		'',
		'',
		'mw-editbutton-smelting'
	],
	[
		'/media/minecraft-ru.gamepedia.com/3/30/Button_brewing.png',
		'Вставить сетку зельеварения',
		'{'+'{Варка\n|\n|Ресурс=\n|Выход1=\n|Выход2=\n|Выход3=\n|показатьимя=1\n}}',
		'',
		'',
		'mw-editbutton-brewing'
	]
];
$.each( buttons, function() { mw.toolbar.addButton.apply( null, this ); } );

} )();