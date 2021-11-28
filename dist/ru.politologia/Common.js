/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

importScript('MediaWiki:Wikificator.js');
importScript('MediaWiki:hide_page_elements.js');
importScript('MediaWiki:Search.js');
importScript('MediaWiki:Sysop.js');

/* Кнопки Соц. сетей */
importScriptPage('SocialIcons/code.js', 'dev');

var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "40px",
	wikiTwitterAccount: "default"
};


/* Автоматическое всплытие "стрелочки" */
 
window.AutoEditDropdownConfig = {
expandedAreaContribute: true,
expandedAreaEdit: false
};
 
importArticles({
type: 'script',
articles: [
'w:c:dev:AutoEditDropdown/code.js'
]
}); 
 
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
 
/*Импорт*/
 
 
//Masthead entries
importScript("MediaWiki:Common.js/masthead.js");
 
/*Конец импорт*/
 
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
 addSumButton('дополнение', 'дополнение', 'Добавлены дополнения');
 addSumButton('уточнение', 'уточнение', 'уточнение');
 addSumButton('иллюстрирование', 'иллюстрирование', 'Размещена/изменена иллюстрация');
 addSumButton('обновление', 'обновление сведений', 'Обновлены устаревшие сведения');
 addSumButton('разметка', 'правка разметки', 'Изменение разметки');
 addSumButton('лишнее', 'лишнее', 'Действительно лишнее');
 addSumButton('интервики', 'интервики', 'Интервики тоже нужны');
 addSumButton('замена изображения', 'замена изображения', 'изображение');
 addSumButton('шаблонофикация', 'шаблонофикация', 'шаблонофикация');
 addSumButton('орфография', 'орфография', 'орфография');
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
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//
 
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//Created by Noemon from Dead Space Wiki, translate from ru.elderscrolls.wikia
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Наверх" onClick="goToTop();">Наверх</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication
 
 
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
 
jQuery(function($) {
   createCollapseButtons();
});
 
// ============================================================
// END Collapsible tables
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
 


/* Any JavaScript here will be loaded for all users on every page load. */
 
var refreshDate;
 
function showTime() {
	var	now = new Date(),
		hh = now.getUTCHours(),
		mm = now.getUTCMinutes(),
		ss = now.getUTCSeconds(),
		time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
    $('#showdate').empty().append('<span class="barDate" style="text-transform: uppercase;"><a style="color:#FFF;font-family:\'Futura\', \'Gill Sans\', \'Helvetica Neue\',\'Trebuchet MS\', sans-serif" title="Purge the server cache and update the contents of this page." href="' + wgArticlePath.replace('$1', wgPageName.replace(/ /g, '_')) + '?action=purge">' + time + '</a></span>');
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(showTime, 1000);
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li id="displayTimer"><span id="showdate"></span></li>').appendTo('#AccountNavigation');
    else
        $('#p-personal ul').prepend('<li><span id="showdate"></span></li>');
    showTime();
    refreshDate = window.setTimeout(showTime, 1000);
    $('#displayTimer').css({ color: '#FFF', fontWeight: 'normal', fontSize: '10px', letterSpacing: '2px', marginLeft: '3px' })
});

/*Часы в правом верхнем углу*/

var refreshDate;
 
function showTime() {
        var    now = new Date(),
                hh = now.getHours(),
                mm = now.getMinutes(),
                ss = now.getSeconds(),
                time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
    $('#showdate').empty().append('<span class="barDate" style="text-transform: uppercase;"><a style="color:#FFF;font-family:\'Futura\', \'Gill Sans\', \'Helvetica Neue\',\'Trebuchet MS\', sans-serif" title="Purge the server cache and update the contents of this page." href="' + wgArticlePath.replace('$1', wgPageName.replace(/ /g, '_')) + '?action=purge">' + time + '</a></span>');
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(showTime, 1000);
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li id="displayTimer"><span id="showdate"></span></li>').appendTo('#AccountNavigation');
    else
        $('#p-personal ul').prepend('<li><span id="showdate"></span></li>');
    showTime();
    refreshDate = window.setTimeout(showTime, 1000);
    $('#displayTimer').css({ color: '#FFF', fontWeight: 'normal', fontSize: '10px', letterSpacing: '2px', marginLeft: '3px' })
});







importScript_ = importScript
importScript = function (page, proj){
 if (!proj) importScript_(page)
 else {
   if (proj.indexOf('.')==-1) proj += '.wikipedia.org'
   importScriptURI('http://'+proj+'/w/index.php?action=raw&ctype=text/javascript&title='+encodeURIComponent(page.replace(/ /g,'_')))
 }
}

