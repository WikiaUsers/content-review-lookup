/* Тот самый */
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         https://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
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
                        if ( !HeaderRow ) {
                                continue;
                        }
                        var Header = HeaderRow.getElementsByTagName( 'th' )[0];
                        if ( !Header ) {
                                continue;
                        }
 
                        NavigationBoxes[tableIndex] = Tables[i];
                        Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
                        var Button = document.createElement( 'span' );
                        var ButtonLink = document.createElement( 'a' );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
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
                } else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
                        var element = NavigationBoxes[i];
                        while ( element = element.parentNode ) {
                                if ( hasClass( element, 'outercollapse' ) ) {
                                        collapseTable( i );
                                        break;
                                }
                        }
                }
        }
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();

importScriptPage('MediaWiki:AjaxRC/code.js', 'dev'); // AJAX-обновление некоторых страниц
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; // AJAX-обновление некоторых страниц(выбор страниц)
var AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название

importScriptPage('MediaWiki:Common.js/BackToTopButton.js', 'ru.terraria'); //Кнонпка Вверх

//rights
importScript("MediaWiki:Common.js/masthead.js");


// Импорт скрипт для 3+ ряда в навигационном меню
importArticles({ 
    type: 'script', 
    articles: [ 
        'u:dev:ExtendedNavigation/code.js' 
    ]
});

addOnloadHook(function(){ //безымянная функция
	ll=1; //Русский
	var d=function(s,e){ //вызывает метод параметра
		if(!e)e=document;
		return e.getElementsByClassName(s);
	};
	var t=function(s,e){
		return e.getElementsByTagName(s);
	};

	switchLang=function(l){ //процедура смены языка
		var c=['mrus','meng']; //массив
		if(l===undefined)l=1-ll; //инверсия для неопределённого параметра

		ll=l; //флаг-язык
		if(ll){
			c[2]=c[1];
			c[1]=c[0];
			c[0]=c[2];
		}
		for(j=0;j<2;j++){ //скрыть элементы и показать другие элементы
		 a=d(c[j]);
		 if(a) for(i=0;i<a.length;i++) a[i].style.display=(j?"":"none"); 
		}
		return false;
	};
	a=d('mswitch'); 
	if(a) for(l=0;l<a.length;l++) {
		x=t('a',a[l]); //все ссылки
		if(x) for(var j=0;j<x.length;j++) { 
			y=x[j];
			y.onclick=function() { return switchLang();};
			y.href='javascript:void(0)'; //отключить ссылку
			y.style.color="#FFF"; 
		}
	}
	switchLang(ll); //инициализация
	return true; 
});

