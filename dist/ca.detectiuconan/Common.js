importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/navlinks.js", /* Afegeix el link "Nosaltres" al menu "On the Wiki" */
	]
});

// **************************************************
// BOTONS ADDICIONALS a la caixa d'edici�
// **************************************************
 
 if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
     "speedTip": "Codi font",
     "tagOpen": "<code><nowiki>",
     "tagClose": "</"+ "nowiki></code>",
     "sampleText": "Codi font"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
     "speedTip": "Plantilles",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Plantilla"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enlla� a usuari",
     "tagOpen": "[[user:",
     "tagClose": "|]]",
     "sampleText": "Usuari"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
     "speedTip": "Categoria",
     "tagOpen": "[[Category:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nom de la categoria"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162729/es.gta/images/c/c2/Enobras.png",
     "speedTip": "Advertir que s'est� editant l'article",
     "tagOpen": "{{Article_sense_acabar|",
     "tagClose": "}}",
     "sampleText": "Nom d'usuari"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/f3/Button_broom2.png",
     "speedTip": "Article amb plantilla incorrecte",
     "tagOpen": "{{Plantilla_Incorrecte}}",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20111227131921/onepiece-cat/ca/images/3/33/Article_incomplet.png",
     "speedTip": "Indicar l'article com a Esb�s",
     "tagOpen": "{{Esb�s}}",
     "tagClose": "",
     "sampleText": ""};
 }

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
/* Test if an element has a certain class **************************************
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
 
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "-";
 var expandCaption = "+";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
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
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
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
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
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
    var tpm = '';
  } else {
    var tpm = '';
  }

  // calcuate the diff
  var left = (diff%60) + ' segons';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minuts ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hores ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' dies ' + left
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

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
	if( skin == 'oasis' )
	{
		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href' );
		$('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
		return;
	}
 
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

/** *************************************
/Dynamic Navigation Bars (experimental) 
/****************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
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
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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

/****************************/
/* [[Plantilla:Nom usuari]] */
/****************************/
 
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);

// ************************************************************
// Resums d'edici�
// Source Editor
// Visual Editor
// ************************************************************
 
// ====================
// Source Editor
// ====================
 
$(function() {
        if (skin == 'oasis'){
            var $label = $('#edit_enhancements_toolbar #wpSummaryLabel');
	    if (!$label.size()) {
	    	    return;
	    }
        }
 
        if (skin == 'monobook'){
	    var $label = $('.editOptions #wpSummaryLabel');
	    if (!$label.size()) {
	    	    return;
	    }
        }
 
	$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
		var val = $(this).val();
		if (val != '') {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
        $label.prepend('<br />').prepend($combo).prepend('Summaries: ');
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Stdsummaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') == 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') == 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') == 0 || lines[i].indexOf('(') == 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
})
 
// ====================
// Visual Editor
// ====================
 
$(function() {
	var $label = $('.module_content #wpSummaryLabel');
	if (!$label.size()) {
		return;
	}
 
	$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
		var val = $(this).val();
		if (val != '') {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
	$label.after($combo);
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Stdsummaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') == 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') == 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') == 0 || lines[i].indexOf('(') == 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
	$('.module_content #wpSummary').css({"margin-bottom": '8px'});
	$('.module_content #stdSummaries').css({"width": '258px'});
	$('.module_content #stdSummaries').css({"margin-bottom": '5px'});
})
 
importScript( 'MediaWiki:Functions.js' );