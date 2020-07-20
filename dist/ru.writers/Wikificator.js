// '''ВНИМАНИЕ! Внося изменения в код, не забывайте обновлять справку на странице [[RW:Викификатор]]''' 

/* <source lang="JavaScript"> */ 
var t = new Array();
t['wikify'] = new Array("{"+"{wikify", "", "}}");
t['stub'] = new Array("{"+"{stub", "", "}}");
t['delete'] = new Array("{"+"{Db|", "причина", "}}");
t['vfd'] = new Array("{"+"{vfd", "", "}}");
t['bio-info'] = new Array("{"+"{Персона|\n  ФИО= \n| портрет= dot.png\n| описание= \n| ФИО-оригинал= \n| дата рождения=[[]] [[]] \n| место рождения=[[]], [[]] \n| дата смерти=[[]] [[]] \n| место смерти=[[]], [[]]\n", "", "}}");
t['film-info'] = new Array("{"+"{Фильм"+
"\n| RusTitle   = "+
"\n| OrigTitle  = "+
"\n| Image      = [[Изображение:|200px]]"+
"\n| Genre      = [[]]"+
"\n| Dir        = [[|]]"+
"\n| Producer   = [[|]]"+
"\n| Script     = [[|]]"+
"\n| Actors     = [[|]]<br />[[|]]<br />[[|]]<br />[[|]]"+
"\n| Music      = [[|]]"+
"\n| Cameraman  = [[|]]"+
"\n| Prod       = [[]]"+
"\n| Budget     = 000 млн. $"+
"\n| Country    = [[]]"+
"\n| Time       = 00 мин."+
"\n| Year       = [[0000]]"+
"\n| imdb_id    = 0000000"+
"\n", "", "}}");

if (window.event){
  document.onkeypress = pressed;
}

