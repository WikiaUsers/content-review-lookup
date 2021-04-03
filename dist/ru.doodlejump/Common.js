/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
 
/* deprecated */
var	hasClass = function(e, c) { return $(e).hasClass(c); },
	import_script = importScript;
 
importScript("MediaWiki:Navigation.js");		// collapsible tables and dynamic navigation
 
 
//Collapsiblе: 
 
var NavigationBarShowDefault = 2
var NavigationBarHide = '▲';
var NavigationBarShow = '▼';
 
 
var hasClass = (function (){
 var reCache = {}
 return function (element, className){
   return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className)
  }
})()
 
function collapsibleTables(){
 var Table, HRow,  HCell, btn, a, tblIdx = 0, colTables = []
 var allTables = document.getElementsByTagName('table')
 for (var i=0; Table = allTables[i]; i++){
   if (!hasClass(Table, 'collapsible')) continue
   if (!(HRow=Table.rows[0])) continue
   if (!(HCell=HRow.getElementsByTagName('th')[0])) continue
   Table.id = 'collapsibleTable' + tblIdx
   btn = document.createElement('span')
   btn.style.cssText = 'float:right; font-weight:normal; font-size:smaller'
   a = document.createElement('a')
   a.id = 'collapseButton' + tblIdx
   a.href = 'javascript:collapseTable(' + tblIdx + ');' 
   a.style.color = HCell.style.color
   a.appendChild(document.createTextNode(NavigationBarHide))
   btn.appendChild(a)
   HCell.insertBefore(btn, HCell.childNodes[0])
   colTables[tblIdx++] = Table
 }
 for (var i=0; i < tblIdx; i++)
   if ((tblIdx > NavigationBarShowDefault && hasClass(colTables[i], 'autocollapse')) || hasClass(colTables[i], 'collapsed'))
     collapseTable(i)
}
 
function collapseTable (idx){
 var Table = document.getElementById('collapsibleTable' + idx)
 var btn = document.getElementById('collapseButton' + idx)
 if (!Table || !btn) return false
 var Rows = Table.rows
 var isShown = (btn.firstChild.data == NavigationBarHide)
 btn.firstChild.data = isShown ?  NavigationBarShow : NavigationBarHide
 var disp = isShown ? 'none' : Rows[0].style.display
 for (var i=1; i < Rows.length; i++) 
    Rows[i].style.display = disp
}
 
function collapsibleDivs(){
 var navIdx = 0, colNavs = [], i, NavFrame
 var divs = document.getElementById('content').getElementsByTagName('div')
 for (i=0; NavFrame = divs[i]; i++) {
   if (!hasClass(NavFrame, 'NavFrame')) continue
   NavFrame.id = 'NavFrame' + navIdx
   var a = document.createElement('a')
   a.className = 'NavToggle'
   a.id = 'NavToggle' + navIdx
   a.href = 'javascript:collapseDiv(' + navIdx + ');'
   a.appendChild(document.createTextNode(NavigationBarHide))
   for (var j=0; j < NavFrame.childNodes.length; j++)
     if (hasClass(NavFrame.childNodes[j], 'NavHead'))
       NavFrame.childNodes[j].appendChild(a)
   colNavs[navIdx++] = NavFrame
 }
 for (i=0; i < navIdx; i++)
  if ((navIdx > NavigationBarShowDefault && !hasClass(colNavs[i], 'expanded')) || hasClass(colNavs[i], 'collapsed'))
     collapseDiv(i)
}
 
function collapseDiv(idx) {
 var div = document.getElementById('NavFrame' + idx)
 var btn = document.getElementById('NavToggle' + idx)
 if (!div || !btn) return false
 var isShown = (btn.firstChild.data == NavigationBarHide)
 btn.firstChild.data = isShown ? NavigationBarShow : NavigationBarHide 
 var disp = isShown ? 'none' : 'block'
 for (var child = div.firstChild;  child != null;  child = child.nextSibling)
   if (hasClass(child, 'NavPic') || hasClass(child, 'NavContent')) 
      child.style.display = disp
}
 
//Execution
if (wgCanonicalNamespace == 'Special')
{
}
else if (wgAction != 'history')
{
  addOnloadHook(collapsibleDivs)
  addOnloadHook(collapsibleTables)
}

function addWikifButton() {
        var toolbar = document.getElementById('toolbar')
        if (!toolbar) return
        var i = document.createElement('img')
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
        i.alt = i.title = 'викификатор'
        i.onclick = Wikify
        i.style.cursor = 'pointer'
        toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
        addOnloadHook(addWikifButton)
}

 / / / **** JQuery Складные столы (Dantman) **** / / / / 
