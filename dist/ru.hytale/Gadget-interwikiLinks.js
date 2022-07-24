// Автор Equazcion: https://terraria.gamepedia.com/User:Equazcion
// Перевод Alex Great: https://terraria-ru.gamepedia.com/User:Alex_Great
// Доработка Ivan-r: https://minecraft-ru.gamepedia.com/User:Ivan-r

mw.util.addCSS(
	'.uTrans:hover { text-decoration:none; }' +
	'#p-lang ul' +
	'#p-lang li.interlanguage-link { font-family: inherit; }' +
	'.uTrans { ' +
		'display: none; ' +
		'cursor: pointer; ' +
		'color: #D3DEE9; ' +
		'background-color: transparent;' +
		'border-radius: 7px; ' +
		'padding: 0 3px; ' +
		'margin-left: 5px; ' +
		'transition:' +
			'margin-left .3s ease-out, ' +
			'background-color .16s ease-out, ' +
			'color .16s ease-out; ' +
	'} '
);

var plang = $('#p-lang').hide();


function sort( a, b ) {
	return ( $(b).text() ) < ( $(a).text() ) ? 1 : -1;
}
var plangUL = plang.find('ul');
var interwikis = plangUL.find('li[class^="interlanguage-link"]').detach();
if ( interwikis.length > 0 ) {
	var hardLangs = {
		'中文':'Китайский',
		'Français':'Французский',
		'한국어':'Корейский',
		'Polski':'Польский',
		'Português':'Португальский',
		'Português do Brasil':'Португальский бразильский',
		'English':'Английский',
		'日本語':'Японский',
		'Deutsch':'Немецкий',
		'Español':'Испанский',
		'Magyar':'Венгерский',
		'Italiano':'Итальянский',
		'Ελληνικά':'Греческий',
		'Türkçe':'Турецкий',
		'Čeština':'Чешский',
		'ไทย':'Тайский',
		'Nederlands':'Нидерландский',
		'Українська':'Украинский'
	};
	});
	plangUL.prepend( interwikis.sort(sort) );
}
plang.show();