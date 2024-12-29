/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице */
/* Gadgets toggler */
nkch_gst_gadgets = [{
    name: "RWA", // название гаджета с MediaWiki:Gadget-Название; обязательно
    title: "Недавняя активность", // Название в меню
    description: "Оформление для свежих правок, соц. активности и страницы истории" // Описание гаджета в меню при наведении
    }, {
	name: "OrangeDarkTheme",
	title: "Оранжевая тёмная тема",
	description: "Минимальные изменения, делающие тёмную тему оранжевой"
    }, {
	name: "OldGreyTheme",
	title: "Старая серая тема",
	description: "Воссоздание старого стиля тёмной темы (серо-голубой)"
    }, {
	name: "TransparentBackground",
	title: "Прозрачный фон",
	description: "Прозрачный фон статей"
}];

// Автоматическое всплывание «стрелочки»
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};

//Inactive users
InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВНЫЙ ПОЛЬЗОВАТЕЛЬ'
};

/*Импорт*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:InactiveUsers/code.js',
        'MediaWiki:Common.js/masthead.js'
    ]
});

/*Конец импорт*/

var auto_comment = 0;
 
//Кнопки быстрого описания правки
 
//список кнопок
function SummaryButtons(){
 var wpSummary = document.getElementById('wpSummary')
 if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return
 wpSummaryBtn = document.createElement('span') //global var
 wpSummaryBtn.id = 'userSummaryButtonsA'
 
// +Рекомендация
 var wpSummaryBtnRec = document.createElement('i');
 wpSummaryBtnRec.appendChild(document.createTextNode('Пожалуйста, если вы не торопитесь, опишите вашу правку:'));
 wpSummaryBtnRec.appendChild(document.createElement('br'));
 wpSummaryBtn.appendChild(wpSummaryBtnRec);
 
 wpSummary.parentNode.insertBefore(wpSummaryBtn, wpSummary.nextSibling);
 wpSummary.parentNode.insertBefore(document.createElement('br'), wpSummary.nextSibling);
 addSumButton('новости', 'новости', 'Учтены последние новости');
 addSumButton('викификация', 'викификация', 'Произведена викификация');
 addSumButton('правила', 'правила', 'Согласно правил');
 addSumButton('оформление', 'оформление', 'Оформление');
 addSumButton('стиль', 'стилевые правки', 'Стилевые правки');
 addSumButton('грамматика', 'грамматика', 'Поправлена орфография/пунктуация');
 addSumButton('категоризация', 'категоризация', 'Изменены категории');
 addSumButton('шаблон', 'шаблон', 'Добавлен/изменён шаблон');
 addSumButton('дополнение', 'дополнение', 'Добавлены новые сведения');
 addSumButton('уточнение', 'уточнение', 'уточнение');
 addSumButton('иллюстрирование', 'иллюстрирование', 'Размещена/изменена иллюстрация');
 addSumButton('обновление', 'обновление сведений', 'Обновлены устаревшие сведения');
 addSumButton('разметка', 'правка разметки', 'Изменение разметки');
 addSumButton('лишнее', 'лишнее', 'Действительно лишнее');
 addSumButton('интервики', 'интервики', 'Интервики тоже нужны');
 addSumButton('замена изображения', 'замена изображения', 'изображение');
 addSumButton('шаблонофикация', 'шаблонофикация', 'шаблонофикация');
 addSumButton('ашипки', 'ашипки', 'ашипки');
 addSumButton('сомнения', 'сомнения', 'сомнения');
}
 
//код вставки кнопок быстрого описания
function addSumButton(name, text, title) {
 var btn = document.createElement('a');
 btn.appendChild(document.createTextNode(name));
 btn.title = title;
 btn.onclick = function(){insertSummary(text)};
 wpSummaryBtn.appendChild(btn);
 wpSummaryBtn.appendChild(document.createTextNode(' '));
}
 
//код вставки описания
function insertSummary(text) {
 var wpSummary = document.getElementById('wpSummary')
 if (wpSummary.value.indexOf(text) != -1) return 
 if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ','
 if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' '
 wpSummary.value += text
}

//вызов функции вставки кнопок быстрого описания правки при загрузке страницы
addOnloadHook(SummaryButtons)

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
 
// ============================================================
// BEGIN Collapsible tables
// ============================================================
 
// Description: Allow tables to be collapsible
// Credit:      This script is from Wikipedia. Please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
//              Customized for Fallout Wiki by User:Porter21
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
   var reCache = {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 1;
var collapseCaption = "скрыть";
var expandCaption = "показать";
 
function collapseTable(tableIndex) {
   var Button = document.getElementById( "collapseButton" + tableIndex );
   var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
   if ( !Table || !Button ) {
      return false;
   }
 
   var Rows = Table.rows;
 
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
   var collapseIndex = 0;
   var NavigationBoxes = new Object();
   var Tables = document.getElementsByTagName( "table" );
 
   for ( var i = 0; i < Tables.length; i++ ) {
      if ( hasClass( Tables[i], "collapsible" ) ) {
 
         /* only add button and increment count if there is a header row to work with */
         var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
         if (!HeaderRow) continue;
         var Header = HeaderRow.getElementsByTagName( "th" )[0];
         if (!Header) continue;
 
         NavigationBoxes[ tableIndex ] = Tables[i];
         Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
         var Button     = document.createElement( "span" );
         var ButtonLink = document.createElement( "a" );
         var ButtonText = document.createTextNode( collapseCaption );
 
         Button.style.styleFloat = "right";
         Button.style.cssFloat = "right";
         Button.style.fontWeight = "normal";
         Button.style.textAlign = "right";
         Button.style.width = "5em";
         Button.className = "t_show_hide";
 
         ButtonLink.style.color = Header.style.color;
         ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
         ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
         ButtonLink.appendChild( ButtonText );
 
         Button.appendChild( document.createTextNode( "[" ) );
         Button.appendChild( ButtonLink );
         Button.appendChild( document.createTextNode( "]" ) );
 
         Header.insertBefore( Button, Header.childNodes[0] );
 
         if ( !hasClass( Tables[i], "nocount" ) ) {
            collapseIndex++;
	 }
         tableIndex++;
      }
   }
 
   for ( var i = 0;  i < tableIndex; i++ ) {
      if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
         collapseTable( i );
      } 
      else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
         var element = NavigationBoxes[i];
         while (element = element.parentNode) {
            if ( hasClass( element, "outercollapse" ) ) {
               collapseTable ( i );
               break;
            }
         }
      }
   }
}
 
$( createCollapseButtons );

// ============================================================
// END Collapsible tables
// нет ссылок на данную функцию
// ============================================================

function infoboxToggle() {
	var page = window.pageName.replace(/\W/g, '_');
	var nowShown;
 
	if(document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[Show]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
		nowShown = true;
	}
 
	if(window.storagePresent) {
		var storage = globalStorage[window.location.hostname];
		storage.setItem('infoboxshow-' + page, nowShown);
	}
}
 
!function( $, mw ) {
	var u = mw.config.get( 'wgUserName');

	if ( u == null ) return;
    $('.insertusername').text( u );
}( jQuery, mediaWiki );