/* тест код от star по убийству визуального редактора - <!-- see talk page reviewers -->
 
//Уничтожает обнаружение визуального редактора в зародыше.
function break_ve_lib(caller)
{
         if (mw && mw.libs && mw.libs.ve && !mw.libs.ve.canCreatePageUsingVEBroken)
         {
                 mw.libs.ve.canCreatePageUsingVE = function(){return false};
                 console.log("mw.libs updated by "+caller);
                 mw.libs.ve.canCreatePageUsingVEBroken = true;
         }
}
 
//Дополнительная подстраховка
function break_CreatePage_bool_fn(caller)
{
        if (CreatePage !== undefined && !CreatePage.canUseVisualEditorBroken)
        {
                window.CreatePage.canUseVisualEditor = function () { return false; }
                is_page_tuned = true;
                console.log("CreatePage.canUseVisualEditor broken by "+caller)
                CreatePage.canUseVisualEditorBroken = true;
        }
}
 
//Модифицирует ссылки, чтобы избежать визуального редактора (Opera Presto).
function ClearAllLinks(caller)
{
        var list = document.getElementsByTagName("A");
        for(var i=0;i<list.length;i++)
        {
                var a = list[i]
                a.href=a.href.replace("veaction","action")
        }
        //Тихая функция работает постоянно (пока таймер жив). Упорство и труд всё перетрут!
}
 
//Проверяет адрес страницы. И если он на визуальном редакторе, то уходит на обычный.
function CheckForRedirect(caller)
{
        var found_veaction = window.location.href.indexOf("veaction=edit")
        if (found_veaction !== -1 && window.kill_ve_timer)
        {
                if (window.kill_ve_timer) clearInterval(window.kill_ve_timer);
                window.kill_ve_timer = undefined;
                console.log("Redirect to page without VE by "+caller)
                window.location.href = window.location.href.substring(0,found_veaction) + "action=edit"
                //Отсекает всё, включая #
        }
}
 
//Не всегда клик срабатывает. Поэтому делаем еще один контрольный клик с отсрочкой по времени.
function ClickItAgain(source,sec)
{
        setTimeout(function()
        {
                console.log("Clicked again after "+sec+" seconds.");
                source.onclick();
        },sec*1000);
}
 
//Обновляет кнопки. Отключает кнопку Visual Editor и автоматически переходит на Source Editor
function UpdateThatDamnButtons(caller, source, visual)
{
        if (!visual.already_disabled)
        {
                //Отключаем кнопку Visual Editor
                //visual.onclick = function(){return false};
                //visual.onkeydown = function(){return false};
                //visual.onfocus = function(){return false};
               
                //И переходим на редактор кода.
                save_source_button_to_click = source;
                for (var i=1;i<=5;i++)
                {
                        ClickItAgain(source,i) //Кликаем 5 раз в течение первых 5 секунд.
                }
                //ClickItAgain(source,15)
                //ClickItAgain(source,20)
                //ClickItAgain(source,30)
                //ClickItAgain(source,60)
                //ClickItAgain(source,100)
                source.onclick();
               
                console.log("Buttons disabled and locked by "+caller);
                visual.already_disabled = true;
        }
}
 
//Ищет кнопки по id
function CheckVisualButtonsById(caller)
{
        if (window.CKEDITOR && window.CKEDITOR.tools && window.CKEDITOR.tools.callFunction && !window.damn_buttons_are_disabled)
        {
                var source = document.getElementById("cke_21");
                var visual = document.getElementById("cke_22");
                if (source && visual)
                {
                        UpdateThatDamnButtons(caller + "(found by id)", source, visual);
                        window.damn_buttons_are_disabled = true;
                }
        }
}
 
//Ищет кнопки по href (что-нибудь, да сработает, даже в случае редизайна викии)/
function CheckVisualButtonsByHref(caller)
{
        if (window.CKEDITOR && window.CKEDITOR.tools && window.CKEDITOR.tools.callFunction && !window.damn_buttons_are_disabled)
        {
                var source = false;
                var visual = false;
                var list = document.getElementsByTagName("A");
                for(var i=0;i<list.length;i++)
                {
                        var a = list[i];
                        if (a.href == "javascript:void('Source')")
                        {
                                source = a;
                                if (source && visual) break;
                        }
                        if (a.href == "javascript:void('Visual')")
                        {
                                visual = a;
                                if (source && visual) break;
                        }
                }
                if (source && visual)
                {
                        UpdateThatDamnButtons(caller + "(found by href)", source, visual);
                        window.damn_buttons_are_disabled = true;
                }
        }
}
 
//Пробует всеми способами заблочить визуальный редактор.
//В будущем можно добавить еще способов, понадежнее.
function TryAllHookMathodsAtOnce(caller)
{
        break_ve_lib(caller);
        break_CreatePage_bool_fn(caller);
        ClearAllLinks(caller);
        CheckForRedirect(caller);
        CheckVisualButtonsById(caller);
        CheckVisualButtonsByHref(caller);
}
 
 
//Пробуем запустить всё это как можно скорее.
TryAllHookMathodsAtOnce("raw");
 
//Если что-то тормознулось, то пробуем повеситься на загрузчик.
addOnloadHook(function(){
        TryAllHookMathodsAtOnce("OnloadHook");
})
 
 
//Ну и на последом запускаем таймер. Чисто для уверенности, что испробовали всё.
kill_ve_timer_seconds = 70;
kill_ve_timer_delay = 400;
kill_ve_timer = setInterval(function(){
        TryAllHookMathodsAtOnce("Timer");
        kill_ve_timer_seconds = kill_ve_timer_seconds - kill_ve_timer_delay * 0.001;
        //console.log("...elapsed time "+kill_ve_timer_seconds);
        if (kill_ve_timer_seconds<0)
        {
                clearInterval(kill_ve_timer);
        }
}, kill_ve_timer_delay)
*/

/* Для шаблона - "Твоёимя" */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.yourname").html(wgUserName);
});

/* Отступы в title */
function replaceTitle() {
    if ($('#replaceMe').length != 0) {
        var n = $('#replaceMe').attr("title").replace(/&#10/g,"\n") //Заменяем &#10 на отступ
        $('#replaceMe').attr("title", n) //Присваеваем новый title
        $('#replaceMe').attr('id', '') //Удаляем id дабы передти к следующему элементу
        setTimeout(replaceTitle,300) //Небольшая задержка, чтобы таблица успела прогрузиться
    }
}
replaceTitle()



$(function(){
    importArticles({
        type: "script",
        articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
    });
});

/* костыль для отображения иконки в цитатах  */
$(function() {
    $(".DSWHoverTabContainer img.lzy").each(function() {
        var dataSrc = $(this).attr('data-src');
        if (dataSrc) {
            $(this).attr('src', dataSrc);
        }
    });
});