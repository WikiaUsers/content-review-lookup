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
		'<br>'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png',
		'Перенаправление',
		'#перенаправление [[',
		']]',
		'Название страницы для перенаправления'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png',
		'Надстрочный текст',
		'<sup>',
		'</sup>',
		'Надстрочный текст'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png',
		'Подстрочный текст',
		'<sub>',
		'</sub>',
		'Подстрочный текст'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/5/58/Button_small.png',
		'Мелкий текст',
		'<small>',
		'</small>',
		'Мелкий текст'
	],
	[
		'//hydra-images.cursecdn.com/minecraft-ru.gamepedia.com/0/0f/Button_vq.png',
		'Цветной текст',
		'{{цвет|*Цвет текста*|',
		'}}',
		'Текст'
	],
	[
		'//upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png',
		'Вставить скрытый комментарий',
		'<!-- ',
		' -->',
		'Комментарий'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
		'Вставить примечание',
		'<ref>',
		'</ref>',
		'Примечание'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/2/23/Button_code.png',
		'Вставить код',
		'<code>',
		'</code>'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
		'Вставить галерею изображений',
		'\n<gallery>\n',
		'\n</gallery>',
		'Файл:No block image.png|Подпись1\nФайл:No block image.png|Подпись2'
	],
	[
		'//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
		'Вставить таблицу',
		'{| class="wikitable"\n!',
		'\n|}',
		' заголовок\n|-\n| ячейка'
	],
	[
		'//hydra-media.cursecdn.com/minecraft-ru.gamepedia.com/3/3a/Button_crafting.png',
		'Вставить сетку крафта',
		'{{Сетка/Крафт\n|A1= |B1= |C1=\n|A2= |B2= |C2=\n|A3= |B3= |C3=\n|Выход= |ВК=\n}}'
	],
	[
		'//hydra-media.cursecdn.com/minecraft-ru.gamepedia.com/e/e7/Button_smelting.png',
		'Вставить сетку печки',
		'{{Сетка/Печка\n|Ресурс= |РК=\n|Выход= |ВК=\n|Топливо= |ТК=\n}}',
	],
	[
		'//hydra-media.cursecdn.com/minecraft-ru.gamepedia.com/3/30/Button_brewing.png',
		'Вставить сетку зельеварения',
		'{{Сетка/Варка\n|Ресурс=\n|Выход1=\n|Выход2=\n|Выход3=\n}}'
	]
];
$.each( buttons, function() { mw.toolbar.addButton.apply( null, this ); } );

} )();