addLoadEvent = addOnloadHook 


function ts_parseFloat(n){
 if (!n) return 0
 n = parseFloat(n.replace(/\./g, '').replace(/,/, '.'))
 return (isNaN(n) ? 0 : n)
}

function newSectionLink(){
 var plus = document.getElementById('ca-addsection')
 if (!plus) return
 var custom = document.getElementById('add-custom-section')
 if (!custom) return
 plus.firstChild.setAttribute('href', custom.getElementsByTagName('a')[0].href)
}


function editZeroSection(){
 var body = document.getElementById('bodyContent')
 if (!body) return
 var h2s = body.getElementsByTagName('H2')
 var h2 = h2s[0]
 if (!h2) return
 if (h2.parentNode.id == 'toctitle') h2 = h2s[1]
 if (!h2) return
 var span = h2.firstChild
 if (!span || span.className != 'editsection') return
 var zero = span.cloneNode(true)
 body.insertBefore(zero, body.firstChild)
 var a = zero.getElementsByTagName('a')[0]
 if (a.href.indexOf('&section=T') == -1 )  a.title = a.title.replace(/:.*$/,': 0')
 else a.title = 'Править секцию: 0'
 a.setAttribute('href', wgScript + '?title='+wgPageName + '&action=edit&section=0')
}

importScript("MediaWiki:LanguageSelection.js");

//Collapsiblе: [[ВП:СБ]]

var NavigationBarShowDefault = 2
var NavigationBarHide = '[скрыть]'
var NavigationBarShow = '[показать]'

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
 var divs = document.getElementById('content')
  if(divs == null) return
 divs = divs.getElementsByTagName('div')
  if(divs == null) return

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


function voting9(){
 if (votingTrigger = document.getElementById('voting-trigger'))
  importScriptURI(wgServer+wgScript
   +'?title=MediaWiki:Voting9.js&action=raw&ctype=text/javascript&cversion='
   +encodeURIComponent(votingTrigger.innerHTML.replace(/\D+/g, '.')))
}

//Execution
if (wgCanonicalNamespace == 'Special'){
  switch (wgCanonicalSpecialPageName){
   case 'Upload': importScript('MediaWiki:Upload.js'); break
   case 'Search': importScript('MediaWiki:Search.js'); break
  }
}else if (wgAction != 'history'){
  addOnloadHook(editZeroSection)
  addOnloadHook(collapsibleDivs)
  addOnloadHook(collapsibleTables)
  if (navigator.appName=='Microsoft Internet Explorer' && document.createStyleSheet)
    document.createStyleSheet().addRule('.IPA', 'font-family: "Doulos SIL", "Charis SIL", Gentium, "DejaVu Sans", Code2000, "TITUS Cyberbit Basic", "Arial Unicode MS", "Lucida Sans Unicode", "Chrysanthi Unicode";')
  if (wgNamespaceNumber == 0)
  { }
  else
  {
    addOnloadHook(newSectionLink)
  }
  if (wgAction=='edit' || wgAction=='submit') importScript('MediaWiki:Editpage.js')
  addOnloadHook(voting9)
}

    addOnloadHook(function() {
        if(!($('ol.references').size())) return;
        $('ol.references').before($('<a href="#">[показать примечания]</a>').click(function(e){e.preventDefault(); $('ol.references').toggle()})).hide()
        $('.reference a').live('click', function(e) { 
            e.preventDefault();
            var x = $(this), iscurrent = x.hasClass('curreference'), i = $('.tooltip').hide(250)
            $('.curreference').removeClass('curreference'); 
            if (iscurrent) return;
            var par = x.parent(), o = par.offset(), l = o.left, t = o.top+13
            var b = $('body'), mh = b.height(), mw = b.width()
            var c=$(x.attr('href')).clone().find('a:first').remove().end().html()
 
            x.addClass('areference').addClass('curreference') 
            if (!i.size()) i = $('<span />').addClass('tooltip')
            i.insertAfter(par).empty().append(' ('+c+')').show(250)
            i.css('color','grey')
        });
        $(window).click(function(e) {
            if (!($(e.target).hasClass('areference') || $(e.target).parents().andSelf().hasClass('tooltip'))) {
                $('.tooltip').hide(250); $('.curreference').removeClass('curreference')
            }
        });
    });



