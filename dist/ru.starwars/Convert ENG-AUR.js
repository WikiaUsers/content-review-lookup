/*
конвертер с английского языка на ауребеш
КРАТКОЕ ОПИСАНИЕ:
	1) вводим анг. текст в 1е поле ввода
	2) при нажатии клавиши програма запускает цикл проверки каждого введённого символа, затем сверяет его со своим массивом символов
	3) если символ есть в массиве, находит путь к картинке на которой изображён нужный глиф ауребеша
	4) по окончании цикла во 2м поле выводятся все глифы
	5) полученный результат можно слупить в единое изображение и вывести его на экран 
------------------------------------------------------------------------------------------------
Вукипедия, 2016-2017 г.г. Свободное распространение с указанием первоисточника
*/
$(document).ready(function() 
{   
	// если на странице нет нужно блока, выходим
	if ( $("#aurebesh_converter").length == 0 ) 
	{
		return;
	}
	
	// вводимый текст
	var sEngText= '';
	// выводимый текст
	var sAurText= '';
	// контент для динамического выода на страницу (поля ввода, кнопки и пр.)
	var sKeyLine ='';
	// ассоциативный массив для хранения путей к картинкам, на которых изображены символы ауребеша
	arrGlyphs = {};
	arrGlyphs['1'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/4/44/Aur1.svg','1'] ;
	arrGlyphs['!'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/9/95/Aur_exclam.png','!']	
	arrGlyphs['2'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/e/ea/Aur2.svg','2'] ;
	arrGlyphs['3'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/f/f2/Aur3.svg','3'] ;
	arrGlyphs['4'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/3/3e/Aur4.svg','4'] ;
	arrGlyphs['$'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/9/9d/Aur_dollar.png','$'] ;
	arrGlyphs['5'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/4/45/Aur5.svg','5'] ;
	arrGlyphs['6'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/1/19/Aur6.svg','6'] ;
	arrGlyphs['7'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/7/79/Aur7.svg','7'] ;
	arrGlyphs['8'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/5/51/Aur8.svg','8'] ;
	arrGlyphs['9'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/b/b6/Aur9.svg','9'] ;
	arrGlyphs['0'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/5/51/Aur0.svg','0'] ;
	arrGlyphs['-'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/e/e0/Aur_hyphen.png','-'] ;
	arrGlyphs['backspace'] =  ['','backspace'] ;
	arrGlyphs['('] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/8/85/Aur_parenleft.png','('] ;
	arrGlyphs[')'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/6/6d/Aur_parenright.png',')'] ;
	arrGlyphs['q'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/4/47/QekArial.svg','q'] ;
	arrGlyphs['w'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/e/ed/WeskArial.svg','w'] ;
	arrGlyphs['e'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/8/8d/EskArial.svg','e'] ;
	arrGlyphs['r'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/f/fb/ReshArial.svg','r'] ;
	arrGlyphs['t'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/2/23/TrillArial.svg','t'] ;
	arrGlyphs['y'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/2/22/YirtArial.svg','y'] ;
	arrGlyphs['u'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/b/b8/UskArial.svg','u'] ;
	arrGlyphs['i'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/7/7a/IskArial.svg','i'] ;
	arrGlyphs['o'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/d/d1/OskArial.svg','o'] ;
	arrGlyphs['p'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/f/ff/PethArial.svg','p'] ;
	arrGlyphs['\n'] =  ['','\n'] ;
	arrGlyphs['a'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/7/76/AurekArial.svg','a'] ;
	arrGlyphs['s'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/d/d1/SenthArial.svg','s'] ;
	arrGlyphs['d'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/4/41/DornArial.svg','d'] ;
	arrGlyphs['f'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/b/b8/FornArial.svg','f'] ;
	arrGlyphs['g'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/d/df/GrekArial.svg','g'] ;
	arrGlyphs['h'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/7/7b/HerfArial.svg','h'] ;
	arrGlyphs['j'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/0/0f/JenthArial.svg','j'] ;
	arrGlyphs['k'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/d/d6/KrillArial.svg','k'] ;
	arrGlyphs['l'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/7/70/LethArial.svg','l'] ;
	arrGlyphs[';'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/3/30/Aur_semicolon.png',';'] ;
	arrGlyphs[':'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/5/52/Aur_colon.png',':'] ;
	arrGlyphs['apostrophe'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/3/36/Aur_quotesingle.png','\''] ;
	arrGlyphs['\''] =  arrGlyphs['apostrophe'];
	arrGlyphs['"'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/5/5d/Aur_quotedbl.png','"'] ;
	arrGlyphs['/'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/8/83/Aur_slash.png','/'] ;
	arrGlyphs['z'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/8/8f/ZerekArial.svg','z'] ;
	arrGlyphs['x'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/b/b3/XeshArial.svg','x'] ;
	arrGlyphs['c'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/a/af/CreshArial.svg','c'] ;
	arrGlyphs['v'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/4/48/VevArial.svg','v'] ;
	arrGlyphs['b'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/5/54/BeshArial.svg','b'] ;
	arrGlyphs['n'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/e/eb/NernArial.svg','n'] ;
	arrGlyphs['m'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/4/49/MernArial.svg','m'] ;
	arrGlyphs[' '] =  ['',' '] ;
	arrGlyphs[','] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/1/1d/Aur_comma.png',','] ;
	arrGlyphs['.'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/e/e2/Aur_period.png','.'] ;
	arrGlyphs['?'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/b/b2/Aur_question.png','?'] ;
	arrGlyphs['й'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/f/f4/CherekArial.svg','CH'] ;
	arrGlyphs['ц'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/d/d1/EnthArial.svg','AE'] ;
	arrGlyphs['у'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/b/be/OnithArial.svg','EO'] ;
	arrGlyphs['к'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/5/5e/KrenthArial.svg','KH'] ;
	arrGlyphs['н'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/7/7d/NenArial.svg','NG'] ;
	arrGlyphs['г'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/2/2b/OrenthArial.svg','OO'] ;
	arrGlyphs['ш'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/b/be/ShenArial.svg','SH'] ;
	arrGlyphs['щ'] =  ['https://vignette.wikia.nocookie.net/ru.starwars/images/b/b2/TheshArial.svg','TH'] ;
	sKeyLine =
	'<p class="text_Hint"><b>Текст на английском</b></p>'+
	'<textarea name="ENGtext2" id="ENGtext2" class="NewStyleMemo BlockEnglishText" onkeyup="EngText2_OnKeyup()" style="height: 100px;"></textarea>'+
	'<p class="text_Hint"><b>Текст на ауребеше</b> (максимум 340 символов)</p>'+
	'<div class="NewStyleMemo BlockEnglishText" id="div_AurebeshText2" ></div> '+
	'<div style="clear:both; "> </div>'+
	'<p id="Canv_StatusBar" class="text_Hint"></p>'+
	'<div class="AddSpaceTop">'+
		'<span class="wds-button" id="btn_ClearENG" title="Очистить текст" onclick="EngText2_Clear()">Очистить</span> <span class="wds-button" id="btn_ToggleKB" title="Показать/скрыть экранную клавиатуру" onclick="KB_Toggle()">Клавиатура</span> <span class="wds-button" id="btn_TextToImg" title="Преобразовать текст в картинку" onclick="EngText2_CopyAsPicture()">Преобразовать</span>'+
	'</div>'+
	'<div  id="div_ScreenKB" >'+
		'<table width="100%" border="0" cellpadding="0" cellspacing="0" >'+
		'<tr align="center" ><td>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs['1'][0] +')" onClick="ico_key2_OnClick(\'1\')">1</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['2'][0] +')" onClick="ico_key2_OnClick(\'2\')">2</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['3'][0] +')" onClick="ico_key2_OnClick(\'3\')">3</div>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs['4'][0] +')" onClick="ico_key2_OnClick(\'4\')">4</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['5'][0] +')" onClick="ico_key2_OnClick(\'5\')">5</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['6'][0] +')" onClick="ico_key2_OnClick(\'6\')">6</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['7'][0] +')" onClick="ico_key2_OnClick(\'7\')">7</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['8'][0] +')" onClick="ico_key2_OnClick(\'8\')">8</div>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs['9'][0] +')" onClick="ico_key2_OnClick(\'9\')">9</div>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs['0'][0] +')" onClick="ico_key2_OnClick(\'0\')">0</div>'+
		'</td></tr>'+
		'<tr align="center"><td>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['a'][0] +')" onClick="ico_key2_OnClick(\'a\')">A</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['b'][0] +')" onClick="ico_key2_OnClick(\'b\')">B</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['c'][0] +')" onClick="ico_key2_OnClick(\'c\')">C</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['d'][0] +')" onClick="ico_key2_OnClick(\'d\')">D</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['e'][0] +')" onClick="ico_key2_OnClick(\'e\')">E</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['f'][0] +')" onClick="ico_key2_OnClick(\'f\')">F</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['g'][0] +')" onClick="ico_key2_OnClick(\'g\')">G</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['h'][0] +')" onClick="ico_key2_OnClick(\'h\')">H</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['i'][0] +')" onClick="ico_key2_OnClick(\'i\')">i</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['j'][0] +')" onClick="ico_key2_OnClick(\'j\')">J</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['k'][0] +')" onClick="ico_key2_OnClick(\'k\')">K</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['l'][0] +')" onClick="ico_key2_OnClick(\'l\')">L</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['m'][0] +')" onClick="ico_key2_OnClick(\'m\')">M</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['n'][0] +')" onClick="ico_key2_OnClick(\'n\')">N</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['o'][0] +')" onClick="ico_key2_OnClick(\'o\')">o</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['p'][0] +')" onClick="ico_key2_OnClick(\'p\')">p</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['q'][0] +')" onClick="ico_key2_OnClick(\'q\')">Q</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['r'][0] +')" onClick="ico_key2_OnClick(\'r\')">R</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['s'][0] +')" onClick="ico_key2_OnClick(\'s\')">S</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['t'][0] +')" onClick="ico_key2_OnClick(\'t\')">t</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['u'][0] +')" onClick="ico_key2_OnClick(\'u\')">u</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['v'][0] +')" onClick="ico_key2_OnClick(\'v\')">V</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['w'][0] +')" onClick="ico_key2_OnClick(\'w\')">W</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['x'][0] +')" onClick="ico_key2_OnClick(\'x\')">X</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['y'][0] +')" onClick="ico_key2_OnClick(\'y\')">y</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['z'][0] +')" onClick="ico_key2_OnClick(\'z\')">Z</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['й'][0] +')" onClick="ico_key2_OnClick(\'й\')">CH</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['ц'][0] +')" onClick="ico_key2_OnClick(\'ц\')">AE</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['у'][0] +')" onClick="ico_key2_OnClick(\'у\')">EO</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['к'][0] +')" onClick="ico_key2_OnClick(\'к\')">KH</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['н'][0] +')" onClick="ico_key2_OnClick(\'н\')">NG</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['г'][0] +')" onClick="ico_key2_OnClick(\'г\')">OO</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['ш'][0] +')" onClick="ico_key2_OnClick(\'ш\')">SH</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['щ'][0] +')" onClick="ico_key2_OnClick(\'щ\')">TH</div>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs['!'][0] +')" onClick="ico_key2_OnClick(\'!\')">!</div>'+	
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs['$'][0] +')" onClick="ico_key2_OnClick(\'$\')">$</div>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs['('][0] +')" onClick="ico_key2_OnClick(\'(\')">(</div>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs[')'][0] +')" onClick="ico_key2_OnClick(\')\')">)</div>'+		
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['-'][0] +')" onClick="ico_key2_OnClick(\'-\')">-</div>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs['apostrophe'][0] +')" onClick="ico_key2_OnClick(\'apostrophe\')">\'</div>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs['"'][0] +')" onClick="ico_key2_OnClick(\'\&quot;\')">&quot;</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['/'][0] +')" onClick="ico_key2_OnClick(\'/\')">/</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs[','][0] +')" onClick="ico_key2_OnClick(\',\')">,</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['.'][0] +')" onClick="ico_key2_OnClick(\'.\')">.</div>'+
			'<div class="ico_key2" style="background-image: url('+ arrGlyphs['?'][0] +')" onClick="ico_key2_OnClick(\'?\')">?</div>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs[';'][0] +')" onClick="ico_key2_OnClick(\';\')">;</div>'+
			'<div class="ico_key2 " style="background-image: url('+ arrGlyphs[':'][0] +')" onClick="ico_key2_OnClick(\':\')">:</div>'+
		'</td></tr>'+
		'<tr align="center"><td>'+
			'<div class="ico_key2 ico_key_AddWidth" onClick="ico_key2_OnClick(\'backspace\')" >Backspace </div>'+
			'<div class="ico_key2 ico_key_AddWidth" style=" width: 120px; " onClick="ico_key2_OnClick(\' \')">Space</div>'+
			'<div class="ico_key2 ico_key_AddWidth" onClick="ico_key2_OnClick(\'\\n\')">Enter</div>'+
		'</td></tr>'+
		'<tr align="center"><td>'+
		'</td></tr>'+
		'</table>'+
	'</div>';

	// добавляем конвертер на страницу
	$("#aurebesh_converter").prepend( sKeyLine ) ;
	// добавляем на страницу окно со сгенерированныой картинкой и полупрозрачным чёрным фоном
	$('body').prepend(
		'<div id="div_BlackBG" onClick="ImageWindow_Сlose()"></div>'+
		'<div class="BlockRounded" id="div_AurPicture">'+
			'<p>Нажмите правой кнопкой по картинке и выберите пункт "Сохранить изображение..."</p>'+
			'<hr/>'+
			'<canvas id="Canv_AurText" title="Текст на ауребеше, преобразованный в картинку" ></canvas>'+
		'</div>'
	);

});

// функция очистки вводимого английского текста
function EngText2_Clear( ) 
{	
	// очистить сам текст
	$('#ENGtext2').val('');
	// удалить выведенные глифы
	$("#div_AurebeshText2 *").remove();
	// очистить строку состояния
	$("#Canv_StatusBar").text('');
}

// функция при вводе английского текста
function EngText2_OnKeyup( ) 
{
	// получаем введённый текст
	var sEngText= $('#ENGtext2').val();
	// путь к картинке с глифом
	var sGlyph 	= '';
	// выводимый текст
	var sAurText= '';
	// очистить строку состояния
	$("#Canv_StatusBar").text('');
	
	// устанавливаем максимальное кол-во вводимых символов на 340 шт
    if (sEngText.length > 340)	{
        sEngText = sEngText.substr(0, 340);
	}
	
	// буквосочетания СН, АЕ, ЕО и т.д. меняем на другие, одиночные символы		
	sEngText = sEngText.replace( /CH/g, "й" );
	sEngText = sEngText.replace( /AE/g, "ц" );
	sEngText = sEngText.replace( /EO/g, "у" );
	sEngText = sEngText.replace( /KH/g, "к" );
	sEngText = sEngText.replace( /NG/g, "н" );
	sEngText = sEngText.replace( /OO/g, "г" );
	sEngText = sEngText.replace( /SH/g, "ш" );
	sEngText = sEngText.replace( /TH/g, "щ" );
	
	// приводим введённый текст к нижнему регистру
	sEngText = sEngText.toLowerCase();

	//перебор введённого текста по каждому символу 	
	for (var i = 0; i < sEngText.length; i++) 
	{
		// если текущий символ не обнаружен в массиве , пропускаем текущий ход цикла
		if  ( sEngText[ i ] in arrGlyphs == false)
		{
			continue;
		}
		
		// добавляем пределённый контент взависимости от текущего символа		
		switch ( sEngText[ i ] )
		{
			// символ = конец строки. Добавляем  div без оптекания + span, имеющий высоту выводимого глифа
			case '\n' : 	
				sAurText= sAurText  + '<div style="clear:both; "></div><span class="ico_AurebeshGlyph" style="padding: 0 0 5px 0; margin: 0;"></span>';
			break;
			
			// символ = пробел. Добавляем  div имеющий высоту выводимого глифа и увеличенный правый отступ
			case ' ' : 	
				sAurText= sAurText  + '<div class="ico_AurebeshGlyph" style="padding: 0 13px 5px 0; "></div>';
			break;
			
			// символ = буква, цифра или знак препинания. 
			default: 
				// Находим в массиве путь к глифу
				sGlyph = arrGlyphs[ sEngText[ i ] ][0];
				// Добавляем img
				sAurText= sAurText  + '<img src="'+ sGlyph +'" class="ico_AurebeshGlyph" />';
			break;
		}	   	
	}
	
	// в конец выводимого текста добавляем  div без оптекания
	sAurText= sAurText + '<div style="clear:both; "></div> ';
	
	// удалить глифы, что были выведены до этого
	$("#div_AurebeshText2 *").remove();
	// выводим уже новые глифы
	$("#div_AurebeshText2").prepend( sAurText ) ;
}

// функция при щелчке по экранной клавиатуре
function ico_key2_OnClick( sGlyph ) 
{

	// получаем элемент, куда был введён анг. текст
	var oENGtext = $('#ENGtext2');
	// получаем в элементе текущее положение курсора
	var iPos	 = oENGtext[0].selectionStart;
	// кол-во удаляемых символов при нажатии "backspace"
	var iDelChar = 0;
	// получаем введённый текст
	var sText	 = oENGtext.val();

	// находим в массиве путей, какой символ нужно добавить к анг. тексту
	sGlyph = arrGlyphs[sGlyph] [1];
	
	// если нажат "backspace"
	if ( sGlyph === 'backspace')
	{
		// кол-во удаляемых символов = 1
		iDelChar = 1;
		// ощищаем введённый символ и НЕ выводим его на экран
		sGlyph = '';
	}
	
	// получаем текущее положение курсора существует
    if( iPos != undefined)
	{
		// разбиваем введённый текст на 2 куска и вставляем/удаляем между ними 1 символ
		// 1й кусок -- с начала строки до положения курсора
		// 2й кусок -- от положения курсора до конца строки
        oENGtext.val( sText.slice(0,  Math.max ( 0 ,iPos - iDelChar) ) + sGlyph + sText.slice(iPos ) );
	}

	// смещаем текущее положение курсора влево, иначе текст удаляться будет справа
	oENGtext[0].selectionStart= iPos - iDelChar + sGlyph.length;
	 
	// функция при вводе английского текста
	EngText2_OnKeyup( ) ;
}

// функция генерирования картинки с глифами
function EngText2_CopyAsPicture()
{
	// находим у конвертера строку состояния 
	var objCanv_StatusBar = $('#Canv_StatusBar');
	// находим все выведенные глифы
	var oCanvasSource = $("#div_AurebeshText2");
	// находим контекст рисования на холсте
	var ctx       = Canv_AurText.getContext('2d');
	// объект-рисунок, на который будут вывеведены все глифы
	var objPic       = new Image();	
	var iWidth 	= 0;
	var iHeight = 0;
	var iTop = 0;
	var iLeft = 0;
	// путь к картинке с глифом
	var sPicPath = '';

	// если текста нет вообще, генерировать картинку не нужно
	if ( $('#ENGtext2').val().length ==0 ){
		// сообщение в строке состояния
		objCanv_StatusBar.text('Поле ввода не заполнено!');
		// выходим из функции
		return;
	}
	
	// сообщение в строке состояния
	objCanv_StatusBar.text('Ожидайте, идёт преобразование текста...');
	
	// получаем габариты элемента с выведенными глифами
	iWidth 	= oCanvasSource.outerWidth();
	iHeight = oCanvasSource.outerHeight();
	
	// устанавливаем эти габарита для холста
	$("#Canv_AurText").attr({'width': iWidth, 'height': iHeight});
	// полностью ощием текст
	ctx.clearRect( 0,0 , iWidth, iHeight);
	// получаем набор из элементов в выведенными глифами
	oGlyphList = $("#div_AurebeshText2 *");

	// цикл обхода набора
	oGlyphList.each(function()
	{
		// находим положение и габариты текущего глифа
		iTop 	= $(this).position().top +5;
		iLeft 	= $(this).position().left +5;
		iHeight = $(this).height();
		iWidth 	= $(this).width();

		// находим путь к картинке с глифом
		objPic.src =  $(this).attr('src');
		// выводим текущий глиф на холсте в определённых координатах
		ctx.drawImage( objPic, iLeft , iTop, iWidth, iHeight );
	});
	
	// сообщение в строке состояния
	objCanv_StatusBar.text('Готово! ');
		
	// показываем тёмный фон
	$( '#div_BlackBG' ).fadeIn('fast');
	
	// находим середину экрана и отступаем на 100px выше
	iTop 	= Math.max( 0, screen.height / 2 - $('#div_AurPicture').height()  /2 - 100);
	iLeft 	= screen.width / 2 - $('#div_AurPicture').width() /2  ;
	
	// перемещаем окно  в середину экрана
	$( '#div_AurPicture' ).css('top', iTop ).css('left', iLeft );
	// показываем окно со сгенерырованной картинкой с глифами
	$( '#div_AurPicture' ).fadeIn('fast');
}

// функция вкл/выкл. экранную клавиатуру
function KB_Toggle()
{
	$('#div_ScreenKB').toggle();
}

// скрыть окно  со сгенерырованной картинкой 
function ImageWindow_Сlose(  )
{
	// скрыть темный фон
	$( '#div_BlackBG' ).fadeOut('fast');
	// скрыть окно
	$( '#div_AurPicture' ).fadeOut('fast');
	// очистить строку состояния
	$("#Canv_StatusBar").text('');
}