function pressed() //Вызов по Ctrl+Enter (в MSIE)
{key = window.event.keyCode;if (key==10){obrabotka();}}
//======================================
function obrabotka()
{
check_regexp() //Проверяем, поддерживаются ли рег. выражения
document.editform.wpTextbox1.focus()
var txtarea = document.editform.wpTextbox1
if(document.selection  && !is_gecko)/* IE */ {
	txt = " "+document.selection.createRange().text
	if (txt == " ")	{all_text();} //Если ничего не выделено
	else{
		zamena()
		txt = txt.substr (1, txt.length-1)
		document.selection.createRange().text = txt
		}
	}
else if((txtarea.selectionStart || txtarea.selectionStart == '0')&&(navigator.productSub>20031000)) /*Gecko-браузеры старше 10.2003*/ {
 		var startPos = txtarea.selectionStart
		var endPos = txtarea.selectionEnd
		var scrollTop=txtarea.scrollTop
		txt = " "+(txtarea.value).substring(startPos, endPos)
		if (txt == " ")	{all_text();} //Если ничего не выделено
		else{
			zamena()
			txt = txt.substr (1, txt.length-1)
			txtarea.value = txtarea.value.substring(0, startPos) + txt + txtarea.value.substring(endPos, txtarea.value.length)
			txtarea.focus()
			}
		}
else{if (confirm("Викификатор обработает ВЕСЬ текст статьи. Продолжить?")){all_text();}} //Прочие браузеры
}
//======================================
function all_text()//Обрабатываем текст целиком
{
txt = " "+document.editform.wpTextbox1.value
zamena()
txt = txt.substr (1, txt.length-1)
document.editform.wpTextbox1.value=txt
}
//======================================
function check_regexp()//Проверяем поддерживаются ли рег. выражения
{
var reg1 = "код"
reg1 = reg1.replace(/д/g, "т")
if (reg1 != "кот"){alert("Wikificator cannot work in your browser");exit;}
b_ver = navigator.appVersion.substr (0, 1)
if (navigator.appName=="Netscape"&&b_ver<5){alert("Wikificator will not work in Netscape 4.x and less");exit;}
return
}
function zamena()
// Для исключений у нас остались ещё 3 безопасные пары символов в диапазоне \x1A — \x1F !
{
//Исключаем из обработки всё, что находится между тегами <nowiki> и </nowiki>
i_nowiki = 0
a_nowiki = txt.match(/\<nowiki\>(.|\r|\n)+?\<\/nowiki\>/gm)
r_nowiki = /\<nowiki\>(.|\r|\n)+?\<\/nowiki\>/m
while (r_nowiki.test(txt))
{
  i_nowiki++;
  txt = txt.replace(r_nowiki, "\x03"+i_nowiki+"\x04")
}
//======================================
//Исключаем из обработки всё, что находится между тегами &lt;math&gt; и &lt;/math&gt;
i_math = 0
a_math = txt.match(/\<math\>(.|\r|\n)+?\<\/math\>/gm)
r_math = /\<math\>(.|\r|\n)+?\<\/math\>/m
while (r_math.test(txt))
{
  i_math++;
  txt = txt.replace(r_math, "\x05"+i_math+"\x06")
}
//======================================
// Исключаем всё между &lt;pre&gt; и &lt;/pre&lt;
i_pre = 0
a_pre = txt.match(/<pre>(.|\r|\n)+?<\/pre>/gim)
r_pre = /<pre>(.|\r|\n)+?<\/pre>/im
while (r_pre.test(txt))
{
  i_pre++
  txt = txt.replace(r_pre, "\x12"+i_pre+"\x13")
}
//======================================
// Исключаем всё между <gallery> и </gallery>
i_gallery = 0
a_gallery = txt.match(/<gallery>(.|\r|\n)+?<\/gallery>/gim)
r_gallery = /<gallery>(.|\r|\n)+?<\/gallery>/im
while (r_gallery.test(txt))
{
  i_gallery++
  txt = txt.replace(r_gallery, "\x14"+i_gallery+"\x15")
}
//======================================
//Исключаем из обработки строки, начинающиеся с пробела
f_space = txt.substr (0, 1)
txt = txt.substr (1, txt.length-1)
i_space = 0
a_space = txt.match(/^( )(.+)$/gm)
r_space = /^( )(.+)$/m;
while (r_space.test(txt))
{
  i_space++
  txt = txt.replace(r_space, "\x16"+i_space+"\x17")
}
txt = f_space + txt
//======================================
//Исключаем всё между {{ и }}
i_template = 0
a_template = txt.match(/\{\{(.|\r|\n)+?\}\}/gm)
r_template = /\{\{(.|\r|\n)+?\}\}/m
while (r_template.test(txt))
{
  i_template++
  txt = txt.replace(r_template, "\x18"+i_template+"\x19")
}
//======================================
// Заменяем теги <b>, <strong> на ''' и <i>, <em> на ''
txt = txt.replace(/\<\/?(b|strong)\>/gim, "\'\'\'")
txt = txt.replace(/\<\/?(i|em)\>/gim, "\'\'")
// Заменяем тег <hr> на ----, поправляем теги <hr> и <br>
txt = txt.replace(/\<hr ?\/?\>/gi, "----")
txt = txt.replace(/\<hr ([^\>\/]+?) ?\/?\>/gi, "<hr $1 />")
txt = txt.replace(/\<br\/?\>/gi, "<br />")
txt = txt.replace(/\<br ([^\>\/]+?) ?\/?\>/gi, "<br $1 />")
//======================================
//Кубы и квадраты одним символом
txt = txt.replace(/(<sup>2<\/sup>|&sup2;)/g, "²");
txt = txt.replace(/(<sup>3<\/sup>|&sup3;)/g, "³");
txt = txt.replace(/(\^2)(\D)/g, "²$2");
txt = txt.replace(/(\^3)(\D)/g, "³$2");
//======================================
// Поправляем диапазоны годов
txt = txt.replace(/(\(|\s)(\[?\[?[12]?\d{3}\]?\]?)[\u00A0 ]?(-|--|–|—) ?(\[?\[?[12]?\d{3}\]?\]?)(\W)/g, "$1$2—$4$5")
txt = txt.replace(/(\[?\[?[12]?\d{3}\]?\]?) ?(г\.|гг\.)/g, "$1\u00A0$2")
// Поправляем диапазоны веков
txt = txt.replace(/(\(|\s)(\[?\[?[IVX]{1,5}\]?\]?)[\u00A0 ]?(-|--|–|—) ?(\[?\[?[IVX]{1,5}\]?\]?)(\W)/g, "$1$2—$4$5")
txt = txt.replace(/(\[?\[?[IVX]{1,5}\]?\]?) ?(в\.|вв\.)/g, "$1\u00A0$2")
//======================================
//Обработка служебных слов
txt = txt.replace(/(\[\[)(:?)(category|категория)(:)( *)/gi, "$1$2Категория$4")
txt = txt.replace(/(\[\[)(template|шаблон)(:)( *)/gi, "$1Шаблон$3")
txt = txt.replace(/(\[\[)(user|участник)(:)( *)/gi, "$1Участник$3")
txt = txt.replace(/(\[\[)(image|изображение)(:)( *)/gi, "$1Изображение$3")
txt = txt.replace(/(\[\[)(media|медиа)(:)( *)/gi, "$1Медиа$3")
//======================================
//Меняем двойной дефис на тире
txt = txt.replace(/(--)(\[\[Участник|\~\~\~)/g, "—$2")
//Исключаем всё между [[ и ]], или между [[ и |
i_links = 0
a_links = txt.match(/(\[\[)(.*?)(\||\]\])/g)
r_links = /(\[\[)(.*?)(\||\]\])/
while (r_links.test(txt))
{
  i_links++
  txt = txt.replace(r_links, "\x10"+i_links+"\x11")
}
//======================================
//Вставка пробела в заголовки
txt = txt.replace(/^(=+)([ \t\f\v]*)(.*?)([ \t\f\v]*)(=+)$/gm, "$1 $3 $1")
//Исключаем из обработки весь текст в кавычках после знака "="
i_equal = 0
a_equal = txt.match(/(=)(\s?)(\")(.*?)(\")/g)
r_equal = /(=)(\s?)(\")(.*?)(\")/
while (r_equal.test(txt))
{
  i_equal++
  txt = txt.replace(r_equal, "\x0E"+i_equal+"\x0F")
}
//======================================
//Заменяем обычными кавычками сочетания << и >>
txt = txt.replace(/(<<)(\S.+\S)(>>)/g, "\"$2\"")
//======================================
//Исключаем из обработки прочие HTML-теги ("<" и ">")
i = 0
a = txt.match(/<([^>]*?)>/gm)
r = /<([^>]*?)>/m
while (r.test(txt))
{
  i++
  txt = txt.replace(r, "\x01"+i+"\x02")
}
//======================================
//Заменяем правильные символы на неверные, чтобы ничего не пропустить
txt = txt.replace(/–/g, "-")
txt = txt.replace(/(«|»|“|”|„|\&((la|ra|bd|ld)quo|#132|#147|#148|quot);)/g, "\"")
//======================================
// Обработчик знака градуса "°", "+-" и "~="
txt = txt.replace(/(\+[--])|(&plusmn;)/g, "±")
txt = txt.replace(/(~=)/g, "≈")
txt = txt.replace(/\&deg;/g, "°")
txt = txt.replace(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])[CС])(?=[ "').,;!?|]|$)/gm, "$1$2\u00A0°C")
txt = txt.replace(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])F)(?=[ "').,;|!?]|$)/gm, "$1$2\u00A0°F")
//======================================
// Заменяем "...", "&hellip;" и "&#133;" на многоточие
txt = txt.replace(/(\.{3}|\&(hellip|#133);)/g, '…')
// Обработчик апострофа
txt = txt.replace(/([\wа-яА-ЯёЁ])'([\wа-яА-ЯёЁ])/g, "$1’$2")
// Обработчик минуса
txt = txt.replace(/(sup\>|sub\>|\s)-(\d)/g, "$1−$2")
//======================================
// Заменяем дефисы и короткое тире на правильное тире
txt = txt.replace(/\&(#151|[nm]dash);/g, "—")
txt = txt.replace(/(&nbsp;|[\f\n\r\t\v\u00A0\u2028\u2029])(-|--|–) /g, "$1— ")
txt = txt.replace(/(\d)--(\d)/g, "$1—$2")
// Вставляем неразрывный пробел перед тире
txt = txt.replace(/(\S) (-|--|–|—) (\S)/g, "$1\u00A0— $3")
//======================================
// Спец-значки ©, ®, ™, §, €, ¥ и £.
txt = txt.replace(/\&copy;/gi, "©")
txt = txt.replace(/(\(r\)|\&reg;)/gi, "®")
txt = txt.replace(/(\((tm|тм)\)|\&trade;)/gi, "™")
txt = txt.replace(/(\(p\)|\&sect;)/gi, "§")
txt = txt.replace (/\&euro;/gi, "€")
txt = txt.replace (/\&yen;/gi, "¥")
txt = txt.replace (/\&pound;/gi, "£")
//======================================
// Поправляем сокращения
txt = txt.replace(/(Т|т)\. ?е\./g, "$1о есть")
txt = txt.replace(/(Т|т)\. ?к\./g, "$1ак как")
txt = txt.replace(/(В|в) т\. ?ч\./g, "$1 том числе")
txt = txt.replace(/и т\. ?д\./g, "и\u00A0т\.\u00A0д\.")
txt = txt.replace(/и т\. ?п\./g, "и\u00A0т\.\u00A0п\.")
txt = txt.replace(/(Т|т)\. ?н\./g, "$1\.\u00A0н\.")
txt = txt.replace(/н\. ?э\./g, "н\.\u00A0э\.")
txt = txt.replace(/(Д|д)(о|\.) н\. ?э\./g, "$1о\u00A0н\.\u00A0э\.")
txt = txt.replace(/(\d) (тыс)([^\.А-Яа-яЁё])/g, "$1\u00A0$2.$3")
txt = txt.replace(/(\d) (млн|млрд|трлн)([^А-Яа-яЁё])/g, "$1\u00A0$2$3")
// Вставляем пропущенные и убираем лишние пробелы
txt = txt.replace(/([А-Я]\.) ?([А-Я]\.) ?([А-Я][а-я])/g, "$1\u00A0$2\u00A0$3")
txt = txt.replace(/([А-Я]\.)([А-Я]\.)/g, "$1 $2")
txt = txt.replace(/^([#\*:]+)([ \t\f\v]*)([^ \t\f\v\*#:])/gm, "$1 $3")
txt = txt.replace(/([а-я])(\.)([А-ЯA-Z])/g, "$1$2 $3")
txt = txt.replace(/([а-яa-z\)\»\“\"\]])(\s*)(\,)([а-яa-z\(\«\„\"\[])/g, "$1$3 $4")
txt = txt.replace(/([а-яa-z\)\»\“\"\]])(\s)([\,\;])(\s)([а-яa-z\(\«\„\"\[])/g, "$1$3 $5")
txt = txt.replace(/([^%\/\w]\d+?(?:[.,]\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])/g, "$1\u00A0$2")
txt = txt.replace(/(\d) ([%‰])(?=-[А-Яа-яЁё])/g, "$1$2")
txt = txt.replace(/([№§])(\s*)(\d)/g, "$1\u00A0$3")
txt = txt.replace(/(^|[^ \t])([ \t]+)($|\n)/gm, "$1$3")
txt = txt.replace(/(\()( +)/g, "$1");
txt = txt.replace(/( +)(\))/g, "$2");
//======================================
//Убираем двойные пробелы
txt = txt.substr (1, txt.length-1);
txt = txt.replace(/(\S)([ \t]{2,})([\S\r])/g, "$1 $3")
txt = " " + txt
//======================================
// Заменяем кавычки (") на кавычки-ёлочки
txt = txt.replace(/([\x01-(\s\|\"]|\/|\+)(\")([^\"]{0,})([^\s\"(])(\")/g, "$1«\$3\$4»")
// Кавычки внутри кавычек
if (/"/.test(txt))
{
  txt = txt.replace(/([\x01(\s\"])(\")([^\"]{0,})([^\s\"(])(\")/g, "\$1«\$3\$4»")
  while (/(«)([^»]*)(«)/.test(txt))
    txt = txt.replace(/(«)([^»]*)(«)([^»]*)(»)/g, "\$1\$2„\$4“")
}
//======================================
//Возвращаем обратно HTML-теги ("<" и ">")
i = 0
r = /\x01([0-9]*)\x02/
while (r.test(txt))
{
  i++
  txt = txt.replace(r, a[i-1])
}
//======================================
//Возвращаем обратно текст в кавычках после знака "="
i_equal = 0;
r_equal = /\x0E([0-9]*)\x0F/
while (r_equal.test(txt))
{
  i_equal++
  txt = txt.replace(r_equal, a_equal[i_equal-1])
}
//======================================
//Возвращаем обратно текст между [[ и ]]
i_links = 0
r_links = /\x10([0-9]*)\x11/
while (r_links.test(txt))
{
  i_links++
  txt = txt.replace(r_links, a_links[i_links-1])
}
//======================================
//Возвращаем обратно текст между {{ и }}
i_template = 0
r_template = /\x18([0-9]*)\x19/
while (r_template.test(txt))
{
  i_template++
  txt = txt.replace(r_template, a_template[i_template-1])
}
//======================================
//Возвращаем обратно строки, начинающиеся с пробела.
i_space = 0
r_space = /\x16([0-9]*)\x17/
while (r_space.test(txt))
{
  i_space++
  txt = txt.replace(r_space, a_space[i_space-1])
}
//======================================
//Возвращаем обратно текст между <gallery> и </gallery>
i_gallery = 0
r_gallery = /\x14([0-9]*)\x15/
while (r_gallery.test(txt))
{
  i_gallery++
  txt = txt.replace(r_gallery, a_gallery[i_gallery-1])
}
//======================================
//Возвращаем обратно текст между &lt;pre&gt; и &lt;/pre&gt;
i_pre = 0
r_pre = /\x12([0-9]*)\x13/
while (r_pre.test(txt))
{
  i_pre++
  txt = txt.replace(r_pre, a_pre[i_pre-1])
}
//======================================
//Возвращаем обратно всё, что было между тегами "math".
i_math = 0;
r_math = /\x05([0-9]*)\x06/
while (r_math.test(txt))
{
  i_math++
  txt = txt.replace(r_math, a_math[i_math-1])
}
//======================================
//Возвращаем обратно всё, что было между тегами "nowiki".
i_nowiki = 0;
r_nowiki = /\x03([0-9]*)\x04/
while (r_nowiki.test(txt))
{
  i_nowiki++
  txt = txt.replace(r_nowiki, a_nowiki[i_nowiki-1])
}
}

 function addWkikifPanel() {
   var wf='<tt><a href="/wiki/Википедия:Специальные_символы" target="_blank">Спецсимволы</a>:<span id="my-buttons"><small><A href="javascript:insertTags(\'́\',\'\',\'\');" style="text-decoration: none;color:#000" title="Ударение">\'</a> <A href="javascript:insertTags(\'α\',\'\',\'\');" style="text-decoration: none;color:#000" title="Альфа">&alpha;</a> <A href="javascript:insertTags(\'β\',\'\',\'\');" style="text-decoration: none;color:#000" title="Бета">&beta;</a> <A href="javascript:insertTags(\'γ\',\'\',\'\');" style="text-decoration: none;color:#000" title="Гамма">&gamma;</a> <A href="javascript:insertTags(\'δ\',\'\',\'\');" style="text-decoration: none;color:#000" title="Дельта">&delta;</a> <A href="javascript:insertTags(\'—\',\'\',\'\');" style="text-decoration: none;color:#000" title="Тире">&mdash;</a> <A href="javascript:insertTags(\'\«\',\'\»\',\'\');" style="text-decoration: none;color:#000" title="Выделите текст и щёлкните, чтобы поставить кавычки-ёлочки">«»</a> <A href="javascript:insertTags(\'…\',\'\',\'\');" style="text-decoration: none;color:#000" title="Многоточие">&hellip;</a> <A href="javascript:insertTags(\'°\',\'\',\'\');" style="text-decoration: none;color:#000" title="Знак градуса">&deg;</a> <A href="javascript:insertTags(\'€\',\'\',\'\');" style="text-decoration: none;color:#000" title="Знак евро">&euro;</a> <A href="javascript:insertTags(\'\&amp;nbsp\;\',\'\',\'\');" style="text-decoration: none;color:#000" title="Неразрывный пробел">&amp;nbsp;</a> <A href="javascript:insertTags(\'\<sub\>\',\'\<\/sub\>\',\'Подстрочный текст\');" style="text-decoration: none;color:#000" title="Выделите текст и щёлкните, чтобы перевести его в подстрочный">X<sub>2</sub></a> <A href="javascript:insertTags(\'\<sup\>\',\'\<\/sup\>\',\'Надстрочный текст\');" style="text-decoration: none;color:#000" title="Выделите текст и щёлкните, чтобы перевести его в надстрочный">X<sup>2</sup></a> <A href="javascript:insertTags(\'\[\[Категория\:\',\'\]\]\',\'\');" style="text-decoration: none;color:#000" title="Категория">Категория</a> <A href="javascript:insertTags(\'\[\[\|\',\'\]\]\',\'\');" style="text-decoration: none;color:#000" title="Ссылка с описанием">[[|]]</a> <A href="javascript:insertTags(\'{{\',\'}}\',\'Шаблон\');" style="text-decoration: none;color:#000" title="Шаблон">{{}}</a> <A href="javascript:insertTags(\'#REDIRECT \[\[\',\'\]\]\',\'Ссылка\');" style="text-decoration: none;color:#000" title="Перенаправление">→</a> </small> <a href="javascript:obrabotka();" style="text-decoration: none;color:#000" title="Викифицировать!" accesskey="w">Викификатор</a></span>[<a href="/wiki/Википедия:Викификатор" target="_blank" title="Справка по Викификатору">?</a>]</tt>';

   var d = document;
   if (d.getElementById('wpSummaryLabel')) {
     var wps = d.getElementById('wpSummaryLabel').getElementsByTagName('span')[0];
     if (wps) {
       wps.innerHTML=wf+wps.innerHTML;
     } 
   } 

    oldSel = document.getElementById('specialchars');
    if (oldSel) oldSel.innerHTML = '';
 }

// Вставляет стаб, выбранный из списка
function insertStub(obj) {
  var id = obj.options[obj.selectedIndex].value; 
  if (id != '0') insertTags(t[id][0], t[id][2], t[id][1]); 
  obj.selectedIndex=0;
}

  addLoadEvent(addWkikifPanel);

/* </source> */