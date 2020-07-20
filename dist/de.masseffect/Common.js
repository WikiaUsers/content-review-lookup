/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importArticles( {
	type: 'script',
	articles: [
                'w:c:dev:DISPLAYTITLE/code.js',
		]
} );

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[**MAINTAINERS**]]
 */
var autoCollapse = 2;
var collapseCaption = '-';
var expandCaption = '+';
 
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


//Ersetzt <span class="insertusername"></span> mit dem Benutzername des Lesers
function replaceusername() {
  var spantags = document.getElementsByTagName("span");
  for (i=0; i<spantags.length; i++) {
    if (spantags[i].className=="insertusername") {
      if (wgUserName==null) {
        spantags[i].innerHTML="Spectre";
      } else {
        spantags[i].innerHTML=wgUserName;
      }
    }
  }
}
addOnloadHook(replaceusername);



// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
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
    var tpm = '';
  } else {
    var tpm = '';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' Sekunden';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' Minuten ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' Stunden ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' Tage ' + left
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

/*******************************/
/*** Flaggen für Sprachauswahl ***/
/*******************************/
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['en'] = '<img class="en-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/4/42/Flag_of_the_United_Kingdom.png/revision/latest?cb=20150702142107&path-prefix=uk" alt="Англійська">';
	flags['de'] = '<img class="de-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/e/e6/Flag_of_Germany.png/revision/latest?cb=20150702143139&path-prefix=uk" alt="Немецька">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/4/41/Flag_of_Spain.png/revision/latest?cb=20150702143323&path-prefix=uk" alt="Іспанська">';
	flags['ru'] = '<img class="ru-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/d/d4/Flag_of_Russia.png/revision/latest?cb=20150702143435&path-prefix=uk" alt="Російська">';
	flags['pl'] = '<img class="pl-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/9/92/Flag_of_Poland.png/revision/latest?cb=20150702143527&path-prefix=uk" alt="Польська">';
	flags['fr'] = '<img class="fr-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/6/62/Flag_of_France.png/revision/latest?cb=20150702143618&path-prefix=uk" alt="Французька">';
	flags['it'] = '<img class="it-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/b/b3/Flag_of_Italy.png/revision/latest?cb=20150702143706&path-prefix=uk" alt="Італійська">';
	flags['pt'] = '<img class="pt-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/1/17/Flag_of_Portugal.png/revision/latest?cb=20151116025935&path-prefix=uk" alt="Португальська">';
	flags['hu'] = '<img class="hu-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/0/00/Flag_of_Hungary.png/revision/latest?cb=20150702143859&path-prefix=uk" alt="Угорська">';
	flags['fi'] = '<img class="fi-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/1/10/Flag_of_Finland.png/revision/latest?cb=20150702144008&path-prefix=uk" alt="Фінська">';
	flags['nl'] = '<img class="nl-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/b/b2/Flag_of_the_Netherlands.png/revision/latest?cb=20150702144112&path-prefix=uk" alt="Нідерландська">';
	flags['cs'] = '<img class="cs-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/d/d4/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_of_the_Czech_Republic.png/revision/latest?cb=20150702144316&path-prefix=uk" alt="Чеська">';
	flags['uk'] = '<img class="uk-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/masseffect/images/d/d2/Flag_of_Ukraine.png/revision/latest?cb=20150702144404&path-prefix=uk" alt="Українська">';
 
 
	$('.WikiaPageHeader .comments').after(html);
 
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "English":
				languages['en'] = href;
				break;
			case "Deutsch":
				languages['de'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "Português":
				languages['pt'] = href;
				break;
			case "Magyar":
				languages['hu'] = href;
				break;
			case "Suomi":
				languages['fi'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
			case "Česky":
				languages['cs'] = href;
				break;
			case "Українська":
				languages['uk'] = href;
				break;
		}
	});
 
	var language = wgContentLanguage;
	$.each(flags, function (key, value) {
		if (key === language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} 
		else {
			if (languages[key]) {
				$('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('click', function () {
		if ($(this).hasClass('active') === false) {
			$(this).addClass('active');
		} 
		else {
			$(this).removeClass('active');
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('mouseleave', function () {
		var that = this;
		var timeOut = setTimeout(function () { $(that).removeClass('active'); }, 500);
 
		$('.chooselanguage').on('mouseenter', function () {
			clearTimeout(timeOut);
		});
	});
}
if( $('.WikiaArticleInterlang').length > 0 ) {
	addOnloadHook(appendLanguageDropdown);
}
/*******************************/
/*******************************/
/*******************************/