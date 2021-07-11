window.AddRailModule = [{ prepend: true }];


// **************************************************
 //  Викификатор
 // **************************************************

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
if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0)
{
        if (wgCanonicalNamespace != "Special")
        {
              document.write('<script type="text/javascript" src="' 
              + 'http://uk.vijskpens.wikia.com/index.php?title=MediaWiki:Onlyifediting.js' 
              + '&action=raw&ctype=text/javascript&dontcountme=s"></script>'); 
              addOnloadHook(function(){
              if (mwEditButtons.length < 3) return;
              mwEditButtons[0].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/f/fa/Button_bold_ukr.png';
              mwEditButtons[1].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/f/f3/Button_italic_ukr.png';
              mwEditButtons[2].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/0/03/Button_internal_link_ukr.png';
              })
        }
}
 if (mwCustomEditButtons) {
//Перенаправление
mwCustomEditButtons[mwCustomEditButtons.length] = { 
   "imageFile": "http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png", 
    "speedTip": "Перенаправление", 
    "tagOpen": "#REDIRECT [[", 
    "tagClose": "]]", 
    "sampleText": "название страницы"} 
//Template button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
    "speedTip": "Шаблон",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "Название шаблона"}
    }

 // **************************************************
 //  Автоматическое обновление
 // **************************************************
 
importScriptPage( 'AjaxRC/code.js', 'dev' ); // AJAX-обновление некоторых страниц
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; // AJAX-обновление некоторых страниц(выбор страниц)
var AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемое подсказку
 
 
 // **************************************************
 //  Кнопка "Наверх"
 // **************************************************
 
var Speed = 400;
 
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
 
var ButtonStart = 500;
var ScrollSpeed = 700;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication
 
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
importScriptPage('ShowHide/code.js', 'dev');
 
function rewriteTitle()
{
    if(typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
        return;
 
    var titleDiv = document.getElementById('title-meta');
 
    if(titleDiv == null)
        return;
 
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    var node = firstHeading.childNodes[0];
 
    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";
 
    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}
 
addOnloadHook (rewriteTitle);

/* Галереи */
window.onload = function () {
        $('.wikia-photogallery-add').hide();
}