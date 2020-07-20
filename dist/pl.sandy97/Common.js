importArticles({
	type: "script",
	articles: [
		"u:dev:RevealAnonIP/code.js",			// IP zamiast "Użytkownik Wikii"
		"MediaWiki:Common.js/userRightsIcons.js",	// Opisy grup userów w profilu użytkownika 
		"MediaWiki:Common.js/KiwiIRC.js",		// Bramka KiwiIRC
		"MediaWiki:Common.js/Facebook.js"		// Facebook
	]
});

/* Przycisk "Wkład" w menu personalnym */
 
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Specjalna:Wkład/'+ encodeURIComponent (wgUserName) +'">Wkład</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);


// {{USERNAME}}
// Autorzy: Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]], this (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
 
/* Automatyczne opisy zmian
   Autor (Author): [[wikipedia:pl:User:Adziura|Adam Dziura]]
   Poprawki (Fixes): [[wikipedia:pl:User:Nux|Maciej Jaros]]
*/
// <nowiki> - ze względu na występowanie "{{EK}}"
function przyciskiOpis()
{
	// stop before starting
	if (window.przyciskiOpisDone)
		return;
 
	// sprawdzenie, czy to jest pole edycji z opisem zmian (nie jest takie jako nagłówek)
	var el = document.getElementById('wpSummaryLabel');
	if (el)
	{
		if (el.innerHTML.indexOf('Opis zmian')==-1)
			return;	// stop
	}
	else {
		return;	// stop
	}

	// dodanie elementu okalającego przyciski bezpośrednio za opisem zmian
	var el = document.getElementById('wpSummary').nextSibling;
	var opisBtns = document.createElement('span');
	opisBtns.id = 'userSummaryButtons'
	el.parentNode.insertBefore(document.createElement('br'), el)
	el.parentNode.insertBefore(opisBtns, el)

	// dodawanie przycisków
	var kl = '';
	if (opisBtns)
	{
		// opisBtns.appendChild(document.createTextNode(' ')); // odstęp
		przyciskiDodaj(opisBtns, 'drobne',       'dodajOpis("drobne")',       kl, 'Wykonano drobne zmiany');
		przyciskiDodaj(opisBtns, 'rewert',       'dodajOpis("rewert")',       kl, 'Przywrócono poprzednią wersję artykułu');
		przyciskiDodaj(opisBtns, 'remont',       'dodajOpis("remont")',       kl, 'Dokonano remontu w artykule');
		przyciskiDodaj(opisBtns, 'porządki',     'dodajOpis("porządki")',     kl, 'Uporządkowano artykuł');
		przyciskiDodaj(opisBtns, 'naprawa kodu', 'dodajOpis("naprawa kodu")', kl, 'Naprawiono kod strony');
		przyciskiDodaj(opisBtns, '{{EK}}',       'dodajOpis("+{{EK}}")',      kl, 'Oznaczono jako stronę do kasacji poprzez szablon {{EK}}');

		opisBtns.appendChild(document.createElement('br'));
 
		przyciskiDodaj(opisBtns, '+infobox',     'dodajOpis("+infobox")',       kl, 'Dodano infobox');
		przyciskiDodaj(opisBtns, '+grafika',     'dodajOpis("+grafika")',       kl, 'Dodano grafikę');
		przyciskiDodaj(opisBtns, '+galeria',     'dodajOpis("+galeria")',       kl, 'Dodano galerię');
		przyciskiDodaj(opisBtns, '+ciekawostki', 'dodajOpis("+ciekawostki")',   kl, 'Dodano ciekawostki');
		przyciskiDodaj(opisBtns, '+kategoria',   'dodajOpis("+kategoria/e")',   kl, 'Dodano kategorię/kategorie');
 
		opisBtns.appendChild(document.createTextNode(' ')); // odstęp
 
		// odstęp przed własnymi
		opisBtns.appendChild(document.createTextNode(' ')); // odstęp
 
//		document.editform.wpMinoredit.onclick = onMinorEditClick;
	}
}
/*
Parametry:
* elUserBtns - element okalający, do którego dodać przycisk
* pTekst - tekst w środku przycisku
* pAkcja - akcja (w formie tekstowej) jaką wykonać przy naciśnięciu; może być ciągiem poleceń
* pKlasa - klasa jeśli konieczna
* pOpis - opis widoczny w dymku przy przycisku
*/
function przyciskiDodaj(elUserBtns, pTekst, pAkcja, pKlasa, pOpis)
{
	var nowyBtn = document.createElement('a');
 
	// atrybuty
	nowyBtn.appendChild(document.createTextNode(pTekst));
	nowyBtn.title = pOpis;
	if (pKlasa != '')
		nowyBtn.className = pKlasa;
	nowyBtn.onclick = new Function(pAkcja);
 
	// dodanie przycisku
	elUserBtns.appendChild(nowyBtn);
}
 