importScriptPage ( 'ПоказатьСкрыть / code.js' ,  Дев ' ) ;
 
/ * TA ['CA-Nstab-форум'] = новый массив ('C', 'Просмотр форума странице'); * /
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  / / Catch плохие строки даты 
  , если ( IsNaN ( Разница ) )  {  
    таймеры [ я ] . FirstChild . NodeValue  =  '**'  + таймеры [ я ] . EventDate  +  '**'  ; 
    возвращение ; 
  }
 
  / / Определяем плюс / минус 
  , если ( Разница < 0 )  { 
    Разница =  - Разница ; 
    Var TPM =  'T Plus' ; 
  }  еще  { 
    Var TPM =  'T минус " ; 
  }
 
  / / Calcuate Разница 
  Var левого =  ( Разница % 60 )  +  'секунд' ; 
    Разница = Math . этаже ( без изменений / 60 ) ; 
  если ( Разница >  0 ) левая =  ( Разница % 60 )  +  'минут'  + левая ; 
    Разница = Math . этаже ( без изменений / 60 ) ; 
  если ( Разница >  0 ) левая =  ( Разница % 24 )  +  'часы'  + левая ; 
    Разница = Math . этаже ( без изменений / 24 ) ; 
  если ( Разница >  0 ) левая = Разница +  «дней»  + оставил
  таймеры [ я ] . FirstChild . NodeValue  = TPM + оставил ;
 
  / / SetInterval () является более эффективным, но называть SetTimeout () 
  / / делает ошибки сломать сценарий, а не бесконечно рекурсивной 
  тайм-аутов [ я ]  = SetTimeout ( 'updatetimer ('  + Я +  ')' , 1000 ) ; 
}
 
 
Функция checktimers ( )  { 
  'nocountdown' / / скрывать и показывать
    
    
    
    
 
  / / Настройка глобальных объектов и таймеры общий держатель для тайм-аутов, его } }       
     
        
  

 
/ / AJAX 
END Аякса автообновления 
  
 

 
addOnloadHook ( checktimers ) ;
 
/ / Пакетное удаление 
importScriptPage ( 'AjaxBatchDelete / code.js' ,  Дев ' )
 
/ / Часы для обоих скинов 
importArticle ( { типа : 'Script' , статья : 'W: C: разработчика: DisplayClock / code.js' } ) ;
 
/ / Кредитные Beyblade в вики. 
/ / Добавление "Мой вклад" в меню пользователя. 
/ / Функция: Добавляет "Мой вклад" в UserDropdownMenu. 
функции UserContribsMenuItem ( )  { 
	$ ( 'ul.AccountNavigation Ли: первого ребенка ul.subnav Ли: первого ребенка ) . после ( <li> <A HREF = "/ вики / Special: Взносы / ' + encodeURIComponent ( wgUserName )  + '"> Мой вклад </ A> </ li>' ) ; 
}
 
addOnloadHook ( UserContribsMenuItem ) ;
 
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
  }
}
 
/ / ************************************************ ** 
/ / Kindle для Web 
/ / ***************************************** ********* 
/ / 
/ *
<div class="Amazon">
[Http://www.amazon.com Amazon]
</ DIV>
 * /
 
function fill_amazon() {
  $.getScript("http://kindleweb.s3.amazonaws.com/app/KindleReader-min.js", function() {
    amHTML = $("#kindleReaderDiv").html();
    $("#kindleReaderDiv").html("");
    KindleReader.LoadSample({containerID: 'kindleReaderDiv', asin: amHTML, width: '670', height: '700', assoctag: 'warriorswiki-20'});
  });
}
 
addOnloadHook ( fill_amazon ) ;
 
if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}
 
/ ** Складной таблицы ********************************************* ************
 *
 * Описание: Позволяет таблиц, которые будут рухнула, показав только заголовок. Посмотреть
 * [[Википедия: NavFrame]].
 * Сопровождающие: [[Участник: R. Кут]]
 * /
 
Var autoCollapse =  2 ; 
Var collapseCaption =  "Скрыть" ; 
Var expandCaption =  "шоу" ;
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( "collapseButton" + tableIndex );
        var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
        если  (  ! Таблица | |  ! кнопка )  { 
                вернуться  ложным ; 
        }
 
        Var Строки = Таблица. строк ;
 
        if ( Button.firstChild.data == collapseCaption ) {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = "none";
                }
                Button.firstChild.data = expandCaption;
        } else {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = Rows[0].style.display;
                }
                Button.firstChild.data = collapseCaption;
        }
}
 