//jQuery, import scripts
//mw.loader.load('http://code.jquery.com/jquery-1.7.2.min.js');
if(wgAction == 'edit' || wgAction == 'submit') {
  importScript('MediaWiki:Editpage.js');
}
if(wgAction == 'view' || wgAction == 'submit') {
  importScript('MediaWiki:Collapsebuttons.js');
}

function sysopProtectPage(){
 var inp = document.getElementById('mwProtect-level-edit') 
 if (inp) addHandler(inp, 'change', noMoveAutoconfirmedProtection)
 function noMoveAutoconfirmedProtection(){
   var inp = document.getElementById('mwProtectUnchained')
   if (!inp || inp.checked) return
   inp = document.getElementById('mwProtect-level-move')
   if (inp && inp.selectedIndex==1) inp.selectedIndex = 0
   inp = document.getElementById('mwProtect-level-delete')
   if (inp && inp.selectedIndex==1) inp.selectedIndex = 0
 }
}
$(sysopProtectPage);

function newSectionLink(){
 var plus = document.getElementById('ca-addsection')
 if (!plus) return
 var custom = document.getElementById('add-custom-section')
 if (!custom) return
 plus.firstChild.setAttribute('href', custom.getElementsByTagName('a')[0].href)
}
/*
$.getScript('http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4e8727876803ac59');
$(function(){
   if( (wgUserName && typeof EnablePlusOne == 'undefined') || (wgNamespaceNumber != 0 && wgNamespaceNumber != 6 && wgNamespaceNumber != 100)
      || wgAction != 'view' || /(oldid|diff)=/.test(window.location) ) return;
   $('#firstHeading').prepend( '<div id="addthis" class="share-box addthis_toolbox addthis_default_style"></a>' + 
      '<a class="addthis_button_livejournal at300b"></a><a class="addthis_button_twitter at300b"></a>' + 
      '<a class="addthis_button_vk at300b"></a><a class="addthis_button_facebook at300b"></a>' +
      '<a class="addthis_button_compact"></a><a class="addthis_button_google_plusone"></a></div>' );
});

/* Разработка */
$(function() {
   $('.jnav').each(function(i,e) {
      $(this).data('i', i+1).click(function() {
         var $this = $(this),
             $jnavb = $('#jnavb-' + $this.data('i'));
         if( $this.hasClass('jnav-inactive') ) {
            $('.jnav-active').removeClass('jnav-active').addClass('jnav-inactive');
            $('.jnavb').slideUp(250);
            $this.removeClass('jnav-inactive').addClass('jnav-active');
            $jnavb.slideDown(300);
         } else {
            $this.removeClass('jnav-active').addClass('jnav-inactive');
            $jnavb.slideUp(300);
         }
         return false;
      });
   });
   
   if($('.jnavpm').width() > 0)
   {
      $('.jnavpm').each(function(i,e) {
         $(this).data('i', i+1).click(function() {
            var $this = $(this), $jnavb = $('#jnavb-' + $this.data('i'));
            if( $this.hasClass('jnavpm-inactive') ) {
               $('.jnavpm-active').removeClass('jnavpm-active').addClass('jnavpm-inactive');
               $('.jnavb').slideUp(250);
               $this.removeClass('jnavpm-inactive').addClass('jnavpm-active');
               $jnavb.slideDown(300);
            } else {
               $this.removeClass('jnavpm-active').addClass('jnavpm-inactive');
               $jnavb.slideUp(300);
            }
            return false;
         });
      });
   }   
});

/* Доработано руководством Политологии вики */
$(function() {
    if(wgUserName != null && typeof jsForceNewRefs == 'undefined') return;
    if(!($('ol.references').size())) return;
    $('ol.references').before($('<a href="#">[показать примечания]</a>').click(
        function(e){e.preventDefault(); $('ol.references').toggle()})).hide();
    $('.reference a').live('click', function(e) { 
        e.preventDefault();
        var x = $(this), iscurrent = x.hasClass('curreference'), i = $('.fref').hide(250);
        $('.curreference').removeClass('curreference'); 
        if (iscurrent) return;
        var par = x.parent(), o = par.offset(), l = o.left, t = o.top+13;
        var b = $('body'), mh = b.height(), mw = b.width();
        var c=$(x.attr('href')).clone().find('a:first').remove().end().html();
 
        x.addClass('areference').addClass('curreference');
        if (!i.size()) i = $('<div/>').addClass('fref');
        c=c.replace(/↑/,'').replace(/<sup>.*<\/sup> /g,'').replace(/^ /,'');
        i.appendTo(b).queue(function() {
            i.empty().append(c).css({ 'left': l-((l+i.width() >= mw) && i.width()),
                                      'top': t-((t+i.height() >= mh) && (i.height()+24)) }).dequeue()
        }).show(350);
    });
    $(window).click(function(e) {
        if (!($(e.target).hasClass('areference') || $(e.target).parents().andSelf().hasClass('tooltip'))) {
            $('.tooltip').hide(350); $('.curreference').removeClass('curreference')
        }
    });
});


