var autoCollapse = 2;
var collapseCaption = "скрыть";
var expandCaption = "показать";
 
function collapseTable( tableIndex )
{
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
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
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
 
/** Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
  */
 
var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();

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
 
/**
 * jQuery version of fillEditSummaries
 * @author Grunny
 */
function fillEditSummaries() {
 
	if( !$( '#wpSummaryLabel' ).length ) {
		return;
	}
	var	summaryOptionsHtml = '',
		$summaryOptionsList;
 
	$.get( wgScript, { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' }, function( data ) {
		var lines = data.split( '\n' );
		for( var i = 0; i < lines.length; i++ ) {
			var value = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : "";
			summaryOptionsHtml += '<option value="' + value + '">' + lines[i] + '</option>';
		}
		$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).html( summaryOptionsHtml ).change( function() {
			var value = $( this ).val();
			if ( value !== '' ) {
				if( skin === 'oasis' ) {
					$( '#wpSummary' ).text( value );
				} else {
					$( '#wpSummary' ).val( value );
				}
			}
		} );
 
		$( '#wpSummaryLabel' ).prepend( 'Standard summaries: ', $summaryOptionsList, '<br />' );
	} );
 
}
 
/*Неактивные пользователи*/
//Inactive users
InactiveUsers = { 
    months: 3,
    text: 'НЕАКТИВЕН'
};
 
importScriptPage('InactiveUsers/code.js', 'dev');

/*автообновление свежих правок */
importScriptPage( 'AjaxRC/code.js', 'dev' ); // AJAX-обновление некоторых страниц
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; // AJAX-обновление некоторых страниц(выбор страниц)
var AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемое подсказку

/* Иконки социальных сетей */
$('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="http://vk.com/callofdutywiki"><img src="https://vignette.wikia.nocookie.net/callofduty/images/4/49/Vk_logo.png/revision/latest?cb=20200430141805&format=original&path-prefix=ru"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="https://store.steampowered.com/sale/cod/"><img src="https://vignette.wikia.nocookie.net/callofduty/images/2/20/Steam_logo2.png/revision/latest?cb=20200430141820&format=original&path-prefix=ru"></a></div></div><div style="position: absolute; margin-top:84px" class="SocialIcon"><div style="float:right;"><a href="http://www.youtube.com/user/IDDQD1101"><img src="https://vignette.wikia.nocookie.net/callofduty/images/9/9c/YouTube_logo.png/revision/latest?cb=20200430141759&format=original&path-prefix=ru"></a></div></div><div style="position: absolute; margin-top:126px" class="SocialIcon"><div style="float:right;"><a href="https://eu.shop.battle.net/ru-ru/family/call-of-duty"><img src="https://vignette.wikia.nocookie.net/callofduty/images/6/6a/Battle.net_logo.png/revision/latest?cb=20190207070806&path-prefix=ru"></a></div></div></div>');
 
 
function initVisibility() {
	var storage = globalStorage[window.location.hostname];
 
	var page = window.pageName.replace(/\W/g,'_');
	var show = storage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
	var hidables = getElementsByClass('hidable');
 
	for(var i = 0; i < hidables.length; i++) {
		show = storage.getItem('hidableshow-' + i  + '_' + page);
 
		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}

/* ######################################################################## */
/* ### СПИСОК ЗАДУБЛИРОВАННЫХ ФАЙЛОВ ТЕСТОВАЯ ВЕРСИЯ                    ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Описание: Находит дубликаты файлов на вики.                      ### */
/* ### Автор:      User:pcj (http://www.wowpedia.org)                   ### */
/* ######################################################################## */
 
function findDupFiles(gf) {
   var fileDiv = $('#mw-dupfiles');
 
   if (fileDiv.length) {
      dil = new Array();
      ajaxIndicator = stylepath + '/common/progress-wheel.gif';
      output = '';
      url = '/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json';
 
      if (!($('#dupFilesProgress').length)) {
         fileDiv.prepend('<span style="float: right;" id="dupFilesProgress" title="В процессе…"><img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="In progress..." /></span>');
      }
 
      if (gf) {
         url += "&gaifrom=" + gf;
      }
 
      $.getJSON( url, function (data) {
         if ( data.query ) {
            pages = data.query.pages;
 
            for (pageID in pages) {
               dils = "," + dil.join();
 
               if ( dils.indexOf("," + pages[pageID].title) == -1 
                  && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles ) {
                  output += "<h3><a href='/wiki/" + encodeURIComponent(pages[pageID].title).replace(/'/g, "%27") + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
 
                  for ( x = 0; x < pages[pageID].duplicatefiles.length; x++ ) {
                     output += "<li><a href='/wiki/File:" + encodeURIComponent(pages[pageID].duplicatefiles[x].name).replace(/'/g, "%27") + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                     dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                  }
                  output += "</ul>\n\n"
               }
            }
 
            fileDiv.append(output);
 
            if (data["query-continue"]) {
               setTimeout("findDupFiles('" + encodeURIComponent(data["query-continue"].allimages.gaifrom).replace(/'/g, "%27") + "');", 5000);
            } else {
               $('#dupFilesProgress').hide();
            }
         }
      } );
   }
}

//================================================================
// Иконки в [[Template:Игры]]; автор: [[:en:User:Porter21]]
function addTitleIcons() {
	if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
		var insertTarget;
 
		switch (skin) {
			case 'monobook':
				insertTarget = $('#firstHeading');
				break;
			case 'oasis':
				if (wgAction != 'submit' && wgNamespaceNumber != 112) {
					insertTarget = $('#WikiaArticle');
				}
				break;
		}
		if (insertTarget) {
			$('#va-titleicons').css('display', 'block').prependTo(insertTarget);
		}
	}
}
jQuery(function($) {
	addTitleIcons();
});

//================================================================
// Простой генератор списка заголовков на [[Special:AchievementsCustomize]]
var wgPageName;
if(wgPageName=='Служебная:AchievementsCustomize'||'Special:AchievementsCustomize') {
	$('.article-sidebar #AchievList').remove();
	$('<section class="module" id="AchievList" style="float: left;"><h2>Существующие треки</h2><ol></ol></section>').appendTo('.article-sidebar');
 
	var AchievHeaders = $('.customize-section h2');
	var AchievList = $('.customize-section h2');
 
	for (var n = AchievHeaders.length-1; n>=0; n--) {
		AchievList[n] = $(AchievHeaders[n]).text().replace(" трек изменён", "");
		$(AchievHeaders[n]).replaceWith('<h2>' + AchievList[n] + '</h2>');
	}
 
	AchievList.sort();
 
	for (var n = AchievList.length-1; n>=0; n--)
		$('<li>' + AchievList[n] + '</li>').prependTo('#AchievList ol');
}

//--------------------------------
// Проверка подписей (SignatureCheck)
window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: '',
	epilogue: '\nНажмите кнопу «отмена» и внесите соответствующие изменения. Если же вы уверены, что данное предупреждение сработало ошибочно, то вы можете сохранить страницу, нажав кнопку «OK»',
	noForumheader: 'Вы удалили (либо забыли добавить) шапку форума. Пожалуйста, добавьте в начало страницы шаблон {{Forumheader}}.\n\n',
	noSignature: 'Вы забыли добавить подпись к своему сообщению с помощью четырёх тильда ~ ~ ~ ~ (без пробелов)\n',
		forumheader: 'Forumheader'
};
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;