function createCollapseButtons() {
        var tableIndex = 0;
        var NavigationBoxes = new Object();
        var Tables = document.getElementsByTagName( "table" );
 
        для  (  вар я =  0 ; I < таблицах. длины ; я + +  )  { 
                если  ( hasClass ( Таблицы [ я ] ,  "складной"  )  )  {
 
                        / * Только добавить кнопку и прирост количества, если есть строка заголовка для работы с
                          
                          
                          
                          
 
                        NavigationBoxes [ tableIndex ]  = Таблицы [ я ] ; 
                        таблицах [ я ] . SetAttribute (  "ID" ,  "collapsibleTable"  + tableIndex ) ;
 
                        var Button     = document.createElement( "span" );
                        var ButtonLink = document.createElement( "a" );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        Button.style.styleFloat = "right";
                        Button.style.cssFloat = "right";
                        Button.style.fontWeight = "normal";
                        Button.style.textAlign = "right";
                        Button.style.width = "6em";
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
                        ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( "[" ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( "]" ) );
 
                        Заголовок. InsertBefore ( кнопка , заголовок. ChildNodes [ 0 ]  ) ; 
                        tableIndex + +; 
                } 
        }
 
        for ( var i = 0;  i < tableIndex; i++ ) {
                if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
                        collapseTable( i );
                }
        }
}
 
addOnloadHook ( createCollapseButtons ) ;
 
 / ** Динамические панели навигации (экспериментальный) *************************************
  *
  * Описание: смотреть [[Википедия: NavFrame]].
  * Сопровождающие: не сопровождается
  * /
 
/ / Настройка слов на вашем языке 
Var NavigationBarHide =  '['  + collapseCaption +  ']' ; 
Var NavigationBarShow =  '['  + expandCaption +  ']' ;
 
/ / Показывает и скрывает содержание и изображение (если есть) из панели навигации 
/ / Параметры: 
/ / indexNavigationBar: индекс панели навигации, чтобы быть
 
         
         
 
        если  ( ! NavFrame | |  ! NavToggle )  { 
                возвращение  ложным ; 
        }
 
        / / Если показано
           
                 
                         
                 
                       
                
                      
                
         
 
        / / Если скрытый
             
         
                 
         
                     
                
                     
                
         
        

 
/ / Добавляет показать / скрыть кнопку для панели навигации 
функции createNavigationBarToggleButton ( )  { 
        Var indexNavigationBar =  0 ; 
        / / перебора всех <DIV> Элементы- 
        Var дивы = документе. GetElementsByTagName ( "ДИВ" ) ; 
        для ( 
                вар я = 0 ;  
                NavFrame = дивы [ я ] ,  
                я + + 
                )  { 
        / / если нашли бар навигации 
        , если ( hasClass ( NavFrame ,  "NavFrame" )  )  {
 
                indexNavigationBar++;
                var NavToggle = document.createElement("a");
                NavToggle.className = 'NavToggle';
                NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
                var NavToggleText = document.createTextNode(NavigationBarHide);
                for (
                        var NavChild = NavFrame.firstChild;
                        NavChild != null;
                        NavChild = NavChild.nextSibling
                        ) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        if (NavChild.style.display == 'none') {
                                NavToggleText = document.createTextNode(NavigationBarShow);
                                break;
                        }
                }
        }
 
                . NavToggle AppendChild ( NavToggleText ) ; 
                / / Найти NavHead и приложите коленного рычага (Должно быть, потому что это сложная обработка FirstChild Моза является
                
                        
                         
                           
                        
                  
                
        

 
addOnloadHook ( createNavigationBarToggleButton ) ;
 
 
/ ** Проверить, если элемент имеет определенный класс **************************************
  *
  * Описание: использует регулярные выражения и кэширования для повышения производительности.
  * Сопровождающие: [[Участник: Майк Диллон]], [[User: R. Кут]], [[Участник: SG]]
  * /
 
var hasClass = (function () {
        var reCache = {};
        return function (element, className) {
                return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
        };
})();
 
 
SRC = "http://webchat.freenode.net/?channels=wikia-warriorcats" ширина = "700" 
  
     
      
     
 
  } 
  / / Alert (document.getElementById ("JRChatReplace") Innerhtml.);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
 
 
/ ************* ДЛЯ TOGGLE STUFF ************* / 
/ ************* Funzioni ди utilità Generale * ************ /
 
 / * Проверка если элемент имеет определенный класс **************************************
 *
 * Описание: использует регулярные выражения и кэширования для повышения производительности.
 * Сопровождающие: Пользователь: Майк Диллон, пользователей: Р. Кут, Пользователь: SG
 * /
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();
 
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }
 
/ * Создает метод getElementsByClass, если даже не поддерживаются браузером
   
	 

 
 
function getElementsByName (name, root) {
 if (root == undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}

importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

//Надпись По части iOS
importScript("MediaWiki:Common.js/masthead.js");