var clickedMinor = false;
function onMinorEditClick() {
	if (this.checked && !clickedMinor) {
		dodajOpis("drobne");
		clickedMinor = true;
	}
}
 
function dodajOpis(opis) {
	var wpS = document.editform.wpSummary;
	if (wpS.value != '' && wpS.value.charAt(wpS.value.length-2) != '/') {
		wpS.value += ', ' + opis
	}
	else {
		wpS.value += opis
	}
}
 
addOnloadHook(przyciskiOpis);
// </nowiki> 

function addTitleIcons () {
   var iconBar = $('#va-titleicons');
   var previewBar = $('#va-titleicons-preview');
 
   if (skin != 'monobook' && skin != 'oasis' && skin != 'wikia') {
      return;
   }
 
   if (iconBar.length > 0 && $('a', previewBar).length > 0) {
      if (skin == 'oasis' || skin == 'wikia') {
         var articleDiv = $('#WikiaArticle');
 
         if (articleDiv.length > 0) {
            iconBar.css('display', 'block').prependTo(articleDiv);
         }
      } else if (skin == 'monobook') {
         var firstHeading = $('#firstHeading').css('position', 'relative');
 
         if (firstHeading.length > 0) {
            iconBar.css('display', 'block').appendTo(firstHeading.css('padding-right', previewBar.width() + 25));
         }
      }
 
      $('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">');
 
      iconBar.hover(
         function () {
            $(this).addClass('va-titleicons-hover');
         }, function () {
            $(this).removeClass('va-titleicons-hover');
         });
   }
}

function fBox() {
    $('#fbox').append('<iframe marginheight="0" marginwidth="0" src="https://www.facebook.com/pages/Simspedia/249853891795345&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}
 
/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
var hasClass = (function () {
   var reCache = {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();
 
var autoCollapse = 2;
var collapseCaption = "ukryj";
var expandCaption = "pokaż";
 
function collapseTable( tableIndex ) {
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
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
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
             Button.style.width = "2em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
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
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
  }
 
  addOnloadHook( createNavigationBarToggleButton );

// {{Era}}
// Autor: User:Mirar
 
function addTitleGames() {
   var titleDiv = document.getElementById("title-games");
   if (titleDiv != null && titleDiv != undefined)
   {
      var content = document.getElementById('article');
      if (!content) {
         var content = document.getElementById('content');
      }
 
      if (content) {
         var hs = content.getElementsByTagName('h1');
         var firstHeading;
         for (var i = 0; i < hs.length; i++)
         {
            if ( (' '+hs[i].className+' ').indexOf(' firstHeading ') != -1){
               firstHeading=hs[i];
               break;
            }
         }
 
         var cloneNode = titleDiv.cloneNode(true);
         firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
         cloneNode.style.display = "block";
         cloneNode.style.visibility = "visible";
         if (skin != "monaco") {
            cloneNode.style.marginTop = "-11px";
         }
      }
   } 
}
 
addOnloadHook( addTitleGames );