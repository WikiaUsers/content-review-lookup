//<source lang=javascript>

var t = new Array();
t['wikify'] = new Array("{"+"{wikify", "", "}}");
t['stub'] = new Array("{"+"{stub", "", "}}");
t['delete'] = new Array("{"+"{d|причина", "", "}}");
t['vfd'] = new Array("{"+"{vfd|дата", "", "}}");
t['bio-info'] = new Array("{"+"{Персона|\n  ФИО= \n| портрет= dot.png\n| описание= \n| ФИО-оригинал= \n| дата рождения=[[]] [[]] \n| место рождения=[[]], [[]] \n| дата смерти=[[]] [[]] \n| место смерти=[[]], [[]]\n", "", "}}");
t['film-info'] = new Array("{"+"{Фильм"+
"\n| РусНаз      = "+
"\n| ОригНаз     = "+
"\n| Изображение = .jpg"+
"\n| Жанр        = [[]]"+
"\n| Режиссёр    = [[|]]"+
"\n| Продюсер    = [[|]]"+
"\n| Сценарист   = [[|]]"+
"\n| Актёры      = [[|]]<br />[[|]]<br />[[|]]<br />[[|]]"+
"\n| Оператор    = [[|]]"+
"\n| Композитор  = [[|]]"+
"\n| Компания    = [[]]"+
"\n| Бюджет      = 00 млн [[доллар США|$]]"+
"\n| Страна      = [[]]"+
"\n| Время       = 00 мин."+
"\n| Год         = [[0000 год в кино|0000]]"+
"\n| imdb_id     = 0000000"+
"\n", "", "}}");
t['disambig'] = new Array("{"+"{disambig", "", "}}");
t['no iwiki'] = new Array("{"+"{no iwiki", "", "}}");
t['no pics'] = new Array("{"+"{нет иллюстраций", "", "}}");
t['no source'] = new Array("{"+"{нет источника", "", "}}");

 function addWkikifPanel() {
   var wf='<tt><a href="/wiki/Википедия:Специальные_символы" target="_blank">Спецсимволы</a>:<span id="my-buttons"><small><A href="javascript:insertTags(\'́\',\'\',\'\');" style="text-decoration: none;color:#000" title="Ударение">\'</a> <A href="javascript:insertTags(\'α\',\'\',\'\');" style="text-decoration: none;color:#000" title="Альфа">&alpha;</a> <A href="javascript:insertTags(\'β\',\'\',\'\');" style="text-decoration: none;color:#000" title="Бета">&beta;</a> <A href="javascript:insertTags(\'γ\',\'\',\'\');" style="text-decoration: none;color:#000" title="Гамма">&gamma;</a> <A href="javascript:insertTags(\'δ\',\'\',\'\');" style="text-decoration: none;color:#000" title="Дельта">&delta;</a> <A href="javascript:insertTags(\'—\',\'\',\'\');" style="text-decoration: none;color:#000" title="Тире">&mdash;</a> <A href="javascript:insertTags(\'\«\',\'\»\',\'\');" style="text-decoration: none;color:#000" title="Выделите текст и щёлкните, чтобы поставить кавычки-ёлочки">«»</a> <A href="javascript:insertTags(\'…\',\'\',\'\');" style="text-decoration: none;color:#000" title="Многоточие">&hellip;</a> <A href="javascript:insertTags(\'°\',\'\',\'\');" style="text-decoration: none;color:#000" title="Знак градуса">&deg;</a> <A href="javascript:insertTags(\'€\',\'\',\'\');" style="text-decoration: none;color:#000" title="Знак евро">&euro;</a> <A href="javascript:insertTags(\'\&amp;nbsp\;\',\'\',\'\');" style="text-decoration: none;color:#000" title="Неразрывный пробел">&amp;nbsp;</a> <A href="javascript:insertTags(\'\<sub\>\',\'\<\/sub\>\',\'Подстрочный текст\');" style="text-decoration: none;color:#000" title="Выделите текст и щёлкните, чтобы перевести его в подстрочный">X<sub>2</sub></a> <A href="javascript:insertTags(\'\<sup\>\',\'\<\/sup\>\',\'Надстрочный текст\');" style="text-decoration: none;color:#000" title="Выделите текст и щёлкните, чтобы перевести его в надстрочный">X<sup>2</sup></a> <A href="javascript:insertTags(\'\[\[Категория\:\',\'\]\]\',\'\');" style="text-decoration: none;color:#000" title="Категория">Категория</a> <A href="javascript:insertTags(\'\[\[\|\',\'\]\]\',\'\');" style="text-decoration: none;color:#000" title="Ссылка с описанием">[[|]]</a> <A href="javascript:insertTags(\'{{\',\'}}\',\'Шаблон\');" style="text-decoration: none;color:#000" title="Шаблон">{{}}</a> <A href="javascript:insertTags(\'#REDIRECT \[\[\',\'\]\]\',\'Ссылка\');" style="text-decoration: none;color:#000" title="Перенаправление">→</a> </small> <a href="javascript:Wikify();" style="text-decoration: none;color:#000" title="Викифицировать!" accesskey="w">Викификатор</a></span>[<a href="/wiki/Википедия:Викификатор" target="_blank" title="Справка по Викификатору">?</a>]</tt><select id="template-selector" name="template-selector" onchange="insertStub(this);"><option value="0">Вставка шаблона…</option>  <option value="wikify">Викифицировать</option>  <option value="stub">Заготовка</option>  <option value="delete">Быстрое удаление</option>  <option value="vfd">К удалению</option>  <option value="bio-info">Персона</option>  <option value="film-info">Фильм</option> <option value="disambig">Disambig</option> <option value="no iwiki">Нет интервики</option> <option value="no pics">Нет иллюстраций</option> <option value="no source">Нет источника</option> </select><br/>';

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

  addOnloadHook(addWkikifPanel);

//</source>