/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице */

var auto_comment = 0;

if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0)
{
       if (wgCanonicalNamespace != "Special")
       {
               document.write('<script type="text/javascript" src="/index.php' +
               '?title=MediaWiki:Onlyifediting.js&action=raw' +
               '&ctype=text/javascript&dontcountme=s"></script>');
       }
}

//Кнопки быстрого описания правки
 
//список кнопок
function SummaryButtons(){
 var wpSummary = document.getElementById('wpSummary')
 if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return
 wpSummaryBtn = document.createElement('span') //global var
 wpSummaryBtn.id = 'userSummaryButtonsA'

// +Рекомендация
 var wpSummaryBtnRec = document.createElement('i');
 wpSummaryBtnRec.appendChild(document.createTextNode('Пожалуйста, если вы не торопитесь, опишите вашу правку подробно: например, не «дополнение», а «+персонажи».'));
 wpSummaryBtnRec.appendChild(document.createElement('br'));
 wpSummaryBtn.appendChild(wpSummaryBtnRec);

 wpSummary.parentNode.insertBefore(wpSummaryBtn, wpSummary.nextSibling);
 wpSummary.parentNode.insertBefore(document.createElement('br'), wpSummary.nextSibling);
 addSumButton('новости', 'новости', 'Учтены последние новости');
 addSumButton('викификация', 'викификация', 'Произведена викификация');
 addSumButton('правила', 'правила', 'Добавлены сведения о правилах');
 addSumButton('сеттинг', 'сеттинг', 'Добавлены сведения о сеттинге');
 addSumButton('стиль', 'стилевые правки', 'Стилевые правки');
 wpSummaryBtn.appendChild(document.createElement('br'));
 addSumButton('оформление', 'оформление', 'Оформление');
 addSumButton('грамматика', 'грамматика', 'Поправлена орфография/пунктуация');
 addSumButton('категории', 'категоризация', 'Изменены категории');
 addSumButton('шаблон', 'шаблон', 'Добавлен / изменён шаблон');
 wpSummaryBtn.appendChild(document.createElement('br'));
 addSumButton('дополнение', 'дополнение', 'Добавлены новые сведения');
 addSumButton('иллюстрация', 'иллюстрация', 'Размещена иллюстрация');
 addSumButton('обновление', 'обновление сведений', 'Обновлены устаревшие сведения');
 addSumButton('разметка', 'правка разметки', 'Изменение разметки');
}
 
//код вставки кнопок быстрого описания
function addSumButton(name, text, title) {
 var btn = document.createElement('a');
 btn.appendChild(document.createTextNode(name));
 btn.title = title;
 btn.onclick = function(){insertSummary(text)};
 wpSummaryBtn.appendChild(btn);
 wpSummaryBtn.appendChild(document.createTextNode(' '));
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

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[**MAINTAINERS**]]
 */
var autoCollapse = 2;
var collapseCaption = 'скрыть';
var expandCaption = 'показать';
 
function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
	if ( !Table || !Button ) {
		return false;
	}
 
	var Rows = Table.rows;
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
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
	var Tables = document.getElementsByTagName( 'table' );
 
	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if( !HeaderRow ) continue;
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if( !Header ) continue;
 
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
			var Button     = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.className = 'collapseButton'; // Styles are declared in MediaWiki:Common.css
 
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );
 
			Header.insertBefore( Button, Header.childNodes[0] );
			tableIndex++;
		}
	}
 
	for ( var i = 0;  i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		}
	}
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function() {
	var reCache = {};
	return function( element, className ) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();

//перемещение ссылок "править" влево, к заголовку секции, для борьбы с багом движка
addOnloadHook(function() {
    if (typeof oldEditsectionLinks != 'undefined' && oldEditsectionLinks)   return;
    var spans = document.getElementsByTagName("span");
    for (var i=0; i<spans.length; i++) {
        var span = spans[i];
        if (span.className != "editsection")    continue;
        span.style.fontSize = "x-small";
        span.style.fontWeight = "normal";
        span.style.styleFloat = "none"; // IE-Fix für die folgende Zeile
        span.style.cssFloat = "none";
        span.style.marginLeft = "0px";
        span.parentNode.appendChild(document.createTextNode(" "));
        span.parentNode.appendChild(span);
    }
});