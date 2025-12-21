/** Gera uma lista das páginas mais visitadas da Wikia
Exemplo de Uso:
<div id="mais-visitadas"></div> 
**/

$(function() {
	if ($("#mais-visitadas")) {
		var lista = "";
		$.post("/api/v1/Articles/Top?namespaces=0&limit=10", function(res) {
			for (var i = 0; res.items.length > i; i++) {
				lista += "<a href=" + res.items[i].url + ">" + res.items[i].title + "</a><br>";
				$("#mais-visitadas").html(lista);
			}
		});
	}
});

/**** Importações ****/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MiniComplete/code.js',
        'u:dev:ReferencePopups/custom.js'
    ]
});

importStylesheet("Template:Ambox/code.css");
importScriptPage('ShowHide/code.js', 'dev');

/* Dynamic Navigation Bars */
importScript('MediaWiki:Common.js/navigationbars.js');
 
/* Dynamic Navigation Bars (2) */
importScript('MediaWiki:Common.js/navigationbars2.js');
 
/* Collapsible Tables */
importScript('MediaWiki:Common.js/collapsibletables.js');

/* subtitle */
// add the original english title as a subtitle for the article, linking to Wookieepedia's corresponding page.
 
// add the original english title as a subtitle.
  showEnTitle();

function showEnTitle()
{
  //check if the link exists
  var enTitleDiv = document.getElementById('enTitle');    
  if(enTitleDiv == null || enTitleDiv == undefined)
    return;
 
  //don't add it on the home page
  var isHomePage = document.getElementsByClassName('mainpage');
  if(isHomePage.length > 0)
    return;
 
  //check if the header exists
  var header = document.getElementById('firstHeading');  
  if(header == null || header == undefined)
    return;
 
  //clone the node and add it at the end of the header
  var cloneNode = enTitleDiv.cloneNode(true);
  header.appendChild(cloneNode);
  cloneNode.style.display = "block";
}

  
// Copied from http://starwars.wikia.com/wiki/MediaWiki:Wikia.js
$( function eraIconsOasis() {
    if ( $( '#title-eraicons' ).length ) {
    	if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
    		$( '.page-header__actions' ).first().prepend( $( '#title-eraicons' ).show() );
    	} else {
    	    $( '.page-header__contribution > div' ).first().prepend( $( '#title-eraicons' ).show() );
    	}
    }
} );

//* Username, créditos da Avatar Wiki *//
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}