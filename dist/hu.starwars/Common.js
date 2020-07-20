/* Código Javascript colocado aqui será carregado para todos os utilizadores em cada carregamento de página */
 
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
 

function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection)
	{
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "recolher";
var expandCaption = "expandir";
 
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
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
 
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
addOnloadHook(fillEditSummaries);
addOnloadHook(fillPreloads);
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('.insertusername').text(wgUserName); }
 addOnloadHook(UserNameReplace);

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * modified for use in both Monaco and Monobook skins by Sikon
 * Section edit links added by Green tentacle
 * New Wikia skin support by Grunny

 * Modificada para atender à estrutura com o espaço nominal "Kánon", por Thales César
 */
function addEditIntro(name) {
	// Top link
	if( skin == 'oasis' ) {
		$('a[data-id="edit"]').attr('href',$('a[data-id="edit"]').attr('href') + '&editintro=' + name);
		$('span.editsection > a').each( function () {
			$(this).attr('href',$(this).attr('href') + '&editintro=' + name);
		} );
	} else {
		var el = document.getElementById('ca-edit');
 
		if( typeof(el.href) == 'undefined' ) {
			el = el.getElementsByTagName('a')[0];
		}
 
		if (el)
			el.href += '&editintro=' + name;
 
		// Section links
		var spans = document.getElementsByTagName('span');
		for ( var i = 0; i < spans.length; i++ ) {
			el = null;
 
			if (spans[i].className == 'editsection') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			} else if (spans[i].className == 'editsection-upper') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			}
		}
	}
}
 
$( function () {
	//ver http://starwars.wikia.com/wiki/MediaWiki:Common.js para código original
	if ( wgNamespaceNumber === 112 ) {
		addEditIntro( 'Template:Canon_editintro' );
	}
} );

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 * Adaptado por [[User:Thales César|Thales César]]
 */

if(document.getElementById('old-forum-warning')) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
}
if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('Arquivado').removeAttr('href');
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
	editLink.innerHTML = 'Arquivado';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

function addAlternatingRowColors() {
	var infoboxes = $(".infobox");//getElementsByClass('infobox', document.getElementById('content'));
 
	if( infoboxes.length == 0 )
		return;
 
	for( var k = 0; k < infoboxes.length; k++ ) {
		var infobox = infoboxes[k];
 
		var rows = infobox.getElementsByTagName('tr');
		var changeColor = false;
 
		for( var i = 0; i < rows.length; i++ ) {
			if(rows[i].className.indexOf('infoboxstopalt') != -1)
			break;
 
			var ths = rows[i].getElementsByTagName('th');
 
			if( ths.length > 0 ) {
				continue;
			}
 
			if(changeColor)
				rows[i].style.backgroundColor = '#f9f9f9';
			changeColor = !changeColor;
		}
	}
}
addOnloadHook( addAlternatingRowColors );


 

importScriptPage( 'AjaxRC/i18n.code.js', 'dev' );
var ajaxRefresh = 30000;

/* ######################################################################

JavaScript para adicionar botão customizável no modo Fonte
Por: [[User:Thales César|Thales César]], adaptado de http://community.wikia.com/wiki/Help:Custom_edit_buttons
** -----------
*/

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/pt.starwars/images/2/28/Button_wikilink.png/revision/latest?cb=20151229011915",
		"speedTip": "Kánon link",
		"tagOpen": "{{Kánon|",
		"tagClose": "}}",
		"sampleText": "Inserir link canônico"
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/pt.starwars/images/2/29/Translate_button.png/revision/latest?cb=20160114145016",
		"speedTip": "Tradução SWW",
		"tagOpen": "{{TraduçãoSWW|",
		"tagClose": "}}",
		"sampleText": "Inserir termo para tradução"
	};

/* ######################################################################

jQuery para trocar os links dos Editores Visual e Clássico
Para usuários anônimos apenas
Por: [[User:Thales César|Thales César]]
** -----------
*/
/* 
function trocarEditores() {
	if (wgUserName!==null || wgNamespaceNumber != 0 || wgAction!="view")
		return;
	var linkEV = $("#ca-ve-edit").attr("href");
	$("#ca-edit").html("Editor Visual");
	$("#ca-ve-edit").attr("href", $("#ca-edit").attr("href"));
	$("#ca-edit").attr("href", linkEV);
	$("#ca-ve-edit").off("click");
	if (console)
		console.log("Editores Visual e clássico trocados com sucesso!");
}

addOnloadHook(trocarEditores); */

/* ######################################################################

jQuery para esconder e mostrar elementos
Extremamente simples (é jQuery, o que você esperava?)...mas eficiente 
Por: [[User:Thales César|Thales César]]
** -----------
*/

