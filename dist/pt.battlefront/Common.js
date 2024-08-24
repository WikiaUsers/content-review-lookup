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
 
/* jQuery para esconder e mostrar elementos
Extremamente simples...mas eficiente */
 
$(document).ready(function(){
$("#hider").click(function()
{
if ($("#hider").html()=="[Mostrar]") {
$("#hider").html("[Esconder]")
$("#hiden").fadeIn("slow");
} else {
$("#hider").html("[Mostrar]")
$("#hiden").fadeOut("slow");
}
});
/* Para o {{App}} */
$("#hiderApp").click(function()
{
$("#hidenApp").toggle("slow");
if ($("#hiderApp").html()=="[Mostrar]")
$("#hiderApp").html("[Esconder]")
else
$("#hiderApp").html("[Mostrar]")
});
rewriteTitle();
});