// Размеры версий в истории правок

function returnOfTheDiffSizes(){
 var classes = [ '.mw-plusminus-pos', '.mw-plusminus-neg', '.mw-plusminus-null' ]
 for(i=0;i<=2;i++)
 {
  $(classes[i]).each(
   function(i, elem)
   {
    var title = elem.title.replace(/Размер после изменения: ([0-9 ]+ байта?)/, "$1")
    $('<span />').text(' . . ('+title+')').insertAfter($(elem))
   }
  )
 }
}

if (wgAction == 'history')
{
  returnOfTheDiffSizes()
}

/**
* @author Falchenko Maxim aka be3
* @plugin_page http://tops.net.ua/jquery_addtocopy/
* @desc Adds a link to the copied text
* @version 1.2
* @example
* $("#content").addtocopy();
* @license free
**
jQuery.fn.addtocopy = function(usercopytxt) {
    var options = {htmlcopytxt: '<br>More: <a href="'+window.location.href+'">'+window.location.href+'</a><br>', minlen: 25, addcopyfirst: false}
    $.extend(options, usercopytxt);
	var copy_sp = document.createElement('span');
	copy_sp.id = 'ctrlcopy';
	copy_sp.innerHTML = options.htmlcopytxt;
	return this.each(function(){
		$(this).mousedown(function(){$('#ctrlcopy').remove();});
		$(this).mouseup(function(){
			if(window.getSelection){	//good times 
				var slcted=window.getSelection();
				var seltxt=slcted.toString();
				if(!seltxt||seltxt.length<options.minlen) return;
				var nslct = slcted.getRangeAt(0);
				seltxt = nslct.cloneRange();
				seltxt.collapse(options.addcopyfirst);
				seltxt.insertNode(copy_sp);
				if (!options.addcopyfirst) nslct.setEndAfter(copy_sp);
				slcted.removeAllRanges();
				slcted.addRange(nslct);
			} else if(document.selection){	//bad times
				var slcted = document.selection;
				var nslct=slcted.createRange();
				var seltxt=nslct.text;
				if (!seltxt||seltxt.length<options.minlen) return;
				seltxt=nslct.duplicate();
				seltxt.collapse(options.addcopyfirst);
				seltxt.pasteHTML(copy_sp.outerHTML);
				if (!options.addcopyfirst) {nslct.setEndPoint("EndToEnd",seltxt); nslct.select();}
			}
		});
  });
}

if (wgUserName == null) {
    $(document).addtocopy({htmlcopytxt: '<br>Подробнее: <a href="'+window.location.href+'">'+window.location.href+'</a>'});
}
*/
 // *****************************************************
 // * Experimental javascript countdown timer (Splarka) *
 // * Version 0.0.3                                     *
 // *****************************************************
 //
 // Usage example:
 //  <span class="countdown" style="display:none;">
 //  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
 //  </span>
 //  <span class="nocountdown">Javascript disabled.</span>
 
 function updatetimer(i) {
   var now = new Date();
   var then = timers[i].eventdate;
   var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
   // catch bad date strings
   if(isNaN(diff)) { 
     timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
     return;
   }
 
   // determine plus/minus
   if(diff<0) {
     diff = -diff;
     var tpm = '';''
   } else {
     var tpm = '';''
   }
 
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' секунды';
  } else {
    left = (diff%60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута, и ' + left;
    } else {
      left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' час, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' дней, ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
 
   // a setInterval() is more efficient, but calling setTimeout()
   // makes errors break the script rather than infinitely recurse
   timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
 }
 
 function checktimers() {
   //hide 'nocountdown' and show 'countdown'
   var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
   for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
   var countdowns = getElementsByClassName(document, 'span', 'countdown');
   for(var i in countdowns) countdowns[i].style.display = 'inline'
 
   //set up global objects timers and timeouts.
   timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
   timeouts = new Array(); // generic holder for the timeouts, global
   if(timers.length == 0) return;
   for(var i in timers) {
     timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
     updatetimer(i);  //start it up
   }
 }
 addOnloadHook(checktimers);
 
 // **************************************************
 //  - end -  Experimental javascript countdown timer
 // **************************************************

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