$(document).ready(function(){
	$("#hider").click(function(){
		if ($("#hider").html()=="[Mostrar]")
		{
			$("#hider").html("[Esconder]")
			$("#hiden").fadeIn("slow");
		}
		else
		{
			$("#hider").html("[Mostrar]")
			$("#hiden").fadeOut("slow");
		}
	});
	/* Para o {{App}} */
	$("#hiderApp").click(function(){
		$("#hidenApp").toggle("slow");
		if ($("#hiderApp").html()=="[Mostrar]")
			$("#hiderApp").html("[Esconder]")
		else
			$("#hiderApp").html("[Mostrar]")
	});
	rewriteTitle();
	changeMainPageLink();
	checkForClassChange();
});
/* ######################################################################

Inserir banner do Star Wars Storyteller na barra lateral, DEPOIS dos anúncios, quando existir a Template:SWST. Verificar por parâmetro e inserir player do YouTube após clique do usuário.
Por: [[User:Thales César|Thales César]]
** -----------
*/
function checkForClassChange()
{
    if ($('#WikiaRail').hasClass('loaded'))
    {
        if (document.getElementById("temSWST"))
    	{
    		var URLSWST = $("#temSWST").text();
    		if (URLSWST=="{{{1}}}" || (URLSWST.search("www.youtube.com") < 0 && URLSWST.search("youtu.be") < 0))
    		{
    			$("#WikiaRail").append("<div id='SWStoryteller' class='error' style='font-weight:bold'>Erro de SWST: URL incorreta!</div>");
    		}
    		else
    		{
    			$("#WikiaRail").append("<div id='SWStoryteller'><img src='https://vignette.wikia.nocookie.net/pt.starwars/images/a/a4/Star_Wars_Storyteller_Logo_YT.png/revision/latest?cb=20160127133039' title='Veja vídeo do SW Storyteller sobre o assunto' alt='SWStoryteller' /></div>");
    			$("#SWStoryteller img").click(function() {
    				$("#SWStoryteller").append('<iframe style="width:90%" src="'+URLSWST+'" frameborder="0" allowfullscreen></iframe>');
    				$("#SWStoryteller img").remove();
    			});
    		}
    	}
    }
    else
        setTimeout(checkForClassChange, 500);
}

/* ######################################################################

Adaptações para transformação de "Kánon:Página principal" em uma página principal de verdade
Por [[User:Thales César]]
** -----------
*/
function changeMainPageLink() {
    if (wgNamespaceNumber==112 || wgNamespaceNumber==113)
    {
        $("a[accesskey=z]").attr("href", "/wiki/Kánon:Página_principal");
        $(".header-title").append("<h2>Artigo canônico</h2>");
        if ($('#title-meta').length == 1)
            return;
        $(".header-title h1").text($(".header-title h1").text().replace("Kánon:", ""));
    }
    else if(wgNamespaceNumber==0)
    {
        var mundoReal = $("a[title='O assunto deste artigo existe ou é relevante no mundo real.']");
        if (mundoReal.length==0)
            $(".header-title").append("<h2>Artigo <span style='font-style:italic;'>Legends</span></h2>");
    }
}

/* Substitúi a Predefinição:Information no fomulário de upload */
/* Copiado da wiki de Firefly, adaptado para a nossa predef */
$(document).ready(function() {
 
	if (wgPageName != 'Especial:Carregar_imagem') {
		return;
	}
 
	$('#wpUploadDescription').text("==Sumário==\r\n{{Information\r\n|attention=\r\n|description=\r\n|artist=\r\n|description=\r\n|source=\r\n|artist=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}");
 
});

/* Add ImageMapEdit functionality (thanks SpikeToronto) */
importScriptURI('//tools.wmflabs.org/imagemapedit/ime.js');
/* END Add ImageMapEdit functionality */



importArticles({
    type: "script",
    articles: [
      "u:jedipedia:Tabber.js"
    ]
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

function moveToHeader(elem) {
    $('#WikiaPageHeader, #firstHeading').append($('#mw-content-text').find(elem));
}
$(function() {
    moveToHeader('#title-eraicons');
});


// **************************************************
// * Change                                         *
// * Autor: Vuh                                     *
// * Podziękowania za pomoc przy skrypcie dla: Sovq *
// **************************************************
// Użycie:
//  <span class="changebox" id="changebox1">Nagłówek #1</span>
//  <div class="changebox" id="changebox1" style="display: block;">Szablon #1</div>
//  ...
 
$(document).ready(function() {
	$("span.changebox").click(function() {
		var e = $(this).attr("id");
		$("div.changebox").each(function() {
			if($(this).attr("id") == e) {
				$(this).show()
			} else {
				$(this).hide()
			}
		})
		$("span.changebox").each(function() {
			if($(this).attr("id") == e) {
				$(this).addClass("changebox-active")
			} else {
				$(this).removeClass("changebox-active")
			}
		})
	})
})

/* Tabber */
importArticles({
    type: "script",
    articles: [
      "u:jedipedia:Tabber.js"
    ]
});